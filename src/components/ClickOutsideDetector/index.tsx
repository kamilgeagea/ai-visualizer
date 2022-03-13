import { FC, ReactNode, useRef, useEffect, useCallback, RefObject } from "react";

const useOutsideAlerter = (ref: RefObject<HTMLDivElement>, onClick: Function) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClick, ref]);
};

interface ClickOutsideDetectorProps {
  children: ReactNode;
  onClick: Function;
}

const ClickOutsideDetector: FC<ClickOutsideDetectorProps> = ({ children, onClick }) => {
  const onClickCallback = useCallback(() => onClick(), [onClick]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, onClickCallback);

  return (
    <div ref={wrapperRef}>{children}</div>
  );
};

export default ClickOutsideDetector;