import React, {useState} from "react";
import Logo from "../../../assets/logo.svg";

import "./Agreement.css";

export default function Agreement() {

    const [agreed, setAgreed] = useState(false);

    const handleCheckboxChange = (event) => {
        setAgreed(event.target.checked);
    };

    return (
        <div className="agreement">
            <img className="agreement__logo" src={Logo} alt=""/>
            <div className="container">
                <h1>Agreement of the terms and conditions</h1>
                <h2>[Consent to collect personal information]</h2>
                <p>To use this service, the information subject's separate consent to collect information is required.
                    The type of information you collect is limited to anonymized requests and feedback data. If you do
                    not agree to collect information, your use of the service will be restricted.</p>

                <h2>[Consent to responsibility]</h2>
                <p>This service is designed to enhance the convenience of patients' hospital use and is not applicable
                    to medical devices and medical aids. We encourage you to avoid using this service for medical
                    practice purposes, such as conveying your condition and symptoms and treating diseases, and we are
                    not responsible for any negligence caused by this.</p>

                <div className="agreement-checkbox">
                    <label>
                        Agree to terms and conditions:
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={handleCheckboxChange}

                        />
                    </label>
                </div>
                <button>
                    <h3>Continue</h3>
                </button>
            </div>
        </div>
    );
}
