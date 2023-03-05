import React from "react";

const Login = () => {
  return (
    <>
      <div className="login-container">
        <div className="login-modal">
          <label htmlFor="userName">Email</label>
          <input type="text" name="userName" id="userName" placeholder="email" />
          <label htmlFor="password">Password</label>
          <input type="password" name="userName" id="Password" placeholder="Password"/>
        </div>
      </div>
    </>
  );
};

export default Login;
