export function getLocalDate() {
  const date = new Date();
  const timezoneOffset = date.getTimezoneOffset();

  return new Date(date.getTime() - timezoneOffset * 60_000)
    .toISOString()
    .split("T")[0];
}

export function getCurrentTime() {
  const date = new Date();

  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}