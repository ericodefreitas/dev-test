import { useEffect, useRef } from "react";

function useOuterClick(callback: (e: React.MouseEvent<HTMLElement>) => void) {
  const callbackRef = useRef<typeof callback>();
  const innerRef = useRef<any>();

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e: any) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e);
    }
  }, []);

  return innerRef;
}

export default useOuterClick;
