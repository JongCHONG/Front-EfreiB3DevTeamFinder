import React, { createContext, useEffect, useState } from "react";

import { checkUserLoggedIn, getUserById } from "../utils/helpers";

const UserContext = createContext({});

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const connectedUser = checkUserLoggedIn();

  const value = {
    user,
    setUser,
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoData = await getUserById(connectedUser?._id);
      setUser(userInfoData);
    };
    fetchUserInfo();
  }, [connectedUser?._id]);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
