import React from "react";
import data from "src/data.json";
import { FaArrowLeft } from "react-icons/fa6";

import { PiWaveformBold } from "react-icons/pi";
import PatientFooter from "src/components/PatientFooter/PatientFooter";
import Logo from "src/assets/logo.svg";
import "./Recording.css";
export default function Recording() {
    return (
        <div className="recording">
            <div className="header">
                <div className="left">
                    <img
                        className="patient-img"
                        src={Logo}
                    />

                    <div className="home">
                        <a href="/patient/home"><FaArrowLeft  size={50} color="black"/></a>

                    </div>

                </div>


            </div>
            <div className="body">
                <PiWaveformBold size={200}/>
            </div>
            <h2 className="record-text">Recording your voice</h2>
            <div className="record-buttons">
                <button className="record-button">
                    Cancel
                </button>
                <a href="/patient/recordingresults">
                    <button className="record-button">
                        Finish
                    </button>
                </a>
            </div>
            <PatientFooter/>
        </div>

    )
}