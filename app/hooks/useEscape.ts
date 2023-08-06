import { useEffect } from "react";

const useEscapeKey = (callback: () => void, active = true): void => {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        callback();
      }
    };

    if (active) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [callback, active]);
};

export default useEscapeKey;
