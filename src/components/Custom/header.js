import React, { Component } from "react";
import { Link } from "react-router-dom"
import '../../pages/User/UserDashboard/features.css'

//Import Logos 
import uonlogo from "../../assets/images/uon-logo-square.png";

class HeaderFile extends Component {
    render() {
        return (
            <React.Fragment>
                <header id="page-topbar">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#007db7" }}  >
                        <div className="d-flex">
                            <div className="navbar-brand-box">
                                <Link to="/" className="logo logo-dark">
                                    <span className="logo-lg">
                                        <img src={uonlogo} alt="UON MARKETPLACE" height="100" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>
            </React.Fragment>
        )
    }
}
export default HeaderFile;