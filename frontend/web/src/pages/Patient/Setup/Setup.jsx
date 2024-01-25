import React, { useState, useEffect } from "react";
import Logo from "../../../assets/logo.svg";
import "./Setup.css";
import { getTablet, getTablets } from "../../../lib/api";
import useLocalStorage from "src/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

export default function Setup() {
  const [tablet, setTablet] = useLocalStorage("tablet", {});
  const [tablets, setTablets] = useState([]);
  const [selectedTablet, setSelectedTablet] = useState("");
  const navigate = useNavigate();

  async function handleClick() {
    if (!selectedTablet) return;
    try {
      const response = await getTablet(selectedTablet);
      console.log(response);
      setTablet(response);
      navigate("/patient/home");
    } catch (error) {
      console.error(error);
      // Add additional error handling logic here if needed
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
        <div className="form">
          <select
            onClick={fetchTablets}
            onChange={(e) => setSelectedTablet(e.target.value)}
          >
            <option value="" disabled selected>
              Select a tablet
            </option>
            {tablets.map((tablets) => (
              <option key={tablets.id} value={tablets.id}>
                {tablets.name}
              </option>
            ))}
          </select>

          <button className="submit-button styled-button" onClick={handleClick}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
