import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./App.css";
import { UserContextProvider } from "./contexts/UserContext";

import Homepage from "./pages/Homepage/Homepage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage"
import PlayersListPage from "./pages/PlayersListPage/PlayersListPage";

const App = () => {
  const location = useLocation();

  return (
    <UserContextProvider>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="slide" timeout={300}>
          <Routes location={location}>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/playerslist" element={<PlayersListPage />} />
            <Route path="/profil" element={<UserProfilePage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </UserContextProvider>
  );
};

export default App;
