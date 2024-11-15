import React from "react";
import AdminDashboard from "../../../components/Admin/AdminDashboard";
import Dashboard from "./index";
const UserDashboard = (props) => {
  const Role = localStorage.getItem("role",props);
  return (
    <>
      {Role === "admin" && <AdminDashboard />}
      {Role === "user" && <Dashboard props={props}/>}
    </>
  );
};
export default UserDashboard;
