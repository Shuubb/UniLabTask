import styles from "./task.module.scss";
import DeleteForeverSvg from "../../assets/deleteForever.svg";
import DoneSvg from "../../assets/done.svg";
import { useEffect, useRef, useState } from "react";
import User, { TaskType } from "../../utilities/models/user";
import classNames from "classnames";

interface Props {
  task: TaskType;
  index: number;
  user: User;
  reRender: () => void;
}

export default function Task(props: Props) {
  const [index] = useState(props.index);

  const taskTextRef = useRef<HTMLParagraphElement>(null);

  function handleDelete(): void {
    props.user.deleteTask(index);
    props.reRender();
  }

  function handleDone(): void {
    props.user.doneTask(index);
    props.reRender();
  }

  useEffect(() => {
    function handleMouseDown(downE: MouseEvent) {
      const initialX = downE.clientX;
      let lastCurserPos = 0;
      const realScrollWidth =
        taskTextRef.current!.scrollWidth - taskTextRef.current!.clientWidth;

      function handleMouseMove(moveE: MouseEvent) {
        let curserPos = initialX - moveE.clientX;

        let nextPos =
          taskTextRef.current!.scrollLeft + curserPos - lastCurserPos;

        if (nextPos >= realScrollWidth || nextPos <= 0)
          taskTextRef.current!.style.left = `${-Math.cbrt(curserPos)}px`;
        taskTextRef.current!.scrollLeft = nextPos;
        lastCurserPos = curserPos;
      }

      function handleMouseUp() {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        taskTextRef.current!.style.left = `0px`;
      }

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    taskTextRef.current?.addEventListener("mousedown", handleMouseDown);

    return () => {
      taskTextRef.current?.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div
      className={classNames(
        styles.taskContainer,
        props.task.isDone ? styles.gray : ""
      )}
    >
      <p ref={taskTextRef}>{props.task.taskText}</p>
      <div className={styles.controlButtonsContainer}>
        <img
          src={DoneSvg}
          className={styles.doneButton}
          alt={"taskDone" + props.index}
          onClick={handleDone}
        />
        <img
          src={DeleteForeverSvg}
          className={styles.deleteButton}
          alt={"taskDelete" + props.index}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}
