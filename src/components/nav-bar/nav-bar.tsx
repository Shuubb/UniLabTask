import User from "../../utilities/models/user";
import styles from "./nav-bar.module.scss";

import { useState } from "react";

export default function NavBar() {
  const [userMenuVisibility, setUserMenuVisibility] = useState(false);

  const user = new User();

  return (
    <nav className={styles.navBarContainer}>
      <h1 className={styles.TODOLogo}>TO DO</h1>
      <div className={styles.userInfo}>
        <p>{user.name}</p>
        <img
          src={user.imageDataURL}
          onClick={() => setUserMenuVisibility(!userMenuVisibility)}
        ></img>
      </div>
      {userMenuVisibility && (
        <div className={styles.dropDown}>
          <hr />
          <button onClick={() => user.signOut()}>Sign Out</button>
        </div>
      )}
    </nav>
  );
}
