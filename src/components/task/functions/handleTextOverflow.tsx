import { useEffect, useRef } from "react";

export default function handleTextOverflow() {
  const taskTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    function handleDown(downE: MouseEvent | TouchEvent) {
      const initialClientX =
        downE instanceof MouseEvent ? downE.clientX : downE.touches[0].clientX;
      const initialX = initialClientX;
      let lastCurserPos = 0;
      const realScrollWidth =
        taskTextRef.current!.scrollWidth - taskTextRef.current!.clientWidth;

      function handleMove(moveE: MouseEvent | TouchEvent) {
        let clientX =
          moveE instanceof MouseEvent
            ? moveE.clientX
            : moveE.touches[0].clientX;
        let cursorPos = initialX - clientX;

        let nextPos =
          taskTextRef.current!.scrollLeft + cursorPos - lastCurserPos;

        if (nextPos >= realScrollWidth || nextPos <= 0)
          taskTextRef.current!.style.left = `${-Math.cbrt(cursorPos)}px`;
        taskTextRef.current!.scrollLeft = nextPos;
        lastCurserPos = cursorPos;
      }

      function handleUp() {
        window.removeEventListener("mousemove", handleMove);
        window.removeEventListener("touchmove", handleMove);
        window.removeEventListener("mouseup", handleUp);
        window.removeEventListener("touchend", handleUp);
        taskTextRef.current!.style.left = `0px`;
      }

      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("mouseup", handleUp);
      window.addEventListener("touchend", handleUp, { passive: false });
    }

    taskTextRef.current?.addEventListener("mousedown", handleDown);
    taskTextRef.current?.addEventListener("touchstart", handleDown, {
      passive: true,
    });

    return () => {
      taskTextRef.current?.removeEventListener("mousedown", handleDown);
      taskTextRef.current?.removeEventListener("touchstart", handleDown);
    };
  }, []);

  return taskTextRef;
}
