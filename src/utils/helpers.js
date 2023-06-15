export const login = async (username, password) => {
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
};
