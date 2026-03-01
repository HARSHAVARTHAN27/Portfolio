import { useEffect } from "react";

export const useCursor = (cursorRef, trailRef) => {
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 6 + "px";
        cursorRef.current.style.top = e.clientY - 6 + "px";
      }
      if (trailRef.current) {
        trailRef.current.style.left = e.clientX - 18 + "px";
        trailRef.current.style.top = e.clientY - 18 + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorRef, trailRef]);
};
