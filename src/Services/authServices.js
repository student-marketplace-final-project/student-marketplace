import api from "../api/Api";
import * as url from "../api/AuthURL";

// User Login API
export const authLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.LOGIN_URL, data)
      .then((response) => {
        if (response) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

//User Registration API
export const authRegister = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.REGISTER_URL, data)
      .then((response) => {
        if (response) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

//User Account Verification API
export const verifyByOtp = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.VERIFY_BY_OTP, data)
      .then((response) => {
        if (response) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

//User ForgotPassword API
export const authForgot = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.FORGOT_PASSWORD_URL,data)
      .then((response) => {
        if (response) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

//User  ResetPassword API
export const authReset = (token,data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .post(url.RESET_PASSWORD_URL + token, data)
      .then((response) => {
        if (response) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const authResendCode = (params) => {
  return new Promise(async (resolve, reject) => {
    return api
      .getWithParams(url.RESEND_OTP + params)
      .then((response) => {
        if (response) {
          resolve(response);
        }
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};






