// WebOTP must start BEFORE SMS dispatch. Keep the result in memory while the
// phone form hands over to the code form; never persist a verification code.
type OtpSubscriber = { phone: string; receive: (code: string) => void };
type SmsSession = {
  phone: string;
  controller: AbortController;
  timer: ReturnType<typeof setTimeout>;
  ready: boolean;
  code?: string;
};

let session: SmsSession | undefined;
const subscribers = new Set<OtpSubscriber>();
const phoneKey = (phone: string) => phone.replace(/\D/g, "").slice(-10);

function publish(current: SmsSession) {
  if (session !== current || !current.ready || !current.code) return;
  for (const subscriber of subscribers) {
    if (subscriber.phone === current.phone) subscriber.receive(current.code);
  }
}

export function stopSmsOtp(phone?: string) {
  if (!session || (phone && session.phone !== phoneKey(phone))) return;
  const previous = session;
  session = undefined;
  clearTimeout(previous.timer);
  previous.controller.abort();
}

export function startSmsOtp(phone: string, ready = false) {
  stopSmsOtp();
  if (
    typeof window === "undefined" ||
    !window.isSecureContext ||
    !("OTPCredential" in window) ||
    !navigator.credentials?.get
  ) return undefined;

  const controller = new AbortController();
  const current: SmsSession = {
    phone: phoneKey(phone), controller, ready,
    timer: setTimeout(() => {
      if (session === current) stopSmsOtp();
    }, 120_000),
  };
  session = current;
  try {
    const options = {
      otp: { transport: ["sms"] }, signal: controller.signal,
    } as CredentialRequestOptions;
    // Catch both synchronous browser errors and rejected permission requests.
    void navigator.credentials.get(options).then((credential) => {
      if (session !== current || controller.signal.aborted) return;
      const code = (credential as (Credential & { code?: string }) | null)?.code;
      if (typeof code !== "string" || !/^\d{6}$/.test(code)) return;
      current.code = code;
      publish(current);
    }).catch(() => {
      // Unsupported/denied/timed-out WebOTP must never block manual entry.
    });
  } catch {
    stopSmsOtp();
  }
  return current;
}

export function markSmsOtpReady(current: ReturnType<typeof startSmsOtp>) {
  if (!current || session !== current) return;
  current.ready = true;
  publish(current);
}

export function subscribeSmsOtp(phone: string, receive: (code: string) => void) {
  const subscriber = { phone: phoneKey(phone), receive };
  subscribers.add(subscriber);
  if (!session || session.phone !== subscriber.phone) startSmsOtp(phone, true);
  if (session?.phone === subscriber.phone && session.ready && session.code) {
    receive(session.code);
  }
  return () => { subscribers.delete(subscriber); };
}
