import React from "react";
import AdminDashboard from "../../../components/Admin/AdminDashboard";
import Dashboard from "./index";
const UserDashboard = () => {
  const Role = localStorage.getItem("role");
  return (
    //below condition will check for user role if it's admin then redirect to admin dashboard if it's user then redirect to user dashboard
    <>
      {Role === "admin" && <AdminDashboard />}
      {Role === "user" && <Dashboard />}
    </>
  );
};
export default UserDashboard;
