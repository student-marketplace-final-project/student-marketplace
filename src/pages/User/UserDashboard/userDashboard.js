import React from "react";
import AdminDashboard from "../../../components/Admin/AdminDashboard";
import Dashboard from "./index";
const UserDashboard = () => {
  const Role = localStorage.getItem("role");
  return (
    <>
      {Role === "admin" && <AdminDashboard />}
      {Role === "user" && <Dashboard />}
    </>
  );
};
export default UserDashboard;
