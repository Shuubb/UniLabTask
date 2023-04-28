import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/welcome-page/welcome-page";

export default createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
]);
