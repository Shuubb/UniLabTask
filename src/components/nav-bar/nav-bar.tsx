import React from "react";
import styles from "./nav-bar.module.scss";
import { useNavigate } from "react-router-dom";
import { User } from "../../pages/registration-page/registration-page";

type Props = {};

export default function NavBar() {
  const navigate = useNavigate();

  const retData = localStorage.getItem("currentUser");
  let user: User;
  if (retData) user = JSON.parse(retData);

  return (
    <nav className={styles.navBarContainer}>
      <h1 className={styles.TODOLogo}>TO DO</h1>
      <div className={styles.userInfo}>
        <p>{user.name}</p>
        <img src={user.imageBlob}></img>
      </div>
    </nav>
  );
}
