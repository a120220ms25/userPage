import React from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./Nav";
import { Link, useParams } from "react-router-dom";
import userImg from "../images/user.png";
const User = ({ username, picture, userId, description }) => {
  return (
    <Link to={`/users/${userId}`}>
      <StyledUserItem>
        <img src={picture ? picture : userImg} alt="" />
        <h5>{username}</h5>
        {description}
      </StyledUserItem>
    </Link>
  );
};

export default User;

const StyledUserItem = styled.div`
  margin: 30px auto;
  border: 1px solid #36688d;
  text-align: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    padding: 10px;
  }
  h5 {
    text-align: center;
    color: #36688d;
  }
`;
