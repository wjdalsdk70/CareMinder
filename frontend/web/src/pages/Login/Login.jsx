import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const next = searchParams.get("next") || "/nurse";

  const handleSubmit = async (event) => {
    event.preventDefault();

    // login logic

    if (true) {
      navigate(next);
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login">
      <div className="login__circle" />
      <div className="login__container">
        <div>
          <h1 className="login__title">CARE MINDER</h1>
          <h2 className="login__subtitle">WELCOME to CareMinder</h2>
          <form className="login__form" onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>

            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}
