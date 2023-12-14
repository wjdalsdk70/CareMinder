import React from "react";
import Logo from "src/assets/logo.svg";
import data from "src/data.json"

import "./PatientHeader.css";

export default function PatientHeader() {
    const patient = data.patient

    return (
        <header className="header">
            <div className="left">
                <img
                    className="patient-img"
                    src={Logo}
                />
                <h2>{patient.patientHeader}</h2>
            </div>

            <div className="status">
                <h2>{patient.patientHeaderWaiting}</h2>
                <h2>{patient.patientHeaderProcess}</h2>
                <h2>{patient.patientHeaderDone}</h2>
            </div>

        </header>
    );
}
