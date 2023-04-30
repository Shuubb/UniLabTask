import styles from "./nav-bar.module.scss";
import { User } from "../../pages/registration-page/registration-page";
import { useState } from "react";

export default function NavBar() {
  const [userMenuVisibility, setUserMenuVisibility] = useState(false);

  const retData = localStorage.getItem("currentUser");
  let user: User = JSON.parse(retData!);

  function handleSignOut(): void {
    localStorage.removeItem("currentUser");
    location.reload();
  }

  return (
    <nav className={styles.navBarContainer}>
      <h1 className={styles.TODOLogo}>TO DO</h1>
      <div className={styles.userInfo}>
        <p>{user.name}</p>
        <img
          src={user.imageBlob}
          onClick={() => setUserMenuVisibility(!userMenuVisibility)}
        ></img>
      </div>
      {userMenuVisibility && (
        <div className={styles.dropDown}>
          <hr />
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </nav>
  );
}
