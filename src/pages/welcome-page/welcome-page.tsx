import styles from "./welcome-page.module.scss";
import toDoLogo from "../../assets/ToDoLogo.svg";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className={classNames(styles.pageContainer, "pageContainer")}>
      <img src={toDoLogo} alt="toDoLogo" />
      <h1>Keep track of daily tasks in life</h1>
      <button
        className={styles.welcomeButton}
        onClick={() => {
          navigate("/Register");
          window.location.reload();
        }}
      >
        Get Started
      </button>
    </div>
  );
}
