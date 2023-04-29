import { useNavigate } from "react-router-dom";
import { User } from "../registration-page/registration-page";
import styles from "./task-page.module.scss";
import classNames from "classnames";

export default function TaskPage() {
  const navigate = useNavigate();

  const retData = localStorage.getItem("currentUser");
  let user: User;
  if (retData) user = JSON.parse(retData);
  else {
    navigate("/");
    return;
  }

  return (
    <div className={classNames(styles.pageContainer, "pageContainer")}>
      {user.name}
      <img src={user.imageBlob}></img>
    </div>
  );
}
