import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import UserEditPage from "./pages/UserEditPage";
import UserListPage from "./pages/UserListPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import "./styles.css";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import NoMatchPage from "./pages/NoMatchPage";
import AuthContext from "./contexts/AuthContext";
import TokenContext from "./contexts/TokenContext";

// import AuthContextPrivder from "./contexts/AuthContext";

export default function App() {
  const [authToken, setAuthToken] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <AuthContext.Provider value={{ authToken, setAuthToken }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage}>
              <Redirect to="/users"></Redirect>
            </Route>
            <Route exact path="/users" component={UserListPage}></Route>
            <Route path="/users/:userId" component={UserPage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/signup" component={SignupPage}></Route>
            <Route path="/edit/:userId" component={UserEditPage}></Route>
            <Route path="*" component={NoMatchPage}></Route>
          </Switch>
        </BrowserRouter>
      </AuthContext.Provider>
    </TokenContext.Provider>
  );
}
