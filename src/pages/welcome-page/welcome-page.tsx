import styles from "./welcome-page.module.scss";
import toDoLogo from "../../assets/ToDoLogo.svg";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useEffect, useRef } from "react";

export default function WelcomePage() {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === "Enter") buttonRef.current?.click();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={classNames(styles.pageContainer, "pageContainer")}>
      <div>
        <img src={toDoLogo} alt="toDoLogo" />
        <h1>Keep track of daily tasks in life</h1>
      </div>
      <button
        className={styles.welcomeButton}
        onClick={() => {
          navigate("/Register");
        }}
        ref={buttonRef}
      >
        Get Started
      </button>
    </div>
  );
}
