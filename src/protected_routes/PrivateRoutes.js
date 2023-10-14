import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import UtilService from "../services/util.service";

//if I have dashbaord data inside private route by outlet
//we want dashobard component to be private it depends on outlet if outlet then we can see otherwise we cant
function PrivateRoutes() {
  const loggedIn = UtilService.isLoggedIn();
  if (loggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoutes;
