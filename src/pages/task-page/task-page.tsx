import { useNavigate } from "react-router-dom";
import { User } from "../registration-page/registration-page";
import styles from "./task-page.module.scss";
import classNames from "classnames";
import NavBar from "../../components/nav-bar/nav-bar";

export default function TaskPage() {
  return (
    <div className={classNames(styles.pageContainer, "pageContainer")}>
      <NavBar />
    </div>
  );
}
