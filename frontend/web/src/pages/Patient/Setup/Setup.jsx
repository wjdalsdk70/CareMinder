import React, { useEffect } from "react";
import Logo from "../../../assets/logo.svg";
import "./Setup.css";
import useLocalStorage from "src/hooks/useLocalStorage";
import { getTablet } from "src/lib/api";

export default function Setup() {
  const [tablet, setTablet] = useLocalStorage("tablet", {});

  async function fetchTablet(id) {
    try {
      const response = await getTablet(id);
      setTablet(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTablet(1);
  }, []);

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
          <p>Setting a name</p>
        </div>
        <button onClick={() => console.log(tablet)}>test</button> {/* test */}
      </div>
    </div>
  );
}
