export const ABOUT_ICON = require("../../assets/images/Icons/about.png");
export const USER_ICON = require("../../assets/images/Icons/user.png");
export const SIDE_MENU_ICON = require("../../assets/images/Icons/sidemenu.png");
export const COPY = require("../../assets/images/Icons/copy.png");
export const FILE_UPLOAD_IMG = require("../../assets/images/Icons/uploadlogo.png");
export const ACTIVATION_LOGO = require("../../assets/images/Icons/Activation.png");
export const LOGOUT_ICON = require("../../assets/images/Icons/exit.png");
export const API_ICON = require("../../assets/images/Icons/api.png");
export const VERIFICATION_ICON = require("../../assets/images/Icons/verification.png");
export const BULK_VERIFICATION = require("../../assets/images/Icons/bulk.png");

export const setFeildValues = (formObj, feild, value) => {
  formObj.formRef.current.setFieldValue(feild, value);
};

export const Storage = {
  USER_EMAIL: "USER_EMAIL",
  VEIFY_EMAIL: "VEIFY_EMAIL",
};

export const country = [
  { name: "Australia" },
  { name: "Austria" },
  { name: "Algeria" },
  { name: "Belgium" },
  { name: "Bulgaria" },
  { name: "Bhutan" },
  { name: "Brazil" },
  { name: "Canada" },
  { name: "China" },
  { name: "Cyprus" },
  { name: "Czech Republic" },
  { name: "Denmark" },
  { name: "Estonia" },
  { name: "Estonia" },
  { name: "Finland" },
  { name: "France" },
  { name: "Germany" },
  { name: "Greece" },
  { name: "Hong Kong" },
  { name: "India" },
  { name: "Ireland" },
  { name: "Italy" },
  { name: "Japan" },
  { name: "Latvia" },
  { name: "Lithuania" },
  { name: "Luxembourg" },
  { name: "Malta" },
  { name: "Mexico" },
  { name: "Netherlands" },
  { name: "New Zealand" },
  { name: "Norway" },
  { name: "Poland" },
  { name: "Portugal" },
  { name: "Romania" },
  { name: "Singapore" },
  { name: "Slovakia" },
  { name: "Slovenia" },
  { name: "Spain" },
  { name: "Sweden" },
  { name: "Switzerland" },
  { name: "United Kingdom" },
  { name: "United States" },
];
