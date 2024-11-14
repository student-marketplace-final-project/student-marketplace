import React, { Component } from "react";
import { Label } from "reactstrap";
import CustomInput from "../../../components/Custom/Auth/textinput";
import Button from "../../../components/Custom/Button";
import { placeholderConst as PLACEHOLDER_CONST } from "../../../components/Constants/placeholder";
import { authRegister } from "../../../Services/authServices";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import "../../AuthenticationFlow/auth.scss";
import { Storage } from "../../../components/Constants/index";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";


class Registration extends Component {
  constructor(props) {
    super(props);
    this.RegisterSchema = Yup.object().shape({
      name: Yup.string()
        .required("Please enter your name")
        .min(2, "Name must be more than two letter")
        .matches(/[^\s*].*[^\s*]/g, "Spaces are not allowed "),

      email: Yup.string()
        .required("Please enter email address")
        .email("Please enter valid email address"),
      
      contact: Yup.number()
        .required("Please enter contact details"), 
        //.max(10,"Number contains only ten numbers"),
      
        address: Yup.string()
        .required("Please enter address"),

      password: Yup.string()
      .matches(/^\S*$/, "Spaces are not allowed")
        .required("Please enter password")
        .min(8, "Password must be at least 8 character"),

      confirmpassword: Yup.string()
      .matches(/^\S*$/, "Spaces are not allowed")
        .required("Please enter confirm password")
        .oneOf(
          [Yup.ref("password"), null],
          "Confirm password doesn't match with password"
        ),
    });

    this.state = {
      initialValues: {
        name: "",
        email: "",
        contact:"",
        address:"",
        password: "",
        confirmpassword: "",
        isStudent:true
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

  componentDidMount() {
    localStorage.clear();
  }

  handlesubmit = (values) => {
    console.log("regidtration value",values);

    const body = {
      name: values.name,
      email: values.email,
      phone_number:values.contact,
      address:values.address,
      password: values.password,
      is_student:true
    };
    authRegister(body)
      .then((response) => {
        console.log("register response--->>>",response);
       localStorage.setItem(Storage.USER_EMAIL, values.email);
        NotificationManager.success(
          "You have successfully registered",
          "",
          201
        );
        this.props.history.push('/login');

      })
      .catch((err) => {
        console.log("---->error", err.data.message)
        const errorData =
          err && err.data && err.data.message;
        if (errorData === "User already exists") {
          NotificationManager.error(
            "This email is already registered",
            "",
            400
          );
        } else if (errorData === "Server error") {
          NotificationManager.error(
            "Server Error",
            "",
            500
          );
        } 
      });
  };
  render() {
    const { initialValues } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid login-bg">
          <div className="row align-items-center justify-content-center ">
            <div className="col-md-12 col-lg-4 bg-white rounded containermargin">
              <div className="innerContent">
                <Label className="Login-label">Register</Label>
                <Formik
                  validationSchema={this.RegisterSchema}
                  initialValues={initialValues}
                  onSubmit={this.handlesubmit}
                >
                  {({ errors, touched, values, handleChange }) => (
                    <Form>
                      <Label className="Top-label">Full Name</Label>
                      <CustomInput
                        type="text"
                        values={values}
                        placeholder={PLACEHOLDER_CONST.ENTER_FULLNAME}
                        name="name"
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        iconname={"ri-user-line"}
                      ></CustomInput>
                      <Label className="Top-label">Email Address</Label>
                      <CustomInput
                        type="text"
                        values={values}
                        placeholder={PLACEHOLDER_CONST.ENTER_EMAIL}
                        name="email"
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        iconname="ri-mail-line"
                      ></CustomInput>
                      <Label className="Top-label">Address</Label>

                       <CustomInput
                        type="text"
                        values={values}
                       placeholder={PLACEHOLDER_CONST.ENTER_ADDRESS}
                        name="address"
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        iconname="ri-home-2-line"
                      ></CustomInput>
                      <Label className="Top-label">Contact Number</Label>
                       <CustomInput
                        type="number"
                        values={values}
                        placeholder={PLACEHOLDER_CONST.ENTER_PHONENUMBER}
                        name="contact"
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        iconname="ri-phone-line"
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
                        iconname="ri-lock-2-line"
                        isPassword
                      ></CustomInput>

                      <Label className="Top-label">Confirm Password</Label>
                      <CustomInput
                        type="Password"
                        values={values}
                        placeholder={PLACEHOLDER_CONST.ENTER_PASSWORD}
                        name="confirmpassword"
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        iconname="ri-lock-2-line"
                        isPassword
                      ></CustomInput>
                      <div className="text-center" style={{ marginTop: 10 }}>
                        <Label>By clicking "Register" I agree to the</Label>
                        <Link to={"/register"} className="Register">
                        Terms and Conditions and Privacy Policy.
                        </Link>
                      </div>

                      <div className="text-center">
                        <Button
                          type="submit"
                          name="btn"
                          className="custom-btn"
                          onSubmit={(values) => this.handlesubmit(values)}
                        >
                          Register
                        </Button>
                      </div>
                      <div className="text-center" style={{ marginTop: 10 }}>
                        <Label>Already have an account?</Label>
                        <Link to={"/login"} className="Register">
                          Login here
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </React.Fragment>
    );
  }
}

export default Registration;
