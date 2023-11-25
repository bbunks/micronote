import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";

export function useMobile(onChange: () => void) {
  const { width } = useWindowSize();
  const newStatus = width ?? 0 <= 640;

  const currentStatusRef = useRef(newStatus);

  useEffect(() => {
    if (newStatus !== currentStatusRef.current) {
      onChange();
      currentStatusRef.current = newStatus;
    }
  }, [width, onChange, newStatus]);

  return newStatus;
}
