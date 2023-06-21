import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./App.css";
import { UserContextProvider } from "./contexts/UserContext";

import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage"
import PlayersListPage from "./pages/PlayersListPage/PlayersListPage";
import AnnouncementsPage from "./pages/AnnouncementsPage/AnnouncementsPage";

const App = () => {
  const location = useLocation();

  return (
    <UserContextProvider>
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="slide" timeout={300}>
          <Routes location={location}>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/playerslist" element={<PlayersListPage />} />
            <Route path="/profil/users/:id" element={<UserProfilePage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </UserContextProvider>
  );
};

export default App;
