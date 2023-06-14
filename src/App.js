import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./App.css";

import Homepage from "./pages/Homepage/Homepage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import PlayersListPage from "./pages/PlayersListPage/PlayersListPage";

const App = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="slide" timeout={300}>
        <Routes location={location}>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/playerslist" element={<PlayersListPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
