import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/registration-page/registration-page";

export default createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
]);
