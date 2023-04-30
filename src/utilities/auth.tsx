import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Auth() {
  const user = localStorage.getItem("currentUser");

  const location = useLocation().pathname;
  const regExp = /\/Auth\/.*/i;
  const needsAuth = regExp.test(location);

  console.log("first" + (needsAuth && !user));
  console.log(!needsAuth && !!user);
  if (needsAuth && !user) return <Navigate to="/" />;
  else if (!needsAuth && !!user) return <Navigate to="/Auth/TaskPage" />;
  else return <Outlet />;
}
