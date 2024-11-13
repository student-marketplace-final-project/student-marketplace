import React, { Component } from "react";
import Label from "reactstrap/lib/Label";
import TextInput from "../../../components/Custom/Auth/textinput";
import Button from "../../../components/Custom/Button";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { placeholderConst as PLACEHOLDER_CONST } from "../../../components/Constants/placeholder";
import { authForgot } from "../../../Services/authServices";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import * as Yup from "yup";
import "../../AuthenticationFlow/auth.scss";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.ForgotSchema = Yup.object().shape({
      email: Yup.string()
        .trim()
        .email("Please enter valid email address")
        .required("Please enter email address"),
    });

    this.state = {
      initialValues: {
        email: "",
      },
    };
  }

  handleSubmit = (values, { resetForm }) => {
    console.log("----> forgot password",values);
    const body = {
      email: values.email
    };
    authForgot(body)
      .then(() => {
        resetForm();
        NotificationManager.success("Password reset email sent", "", 700);
        this.setState({ initialValues: "" });
      })
      .catch(() => {
        NotificationManager.error(
          "User does not belong to any account",
          "",
          700
        );
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
                <Label className="Login-label">Forgot Password?</Label>
                <Label className="Welcome-label">
                  Please Enter Your Email Address
                </Label>
                <Formik
                  validationSchema={this.ForgotSchema}
                  initialValues={initialValues}
                  onSubmit={this.handleSubmit}
                >
                  {({ errors, touched, values, handleChange }) => (
                    <Form>
                      <Label className="Top-label">Email address</Label>
                      <TextInput
                        type="type"
                        values={values}
                        placeholder={PLACEHOLDER_CONST.ENTER_EMAIL}
                        name="email"
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        iconname={"ri-mail-line"}
                      ></TextInput>

                      <div className="text-center">
                        <Button
                          type="submit"
                          name="btn"
                          className="custom-btn"
                          onSubmit={this.handleSubmit}
                        >
                          Reset Password
                        </Button>
                      </div>
                      <div className="justify-content-center d-flex align-item-center">
                        <Link to="/login">
                          <Label className="Register">Go back to login</Label>
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
export default ForgotPassword;
