import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
