import axios from "axios";

export const getUsers = async () => {
  const usersinfo = await axios.get(
    "https://weblab-react-special-midtern.herokuapp.com/v1/users/"
  );
  // console.log(usersinfo.data.result);
  return usersinfo.data.result;
};

export const getUser = async (userId) => {
  const userinfo = await axios.get(
    `https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`
  );
  // console.log(userinfo.data.result);
  return userinfo.data.result;
};

export const userLogin = async (login) => {
  const userInfo = await axios.post(
    " https://api.weblab.tw/v1/auth/general-login",
    {
      appId: "weblab",
      account: login.account,
      password: login.password
    }
  );
  return userInfo;
};

export const userRegister = async (register) => {
  const newuserInfo = await axios.post(
    "https://api.weblab.tw/v1/auth/register",
    {
      appId: "weblab",
      email: register.email,
      username: register.username,
      password: register.password
    }
  );
  return newuserInfo;
};

export const deleteUserProfile = async (userId, authToken) => {
  const headers = {
    Authorization: `Bearer ${authToken}`
  };
  const deleteProfile = await axios.delete(
    `https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`,
    { headers }
  );
  return deleteProfile;
};

export const getUpdateUser = async (user, userId, authToken) => {
  const headers = {
    Authorization: `Bearer ${authToken}`
  };
  const updateUserRes = await axios.post(
    `https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`,
    {
      username: user.username,
      description: user.description || null,
      pictureUrl: user.picture_url || null
    },
    {
      headers
    }
  );

  return updateUserRes;
};
