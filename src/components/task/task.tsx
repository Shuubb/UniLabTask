import styles from "./task.module.scss";
import DeleteForeverSvg from "../../assets/deleteForever.svg";
import DoneSvg from "../../assets/done.svg";
import { useState } from "react";
import User, { TaskType } from "../../utilities/models/user";
import classNames from "classnames";
import handleTextOverflow from "./functions/handleTextOverflow";

interface Props {
  task: TaskType;
  index: number;
  user: User;
  reRender: () => void;
}

export default function Task(props: Props) {
  const [index] = useState(props.index);

  const taskTextRef = handleTextOverflow();

  function handleDelete(): void {
    props.user.deleteTask(index);
    props.reRender();
  }

  function handleDone(): void {
    props.user.doneTask(index);
    props.reRender();
  }

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
