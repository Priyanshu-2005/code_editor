import React from "react";

const LoginPage = () => {
  const clientId = "{your_client_id}"; // Replace with your actual client ID
  const redirectUri = "http://localhost:3000/home";

  return (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`}
      >
        Login with GitHub
      </a>
      <a href={""}></a>
    </div>
  );
};

export default LoginPage;
