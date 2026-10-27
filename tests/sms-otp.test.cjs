const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.join(__dirname, '..');
const compile = (file) => ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
}).outputText;

function receiver({ supported = true, secure = true, throws = false } = {}) {
  const requests = [], timers = new Map(); let timerId = 0;
  const context = {
    exports: {}, AbortController,
    window: { isSecureContext: secure, ...(supported ? { OTPCredential: class {} } : {}) },
    navigator: { credentials: { get(options) {
      if (throws) throw new Error('Synthetic browser error');
      return new Promise((resolve, reject) => requests.push({ options, resolve, reject }));
    } } },
    setTimeout: (callback) => { timers.set(++timerId, callback); return timerId; },
    clearTimeout: (id) => timers.delete(id),
  };
  vm.runInNewContext(compile('src/lib/smsOtp.ts'), context);
  return { api: context.exports, requests, timers };
}
const flush = () => new Promise(resolve => setImmediate(resolve));

test('fast SMS is buffered until Firebase confirmation is ready and form subscribes', async () => {
  const { api, requests } = receiver(); const got = [];
  const dispatch = api.startSmsOtp('9000000001');
  requests[0].resolve({ code: '012345' }); await flush();
  api.subscribeSmsOtp('+91 9000000001', code => got.push(code));
  assert.deepEqual(got, []);
  api.markSmsOtpReady(dispatch); assert.deepEqual(got, ['012345']); api.stopSmsOtp();
});
test('code received before the form mounts is replayed without starting another read', async () => {
  const { api, requests } = receiver(); const dispatch = api.startSmsOtp('9000000001');
  api.markSmsOtpReady(dispatch); requests[0].resolve({ code: '234567' }); await flush();
  const got = []; const unsubscribe = api.subscribeSmsOtp('9000000001', code => got.push(code));
  unsubscribe(); api.subscribeSmsOtp('9000000001', code => got.push(code));
  assert.deepEqual(got, ['234567', '234567']); assert.equal(requests.length, 1); api.stopSmsOtp();
});
test('resend cancels old reception and ignores late resolution from the old SMS', async () => {
  const { api, requests } = receiver(); const got = [];
  api.subscribeSmsOtp('9000000001', code => got.push(code));
  const newer = api.startSmsOtp('9000000001');
  assert.equal(requests[0].options.signal.aborted, true);
  requests[0].resolve({ code: '111111' }); requests[1].resolve({ code: '222222' }); await flush();
  assert.deepEqual(got, []); api.markSmsOtpReady(newer); assert.deepEqual(got, ['222222']); api.stopSmsOtp();
});
test('different phone numbers cannot receive a previous phone session code', async () => {
  const { api, requests } = receiver(); const first = [], second = [];
  api.subscribeSmsOtp('9000000001', code => first.push(code));
  api.subscribeSmsOtp('9000000002', code => second.push(code));
  requests[0].resolve({ code: '111111' }); requests[1].resolve({ code: '222222' }); await flush();
  assert.deepEqual(first, []); assert.deepEqual(second, ['222222']); api.stopSmsOtp();
});
test('manual verification/edit cancels reception and discards a late browser result', async () => {
  const { api, requests } = receiver(); const got = [];
  api.subscribeSmsOtp('9000000001', code => got.push(code)); api.stopSmsOtp('9000000001');
  requests[0].resolve({ code: '123456' }); await flush();
  assert.equal(requests[0].options.signal.aborted, true); assert.deepEqual(got, []);
});
test('unsupported, insecure and synchronously failing browsers retain manual entry', () => {
  for (const options of [{ supported: false }, { secure: false }, { throws: true }]) {
    const { api, timers } = receiver(options);
    assert.doesNotThrow(() => api.subscribeSmsOtp('9000000001', () => {}));
    api.stopSmsOtp(); assert.equal(timers.size, 0);
  }
});
test('denied permission and timeout do not submit or retain an unbounded listener', async () => {
  const { api, requests, timers } = receiver(); const got = [];
  api.subscribeSmsOtp('9000000001', code => got.push(code));
  requests[0].reject(new Error('Synthetic permission denial')); await flush();
  for (const callback of [...timers.values()]) callback();
  assert.deepEqual(got, []); assert.equal(timers.size, 0); assert.equal(requests[0].options.signal.aborted, true);
});
test('only exactly six digits are accepted from WebOTP', async () => {
  for (const code of ['12345', '1234567', '12x456', undefined]) {
    const { api, requests } = receiver(); const got = [];
    api.subscribeSmsOtp('9000000001', value => got.push(value));
    requests[0].resolve({ code }); await flush(); assert.deepEqual(got, []); api.stopSmsOtp();
  }
});
test('Firebase starts reception before dispatch and releases code after confirmation exists', async () => {
  const order = [], confirmation = { confirm() {} };
  const context = { exports: {}, window: { recaptchaVerifier: {} }, console,
    require(name) {
      if (name === 'firebase/auth') return { signInWithPhoneNumber: async () => { order.push('send'); return confirmation; } };
      if (name === './firebaseClient') return { auth: {} };
      if (name === './smsOtp') return {
        startSmsOtp: () => { order.push('listen'); return 'session'; },
        markSmsOtpReady: () => { assert.equal(context.window.firebaseConfirmationResult, confirmation); order.push('ready'); },
        stopSmsOtp: () => order.push('stop'),
      };
      throw new Error(name);
    },
  };
  vm.runInNewContext(compile('src/lib/firebaseAuth.ts'), context);
  await context.exports.sendFirebaseOtp('9000000001');
  assert.deepEqual(order, ['listen', 'send', 'ready']);
});
test('visible input exposes native OTP semantics and preserves leading zeros', () => {
  const context = { exports: {}, require };
  vm.runInNewContext(compile('src/features/auth/components/OtpCodeInput.tsx'), context);
  const React = require('react'), { renderToStaticMarkup } = require('react-dom/server');
  const markup = renderToStaticMarkup(React.createElement(context.exports.default, { id: 'fixture-code', value: '012345', onChange() {} }));
  for (const attribute of ['type="text"', 'inputMode="numeric"', 'autoComplete="one-time-code"', 'value="012345"', 'maxLength="6"']) assert.ok(markup.includes(attribute), attribute);
  assert.ok(!markup.includes('opacity:0.001')); assert.ok(!markup.includes('type="hidden"'));
});
