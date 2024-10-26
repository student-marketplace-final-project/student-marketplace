import React, { Component } from "react";
import Label from "reactstrap/lib/Label";
import CustomInput from "../../../components/Custom/Auth/textinput";
import Button from "../../../components/Custom/Button";
import { Formik, Form } from "formik";
import { placeholderConst as PLACEHOLDER_CONST } from "../../../components/Constants/placeholder";
import "../../AuthenticationFlow/auth.scss";
import { authReset } from "../../../Services/authServices";
import * as Yup from "yup";

class Login extends Component {
  constructor(props) {
    super(props);
    this.LoginSchema = Yup.object().shape({
      password: Yup.string()
        .required("Please enter password")
        .min(8, "Password must be at least 8 character"),
      confirmPassword: Yup.string()
        .required("Confirm Password required")
        .oneOf(
          [Yup.ref("password"), null],
          "Confirm password doesn't match with new password"
        ),
    });

    this.state = {
      initialValues: {
        password: "",
        confirmPassword: "",
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

  handleSubmit = (values) => {
    const token = this.props.location.search;
    const newToken = token.split("?token=")[1];

    const body = {
      token: newToken,
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    };
    authReset(body)
      .then(() => {
        this.props.history.push("/login");
      })
      .catch(() => {});
  };

  render() {
    const { initialValues } = this.state;
    return (
      <React.Fragment>
        <div className="container-fluid login-bg">
          <div className="row vh-100 align-items-center justify-content-center">
            <div className="col-md-12 col-lg-4 bg-white rounded">
              <div className="innerContent">
                <Label className="Login-label">Reset Password</Label>

                <Formik
                  validationSchema={this.LoginSchema}
                  initialValues={initialValues}
                  onSubmit={this.handleSubmit}
                >
                  {({ errors, touched, values, handleChange }) => (
                    <Form>
                      <Label className="Top-label">New Password</Label>
                      <CustomInput
                        type="Password"
                        values={values}
                        placeholder={PLACEHOLDER_CONST.ENTER_NEWPASSWORD}
                        name="password"
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        iconname={"ri-lock-2-line"}
                        isPassword
                      ></CustomInput>

                      <Label className="Top-label">Confirm Password</Label>
                      <CustomInput
                        type="Password"
                        values={values}
                        placeholder={PLACEHOLDER_CONST.ENTER_CONFIRMPASSWORD}
                        name="confirmPassword"
                        handleChange={handleChange}
                        touched={touched}
                        errors={errors}
                        iconname={"ri-lock-2-line "}
                        isPassword
                      ></CustomInput>

                      <div className="text-center">
                        <Button
                          type="submit"
                          name="btn"
                          className="custom-btn"
                          onSubmit={(values) => this.handleSubmit(values)}
                        >
                          Login
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
