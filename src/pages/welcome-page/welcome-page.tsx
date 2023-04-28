import "./welcome-page.scss";
import toDoLogo from "../../assets/ToDoLogo.svg";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div id="welcomeContainer">
      <img src={toDoLogo} alt="toDoLogo" />
      <h1>Keep track of daily tasks in life</h1>
      <button
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
