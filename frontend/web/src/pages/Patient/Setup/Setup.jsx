import React from "react";
import Logo from "../../../assets/logo.svg";
import data from "../../../data.json";
import "./Setup.css";

export default function Setup() {
    return (
        <div className="set-up">
            <img className="set-up__logo" src={Logo} alt=""/>
            <div className="container">
                <h1>Hello, I’m CareMinder</h1>
                <p>Please set the name of the tablet.</p>
                <p>This is used to specify tablets by bed area.</p>
                <p>The name can then be modified through the Preferences menu on the nurse's screen.</p>

                <div className="form">
                    <p>Setting a name</p>
                </div>
            </div>
        </div>
    );
}
