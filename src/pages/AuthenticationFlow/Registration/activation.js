import React, { Component } from "react";
import { Label } from "reactstrap";
import { ACTIVATION_LOGO } from "../../../components/Constants";
import { Formik, Form } from "formik";
import Button from "../../../components/Custom/Button";
import CustomInput from "../../../components/Custom/User/Textinput";
import { verifyByOtp, authResendCode } from "../../../Services/authServices";
import "../../AuthenticationFlow/auth.scss";
import { Storage } from "../../../components/Constants/index";
import * as Yup from "yup";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

class Activation extends Component {
  constructor(props) {
    super(props);
    this.activationSchema = Yup.object().shape({
      otp: Yup.string().required("otp is required"),
    });
    this.state = {
      initialValues: {
        email: "",
        otp: "",
      },
    };
  }

  handlesubmit = (values) => {
    console.log("activation value",values);

    const body = {
      otp: values.otp,
      email: localStorage.getItem(Storage.USER_EMAIL),
    };
    verifyByOtp(body)
      .then(() => {
        this.props.history.push("/login");
      })
      .catch((err) => {
        const errData =
          err && err.data && err.data.error && err.data.error.message;
        if (errData === "err_0") {
          NotificationManager.error("Invalid code", "", 700);
        } else if (errData === "err_500") {
          NotificationManager.error(
            "Internal server error. Please try again after sometime",
            "",
            700
          );
        } else {
          NotificationManager.error("something went wrong", "", 700);
        }
      });
  };

  resendCode = () => {
    authResendCode(localStorage.getItem(Storage.USER_EMAIL))
      .then((res) => {
        NotificationManager.success(
          "Verify email sent successfully to your email",
          "",
          700
        );
      })
      .catch((err) => {
        NotificationManager.error(
          "This email is already verified please login",
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
              <div className="innerContent" style={{ color: "#0000" }}>
                <div
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                    }}
                    className="text-center"
                  >
                    <div style={{ justifyContent: "center", display: "flex" }}>
                      <img
                        src={ACTIVATION_LOGO}
                        height={70}
                        width={70}
                        style={{ marginTop: 10 }}
                        alt="activation logo"
                      ></img>
                    </div>

                    <Label className="Welcome-label" style={{ marginTop: 20 }}>
                      Activation email sent.
                    </Label>

                    <h6>
                      6-digit security code has been sent to{" "}
                      <b>{localStorage.getItem(Storage.USER_EMAIL)}</b> <br />{" "}
                      to verify your account
                    </h6>

                    <div
                      style={{
                        width: "50%",
                        alignSelf: "center",
                        marginTop: 20,
                      }}
                    >
                      <Formik
                        initialValues={initialValues}
                        onSubmit={this.handlesubmit}
                        validationSchema={this.activationSchema}
                      >
                        {({ errors, touched, values, handleChange }) => (
                          <Form>
                            <CustomInput
                              className="otp-input"
                              type="text"
                              values={values}
                              placeholder="Enter 6-digit Code"
                              name="otp"
                              handleChange={handleChange}
                              touched={touched}
                              errors={errors}
                            ></CustomInput>

                            <Button
                              type="submit"
                              name="btn"
                              className="custom-btn"
                              onSubmit={(values) => this.handlesubmit(values)}
                            >
                              Login
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                  <div style={{ justifyContent: "center", display: "flex" }}>
                    <div className="text-center">
                      <label
                        style={{ color: "#2a96c3" }}
                        onClick={this.resendCode}
                      >
                        Resend Code
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </React.Fragment>
    );
  }
}

export default Activation;
