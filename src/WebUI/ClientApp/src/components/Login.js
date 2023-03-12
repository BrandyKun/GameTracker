import React from "react";

const Login = () => {
  return (
    <>
      <div className="form-container">
        <div className="login-card">
          <img src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg" />
          <h2>Sign Up</h2>
          <h3>Enter your credentials</h3>
          <form className="login-form">
            <div className="username">
              <input
                autocomplete="off"
                spellcheck="false"
                className="control"
                type="email"
                placeholder="Email"
                value="joe@gmail.com"
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <input
              spellcheck="false"
              className="control"
              id="password"
              type="password"
              placeholder="Password"
              onkeyup="handleChange()"
            />
            <div id="bars">
              <div></div>
            </div>
            {/* <div className="strength" id="strength"></div> */}
            <button className="control" type="button">
              JOIN NOW
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
