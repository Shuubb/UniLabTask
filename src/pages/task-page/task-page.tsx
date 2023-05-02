import styles from "./task-page.module.scss";
import classNames from "classnames";
import NavBar from "../../components/nav-bar/nav-bar";
import Task from "../../components/task/task";
import User from "../../utilities/models/user";
import { useRef, useState } from "react";

export default function TaskPage() {
  const userRef = useRef(new User());

  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState(displayTasks());

  function handleTaskSubmit(): void {
    if (!inputTask) return;

    userRef.current.addTask(inputTask);
    setTasks(displayTasks());
    setInputTask("");
  }

  function displayTasks(): JSX.Element {
    const taskObjs = userRef.current.tasks;

    if (!taskObjs) return <></>;
    return (
      <>
        {taskObjs.map((task, index) => (
          <Task
            task={task}
            index={index}
            user={userRef.current}
            key={"task" + index}
            reRender={() => setTasks(displayTasks())}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <div className={classNames(styles.pageContainer, "pageContainer")}>
        <NavBar />

        <div className={styles.taskControlContainer}>
          <h1>Add Your Daily Tasks</h1>
          <div className={styles.inputContainer}>
            <input
              className={styles.addTaskInput}
              type="text"
              placeholder="my task"
              title="Write Your Task Please!"
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
            />
            <button className={styles.addTaskButton} onClick={handleTaskSubmit}>
              Add
            </button>
          </div>
          <div>{tasks}</div>
        </div>
      </div>
    </>
  );
}
