export const login = async (username, password) => {
  try {
    const response = await fetch("http://localhost:5000/auth/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateTeamById = async (id, updatedData, token) => {
  console.log(updatedData);
  try {
    const response = await fetch(`http://localhost:5000/teams/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getPlayersListData = async () => {
  try {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTeamsListData = async () => {
  try {
    const response = await fetch("http://localhost:5000/teams");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAnnouncements = async () => {
  try {
    const response = await fetch("http://localhost:5000/announcements");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTeamById = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/teams/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const checkUserLoggedIn = () => {
  const user = localStorage.getItem("TeamFinder");

  const userData = JSON.parse(user);

  return userData;
};
