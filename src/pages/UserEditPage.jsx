import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import User from "../components/User";
import AuthContext from "../contexts/AuthContext";
import { getUser, getUsers, getUserUrl, getUpdateUser } from "../utils";

const UserEditPage = () => {
  const [user, setUser] = useState();
  const { userId } = useParams();
  const [error, setError] = useState();
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(null);
  const { authToken, setAuthToken } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    getUser(userId)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, [userId]);

  const handleSaveClick = () => {
    getUpdateUser(user, userId, authToken)
      .then((res) => {
        if (res.data.code !== "SUCCESS") {
          alert("需登入後才能編輯，編輯失敗，你無權編輯，請取消。");
        } else {
          setEdit(true);
          alert("儲存成功!" + res.data.message);
          history.push("/users");
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];

    objectURL = URL.createObjectURL(file);
    console.log(objectURL); //blob

    setUser({
      ...user,
      picture_url: objectURL
    });
  };

  return (
    <div>
      <Nav />
      <StyledContainer>
        <User picture={user ? user.picture_url : "loading..."}></User>
        <input
          type="file"
          accept="image/*"
          className="mb-2"
          onChange={handlePictureChange}
        />
        <h5>使用者名稱: {user ? user.username : "loading..."}</h5>
        <textarea
          onChange={(e) => {
            setEditContent(e.target.value);
            setUser({
              ...user,
              description: e.target.value
            });
          }}
          disabled={!edit}
          name="mytext"
          rows="6"
          cols="50"
          required
          placeholder={user && user.description}
        ></textarea>

        <p></p>
        <Link to={`/edit/${userId}`}>
          <button
            onClick={() => {
              setEdit(true);
            }}
            style={{ backgroundColor: "#a7414a", color: "white" }}
          >
            編輯
          </button>
        </Link>

        <button
          onClick={handleSaveClick}
          style={{ backgroundColor: "#6a8282", color: "white" }}
        >
          儲存
        </button>
      </StyledContainer>
    </div>
  );
};

export default UserEditPage;

const StyledContainer = styled.div`
  width: 50%;
  margin: auto;
  .imgBtn {
    margin: 20px auto;
  }

  button {
    padding: 5px 20px;
    margin-right: 20px;
  }
  input {
  }
`;
