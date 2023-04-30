import { createBrowserRouter } from "react-router-dom";
import RegistrationPage from "./pages/registration-page/registration-page";
import WelcomePage from "./pages/welcome-page/welcome-page";
import TaskPage from "./pages/task-page/task-page";
import Auth from "./utilities/middleware/auth";

export default createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "/Auth",
        children: [
          {
            path: "TaskPage",
            element: <TaskPage />,
          },
        ],
      },
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/Register",
        element: <RegistrationPage />,
      },
    ],
  },
]);
