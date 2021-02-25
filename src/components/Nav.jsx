import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../contexts/AuthContext";
import TokenContext from "../contexts/TokenContext";

const Nav = ({ userName }) => {
  const [userState, setUserState] = useState("登入");
  const { authToken, setAuthToken } = useContext(AuthContext);
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    const firstToken = localStorage.getItem("token");
    setAuthToken(firstToken);
  }, [authToken]);

  useEffect(() => {
    authToken ? setUserState("登出") : setUserState("登入");
  }, [authToken]);

  useEffect(() => {
    authToken ? setToken(jwtDecode(authToken).username) : setToken("");
  }, [authToken]);

  // useEffect(() => {
  //   localStorage.getItem("token")
  //     ? setToken(jwt(token).username)
  //     : setToken("");
  // }, [token]);

  // useEffect(() => {
  //   localStorage.getItem("token")
  //     ? setToken(jwt(authToken).username)
  //     : setToken("");
  // }, [authToken]);

  return (
    <StyledDiv>
      <Link to="/users">
        <h5>首頁</h5>
      </Link>
      <StyledUserStateDiv>
        user : {token}
        <Link to="/login">
          <button
            onClick={() => {
              authToken ? localStorage.clear() : console.log("這時沒有token");
            }}
          >
            {userState}
          </button>
        </Link>
      </StyledUserStateDiv>
    </StyledDiv>
  );
};

export default Nav;

const StyledDiv = styled.div`
  background-color: #36688d;
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 20px;
  h5 {
    line-height: 70px;
    color: white;
  }
  button {
    margin-top: 15px;
    font-size: 20px;
    color: #00008b;
    padding: 2px 5px;
    border-radius: 5px;
    background-color: #fff;
  }
`;
const StyledUserStateDiv = styled.div`
  color: white;
`;
