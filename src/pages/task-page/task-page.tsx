import styles from "./task-page.module.scss";
import classNames from "classnames";
import NavBar from "../../components/nav-bar/nav-bar";
import Auth from "../../utilities/auth";

export default function TaskPage() {
  return (
    <>
      <div className={classNames(styles.pageContainer, "pageContainer")}>
        <NavBar />
      </div>
    </>
  );
}
