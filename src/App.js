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
import TeamProfilePage from "./pages/TeamProfilePage/TeamProfilePage";
import TeamsListPage from "./pages/TeamsListPage/TeamsListPage";
import CreateTeamPage from "./pages/CreateTeamPage/CreateTeamPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

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
            <Route path="/profil/:id" element={<UserProfilePage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/team-profile/:id" element={<TeamProfilePage />} />
            <Route path="/teamslist" element={<TeamsListPage />} />
            <Route path="/create/team" element={<CreateTeamPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </UserContextProvider>
  );
};

export default App;
