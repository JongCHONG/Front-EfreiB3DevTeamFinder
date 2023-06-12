import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";

const App = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route exact path="/" element={<Homepage />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;
