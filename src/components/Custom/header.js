import React, { Component } from "react";
import {
  Button, Dropdown, DropdownMenu, DropdownItem, DropdownToggle,
} from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom"
import { archiveAccount } from "../../Services/dashboardServices";
import '../../pages/User/UserDashboard/features.css'

//Import Logos 
import uonlogo from "../../assets/images/uon-logo-square.png";

class HeaderFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isDropdownOpen: false,
      deleteModal: false,
      isLogoutModal: false
    };
    this.deleteModal = this.deleteModal.bind(this);
    this.logoutModal = this.logoutModal.bind(this);

  }

  toggleDropdown = () => {
    this.setState({ isDropdownOpen: true })
  }
  startLoading = () => {
    this.setState({ isLoading: true });
  }
  stopLoading = () => {
    this.setState({ isLoading: false });
  }
  deleteModal() {
    this.setState((prevState) => ({
      deleteModal: !prevState.deleteModal,
    }));
  }
  logoutModal() {
    this.setState((prevState) => ({
      isLogoutModal: !prevState.isLogoutModal,
    }));
  }

  deleteAccount() {
    archiveAccount().then(() => {
      window.location.reload(true);
      localStorage.setItem("A##KEY", "");
      this.delete_modal(false);
    })
      .catch((err) => {

      });
  }
  logoutUser() {
    localStorage.setItem("A##KEY", "");
    window.location.reload(true);
  }
  componentDidMount = () => {
    this.startLoading();

  };

  handleSubmit() {

    this.props.props.history.push("/product");
  };
  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#007db7" }}  >
            <div className="d-flex">
              <div className="navbar-brand-box">

                <span className="logo-lg">
                  <img src={uonlogo} alt="UON MARKETPLACE" height="100" />
                </span>

              </div>
            </div>
            <div className="d-flex custom-btn"  >

              <Button style={{ backgroundColor: "black", textDecorationColor: "white", width: 100 }} onClick={(values) => this.handleSubmit(values)} >{"Post Ad"}</Button>
              <Link to="/profile">
                <i class="ri-user-settings-fill" style={{ fontSize: "35px", color: "#fff", padding: "20px", backgroundColor: "#007db7" }}></i>
              </Link>
              <Dropdown
                isOpen={this.state.singlebtn1}
                toggle={() =>
                  this.setState({ singlebtn1: !this.state.singlebtn1 })
                }
                direction="left"
              >
                <DropdownToggle color="light">
                  <i class="ri-menu-line" style={{ fontSize: "30px", color: "#fff", backgroundColor: "#007db7" }}></i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.deleteModal} >Delete Account</DropdownItem>
                  <DropdownItem onClick={this.logoutModal}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <SweetAlert
                danger
                btnSize="lg"
                show={this.state.deleteModal}
                showCancel
                confirmBtnBsStyle="danger"
                cancelBtnBsStyle="success"
                title={
                  <span style={{ fontSize: 20 }} className="text-center">
                    Delete account
                  </span>
                }
                onConfirm={this.deleteAccount}
                onCancel={() => {
                  this.deleteModal(false);
                }}
              >
                Once you delete your account, there is no going back.
                <br />
                Are you sure you want to do this?
              </SweetAlert>

              <SweetAlert
                btnSize="lg"
                show={this.state.isLogoutModal}
                showCancel
                title={
                  <span style={{ fontSize: 20 }} className="text-center">
                    Logout
                  </span>
                }
                onConfirm={this.logoutUser}
                onCancel={() => {
                  this.logoutModal(false);
                }}
              >
                Are you sure you want to logout?
              </SweetAlert>
            </div>
          </div>
        </header>
      </React.Fragment>
    )
  }
}
export default HeaderFile;