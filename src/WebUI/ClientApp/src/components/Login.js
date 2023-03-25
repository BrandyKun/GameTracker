import React, { useState } from "react";
import axios from 'axios';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{

      const result = await axios.post(
        'account/login', JSON.stringify({email,password}),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
    }catch(err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="form-container">
        <div className="login-card">
          <img src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg" />
          <h2>Sign Up</h2>
          <h3>Enter your credentials</h3>
          <form method="post" className="login-form" onSubmit={handleSubmit}>
            <div className="username">
              <input
                autocomplete="off"
                spellcheck="false"
                className="control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div id="spinner" className="spinner"></div>
            </div>
            <input
              spellcheck="false"
              className="control"
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e)=> setPassword(e.target.value)}
            />
            <div id="bars">
              <div></div>
            </div>
            {/* <div className="strength" id="strength"></div> */}
            <button className="control" type="submit">
              JOIN NOW
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
