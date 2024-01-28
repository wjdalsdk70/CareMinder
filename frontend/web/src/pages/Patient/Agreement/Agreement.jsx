import React, {useState} from "react";
import Logo from "../../../assets/logo.svg";
import data from "../../../data.json"

import "./Agreement.css";

export default function Agreement() {
    const patient = data.patient
    const [agreed, setAgreed] = useState(false);

    const handleCheckboxChange = (event) => {
        setAgreed(event.target.checked);
    };

    return (
        <div className="agreement">
            <img className="agreement__logo" src={Logo} alt=""/>
            <div className="container">
                <h1>{patient.agreementConsentHeader}</h1>
                <h2>{patient.consentToCollectionHeader}</h2>
                <p>{patient.consentToCollectionText}</p>

                <h2>{patient.consentResponsibilityHeader}</h2>
                <p>{patient.consentResponsibilityText}</p>

                <div className="agreement-checkbox">
                    <label>
                        {patient.agreeTermsAndConditions}
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={handleCheckboxChange}

                        />
                    </label>
                </div>
                <button>
                    <h3>{patient.agreementContinueButton}</h3>
                </button>
            </div>
        </div>
    );
}
