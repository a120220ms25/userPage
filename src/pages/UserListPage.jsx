import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import SearchBar from "../components/SearchBar";
import User from "../components/User";

import { getUsers } from "../utils";

const UserListPage = (props) => {
  const [input, setInput] = useState("");
  const [usersListDefault, setUsersListDefault] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   input ? console.log('輸入中') :

  // }, [input]);

  // const userId = useParaz();
  const handelChange = (e) => {
    setInput(e);
  };

  const handleSearchClick = () => {
    for (let i = 0; i < user.length; i++) {
      // console.log(user[i].username);
      if (input === user[i].username) {
        const newUsers = [];
        newUsers.push(user[i]);
        console.log(newUsers);
        setUser(newUsers);
      } else {
      }
    }
  };

  useEffect(() => {
    input
      ? console.log("輸入中")
      : getUsers()
          .then((data) => {
            setUser(data);
          })
          .catch((error) => {
            setError(error);
          });
  }, [input]);

  return (
    <div>
      <Nav />
      <StyledUserSection>
        <div className="container">
          <StyledSearch>
            <SearchBar
              onChange={handelChange}
              onSearchClick={handleSearchClick}
            ></SearchBar>
          </StyledSearch>

          <div className="row">
            {user &&
              user.map((res) => {
                return (
                  <div className="col-sm-4 col-md-3 col-lg-2">
                    <StyledUserDiv>
                      <User
                        key={res.id}
                        username={res.username}
                        picture={res.picture_url}
                        userId={res.id}
                      ></User>
                    </StyledUserDiv>
                  </div>
                );
              })}
          </div>
        </div>
      </StyledUserSection>
    </div>
  );
};

export default UserListPage;

const StyledUserSection = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const StyledSearch = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const StyledUserDiv = styled.div`
  :hover {
    background-color: #f3cd05;
  }
`;
