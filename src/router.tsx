import { createBrowserRouter } from "react-router-dom";
import RegistrationPage from "./pages/registration-page/registration-page";
import WelcomePage from "./pages/welcome-page/welcome-page";

export default createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/Register",
    element: <RegistrationPage />,
  },
]);
