//import cookie
import Cookies from "js-cookie";

//import react router dom
import { Navigate } from "react-router-dom";

function privateRoutes({ children }) {
  //token from cookie
  const token = localStorage.getItem("token");

  //if token not set
  if (!token) {
    return <Navigate to="/login" replace />;
    
  } else { console.log(token); }

  return children;
}

export default privateRoutes;
