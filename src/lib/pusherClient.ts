import Pusher from "pusher-js";

let pusherInstance: Pusher | null = null;

export const getPusherClient = (): Pusher | null => {
  if (typeof window === "undefined") return null;

  if (!pusherInstance) {
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY || "090ea1adb4d94c205f51";
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "ap2";

    if (!key) {
      console.warn("Pusher key missing in environment variables");
      return null;
    }

    pusherInstance = new Pusher(key, {
      cluster,
      forceTLS: true,
    });
  }

  return pusherInstance;
};
