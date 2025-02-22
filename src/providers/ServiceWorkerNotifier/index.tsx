import { notifications } from "@mantine/notifications";
import { useEffect } from "react";
import { isElectron } from "utils";

export function ServiceWorkerNotifier() {
  useEffect(() => {
    if (isElectron()) {
      return;
    }
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.addEventListener("NEW_CONTENT_AVAILABLE", (event) => {
        notifications.show({
          message: "New content available, refresh required! 🚀",
          position: "bottom-center",
        });
      });
      navigator.serviceWorker.addEventListener("NEW_VERSION_AVAILABLE", (event) => {
        notifications.show({
          message: "New version available, refresh required! 🚀",
          position: "bottom-center",
        });
      });
    }
  }, []);

  return <></>;
}
