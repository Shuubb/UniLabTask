import styles from "./task-page.module.scss";
import classNames from "classnames";
import NavBar from "../../components/nav-bar/nav-bar";
import Task from "../../components/task/task";
import User from "../../utilities/models/user";
import { useState } from "react";

export default function TaskPage() {
  const user = new User();

  const [inputTask, setInputTask] = useState("");
  const [tasks, setTasks] = useState(user.tasks);

  function handleTaskSubmit(): void {
    if (!inputTask) return;

    user.addTask(inputTask);
    setTasks(user.tasks);
    setInputTask("");
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
          <div>
            {tasks &&
              tasks.map((task, index) => (
                <Task
                  task={task}
                  index={index}
                  user={user}
                  key={"task" + index}
                  reRender={() => setTasks(user.tasks)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
