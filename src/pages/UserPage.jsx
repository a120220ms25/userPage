import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import User from "../components/User";
import AuthContext from "../contexts/AuthContext";
import TokenContext from "../contexts/TokenContext";
import {
  getUser,
  getUsers,
  getUserUrl,
  getUserDescription,
  deleteUserProfile
} from "../utils";

const UserPage = () => {
  const [user, setUser] = useState();
  const [userUrl, setUserUrl] = useState();
  const [userDescription, setUserDescription] = useState();
  const { token, setToken } = useContext(TokenContext);
  const history = useHistory();
  const { authToken, setAuthToken } = useContext(AuthContext);

  const { userId } = useParams();
  console.log("userid--->" + userId);
  console.log("data-->" + user);
  const [error, setError] = useState();

  useEffect(() => {
    getUser(userId)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [userId]);

  // const deleteUser = async ({ userId, token }) => {
  //   const headers = {
  //     Authorization: `Bearer ${token}`
  //   };
  //   const deletedUser = await axios.delete(
  //     `https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`,
  //     {
  //       headers
  //     }
  //   );
  //   return deletedUser;
  // };

  return (
    <div>
      <Nav />
      <StyledContainer>
        <User
          username={user ? user.username : "loading"}
          picture={user ? user.picture_url : "loading"}
          description={user ? user.description : "loading"}
        ></User>
        <StyledEditInfo>
          <button
            onClick={() => {
              if (user.username === token) {
                history.push(`/edit/${userId}`);
              } else {
                alert("您無法編輯，權限不足!");
              }
            }}
          >
            編輯
          </button>

          <button
            onClick={() => {
              deleteUserProfile(userId, authToken)
                .then((res) => {
                  console.log(res);
                  if (res.data.code === "SUCCESS") {
                    alert("刪除成功!");
                    history.push("/login");
                    localStorage.removeItem("token");
                    setAuthToken("");
                    setToken("");
                    alert("請重新登入");
                  } else {
                    alert("刪除失敗，權限不足!");
                  }
                })
                .catch((e) => {
                  alert("error" + e);
                });
            }}
          >
            刪除
          </button>
        </StyledEditInfo>
      </StyledContainer>
    </div>
  );
};

export default UserPage;

const StyledContainer = styled.div`
  width: 50%;
  margin: auto;
  button {
    padding: 5px 20px;
    color: red;
    margin-top: 20px;
    margin-right: 20px;
  }
  span {
    margin-left: 30px;
  }
`;

const StyledEditInfo = styled.div`
  text-align: center;
  margin: 30px;
`;
