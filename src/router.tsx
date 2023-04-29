import { createBrowserRouter } from "react-router-dom";
import RegistrationPage from "./pages/registration-page/registration-page";
import WelcomePage from "./pages/welcome-page/welcome-page";
import TaskPage from "./pages/task-page/task-page";

export default createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/Register",
    element: <RegistrationPage />,
  },
  {
    path: "/TaskPage",
    element: <TaskPage />,
  },
]);
