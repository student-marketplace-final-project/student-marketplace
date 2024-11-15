import React, { Component } from "react";
import { Label } from "reactstrap";
import CustomInput from "../../../components/Custom/Auth/textinput";
import Button from "../../../components/Custom/Button";
import { Formik, Form } from "formik";
import "../../AuthenticationFlow/auth.scss";
import { Link } from "react-router-dom";
import { errorsConst as ERROR_CONST } from "../../../components/Constants/errors";
import { placeholderConst as PLACEHOLDER_CONST } from "../../../components/Constants/placeholder";
import { authLogin } from "../../../Services/authServices";

import {
  NotificationContainer,NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import * as Yup from "yup";

class Login extends Component {
  constructor(props) {
    super(props);
    //login schema for required field
    this.LoginSchema = Yup.object().shape({
      email: Yup.string()
        .trim()
        .email(ERROR_CONST.VALID_EMAIL)
        .required(ERROR_CONST.REQUIRED_EMAIL),
      password: Yup.string()
        .matches(/^\S*$/, "Spaces are not allowed")
        .required(ERROR_CONST.REQUIRED_PASSWORD)
        .min(8, ERROR_CONST.PASSWORD_MIN_LENGTH),
    });

    this.state = {
      initialValues: {
        email: "",
        password: "",
      },
      hiddenPassword: true,
      isPasswordInvisibleIcon: false,
    };
  }

  onPasswordVisible = () => {
    this.setState({
      hiddenPassword: !this.state.hiddenPassword,
      isPasswordInvisibleIcon: !this.state.isPasswordInvisibleIcon,
    });
  };

  onPasswordInVisible = () => {
    this.setState({
      hiddenPassword: !this.state.hiddenPassword,
      isPasswordInvisibleIcon: !this.state.isPasswordInvisibleIcon,
    });
  };

  handlesubmit = (values) => {
   
    const body = {
      email: values.email,
      password: values.password,
    };
    authLogin(body)
      .then((response) => {
        console.log("-->token",response.data)
        //authorisation token is set to local storage
        localStorage.setItem("A##KEY", response.data.token);
        localStorage.setItem("role", response.data.role);
        //redirect to dashboard
        this.props.history.push('/user-dashboard');
      })
      .catch((error) => {
        const errData =
          error && error.data && error.data.message;
        if (errData === "Invalid email or password") {
          NotificationManager.error("Invalid email or password", "", 400);
        } else if (errData === "Server error") {
          NotificationManager.error("Server Error", "", 500);
        } 
      });
  };


  render() {

    const { initialValues } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid login-bg">
          <div className="row vh-100 align-items-center justify-content-center">
            <div className="col-md-12 col-lg-4 bg-white rounded">
              <div className="innerContent">
                <Label className="Login-label">Login</Label>
                <Label className="Welcome-label">Welcome Back!</Label>

                <Formik
                  validationSchema={this.LoginSchema}
                  initialValues={initialValues}
                  onSubmit={this.handlesubmit}
                >
                  {({ errors, touched, values, handleChange }) => (
                    <Form>
                      <Label className="Top-label">Email address</Label>
                      <CustomInput
                        type="text"
                        values={values}
                        placeholder={PLACEHOLDER_CONST.ENTER_EMAIL}
                        name="email"
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        iconname={"ri-mail-line"}
                      ></CustomInput>

                      <Label className="Top-label">Password</Label>
                      <CustomInput
                        type="Password"
                        values={values}
                        placeholder={PLACEHOLDER_CONST.ENTER_PASSWORD}
                        name="password"
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        iconname={"ri-lock-2-line "}
                        isPassword
                      ></CustomInput>

                      <Link to="/forgot-password">
                        <Label className="forgot-Pass">Forgot Password?</Label>
                      </Link>

                      <div className="text-center">
                        <Button
                          type="submit"
                          name="btn"
                          className="custom-btn"
                        onSubmit={(values) => this.handlesubmit(values)}
                        >
                          Login
                        </Button>
                      </div>
                      <div className="text-center" style={{ marginTop: 10 }}>
                        <Label>Don't have an account?</Label>
                        <Link to={"/register"} className="Register">
                          Register
                        </Link>
                      </div>

                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <NotificationContainer />
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
