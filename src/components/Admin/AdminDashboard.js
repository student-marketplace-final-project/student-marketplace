import React, { useState } from 'react';
import UserManagement from './UserManagement';
import AdManagement from './AdManagement';
import uonlogo from "../../assets/images/uon-logo-square.png";
import SweetAlert from "react-bootstrap-sweetalert";

const AdminDashboard = () => {
    const [logoutModal, setLogoutModal] = useState(false);
    const logoutAdminModal = () => {
        setLogoutModal(!logoutModal)
    }
    const logoutAdmin = () => {
        localStorage.setItem("A##KEY", "");
        window.location.reload(true);
    }
    return (
        <div>
            <header id="page-topbar"></header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#007db7" }}  >
                <div className="d-flex">
                    <span className="logo-lg">
                        <img src={uonlogo} alt="UON MARKETPLACE" height="100" />
                    </span>
                </div>
                <h1 className='text-center' style={{ color: "white" }}>Admin Dashboard</h1>
                <i class="ri-menu-line" style={{ fontSize: "30px", color: "#fff", backgroundColor: "#007db7", display: "flex", justifyContent: "flex-end", padding: "10px", marginRight: "10px" }}
                    onClick={logoutAdminModal}></i>

            </div>
            <SweetAlert
                btnSize="lg"
                show={logoutModal}
                showCancel
                title={
                    <span style={{ fontSize: 20 }} className="text-center">
                        Logout
                    </span>
                }
                onConfirm={logoutAdmin}
                onCancel={() => {
                    setLogoutModal(false);
                }}
            >
                Are you sure you want to logout?
            </SweetAlert>

            <div>
                <UserManagement />
                <AdManagement />
            </div>
        </div>
    );
};

export default AdminDashboard;