import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "src/assets/logo.svg";

import "./Login.css";
import { login, logout } from "src/lib/api";
import { jwtDecode } from "jwt-decode";
import { readForm } from "src/core/utils";

function validate(data) {
  const errors = {};

  // Validate username
  if (!data.username) {
    errors.username = ["Username is required"];
  }

  // Validate password
  if (!data.password) {
    errors.password = ["Password is required"];
  }

  return errors;
}

export default function Login({ session }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const next = searchParams.get("next") || "/nurse/home";

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState();

  useEffect(() => {
    if (!session.accessToken || !session.ready) return;
    logout(session);
    session.logout();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setStatus(null);
    session.logout();
    const data = readForm(event.target);
    const validationErrors = validate(data);
    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      setStatus("failed");
      return;
    }

    try {
      const resp = await login(data.username, data.password);
      const { user_id } = jwtDecode(resp.access);
      session.login({
        user: { user_id },
        accessToken: resp.access,
        refreshToken: resp.refresh,
      });
      setStatus("success");
      navigate(next);
    } catch (error) {
      if (error.status === 429) {
        setStatus("tooManyAttempts");
      } else {
        setStatus("failed");
      }
    }
    setIsLoading(false);
  };

  function statusMessage() {
    let statusMessage;
    switch (status) {
      case "success":
        statusMessage = <div className="success">Login Successful</div>;
        break;
      case "failed":
        statusMessage = <div className="error">Login Failed</div>;
        break;
      case "tooManyAttempts":
        statusMessage = <div className="error">Too Many Attempts</div>;
        break;
      default:
        statusMessage = null;
    }
    return statusMessage;
  }

  return (
    <div className="login">
      <img className="login__logo" src={Logo} alt="" />
      <div className="login__circle" />
      <div className="login__container">
        <div>
          <h1 className="login__title">CARE MINDER</h1>
          <h2 className="login__subtitle">WELCOME to CareMinder</h2>
          <form className="login__form" onSubmit={handleSubmit}>
            {statusMessage()}
            <fieldset>
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="password">Password</label>
              <input
                name="password"
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
