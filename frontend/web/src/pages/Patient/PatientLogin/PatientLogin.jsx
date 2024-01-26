import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "src/assets/logo.svg";

import "./PatientLogin.css";
import { getTablet, getTablets, login, logout } from "src/lib/api";
import { jwtDecode } from "jwt-decode";
import { readForm } from "src/core/utils";
import useLocalStorage from "src/hooks/useLocalStorage";

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

  // Validate tablet
  if (!data.tablet) {
    errors.tablet = ["Tablet is required"];
  }

  return errors;
}

export default function PatientLogin({ session }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const next = searchParams.get("next") || "/nurse/home";

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState();

  const [tablet, setTablet] = useLocalStorage("tablet", {});
  const [tablets, setTablets] = useState([]);

  async function fetchTablet(id) {
    try {
      const response = await getTablet(id);
      setTablet(response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTablets() {
    try {
      const response = await getTablets();
      setTablets(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTablets();
  }, []);

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
    fetchTablet(data.tablet);
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
    <div className="set-up">
      <img className="set-up__logo" src={Logo} alt="" />
      <div className="container">
        <h1>Hello, I’m CareMinder</h1>
        <p>Please set the name of the tablet.</p>
        <p>This is used to specify tablets by bed area.</p>
        <p>
          The name can then be modified through the Preferences menu on the
          nurse's screen.
        </p>
        <form className="set-up__form" onSubmit={handleSubmit}>
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

          <select name="tablet" id="tablet">
            <option value="" disabled selected>
              Select a tablet
            </option>
            {tablets.map((tablets) => (
              <option key={tablets.id} value={tablets.id}>
                {tablets.name}
              </option>
            ))}
          </select>

          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}
