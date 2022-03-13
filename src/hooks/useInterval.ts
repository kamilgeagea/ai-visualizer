import { useEffect, useRef } from "react";

const useInterval = (callback: Function, [delay, play]: [number, boolean]) => {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (play) {
      const id = setInterval(() => {
        savedCallback.current && savedCallback.current();
      }, delay);

      return () => clearInterval(id);
    }
  }, [delay, play]);
};

export default useInterval;
