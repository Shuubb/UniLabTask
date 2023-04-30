import styles from "./task-page.module.scss";
import classNames from "classnames";
import NavBar from "../../components/nav-bar/nav-bar";

export default function TaskPage() {
  return (
    <>
      <div className={classNames(styles.pageContainer, "pageContainer")}>
        <NavBar />

        <div>
          <h1>Add Your Daily Tasks</h1>
          <div className={styles.inputContainer}>
            <input
              className={styles.addTaskInput}
              type="text"
              placeholder="my task"
              title="Write Your Task Please!"
            />
            <button className={styles.addTaskButton}>Add</button>
          </div>
        </div>
      </div>
    </>
  );
}
