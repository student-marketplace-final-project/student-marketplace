import api from "../api/Api";
import * as url from "../api/AuthURL";

// dashboard get all ads
export const getAllAds = (data) => {
    return new Promise(async (resolve, reject) => {
      return api
        .getWithToken(url.GET_ALL_ADS, data)
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
  
//get profile data
export const getProfileData = () => {
  return new Promise(async (resolve, reject) => {
    return api
      .getWithToken(url.GET_PROFILE_DATA)
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

//get profile data
export const updateProfile = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .putWithToken(url.UPDATE_PROFILE, data)
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


export const postAdsData = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .postWithToken(url.POST_VEHICAL_DATA,data)
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

export const archiveAccount = (data) => {
  return new Promise(async (resolve, reject) => {
    return api
      .putWithToken(url.ARCHIVE_USER,data)
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

