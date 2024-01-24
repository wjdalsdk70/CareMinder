import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FaRegCheckCircle } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import {useLocation} from 'react-router-dom';
import PatientFooter from "src/components/PatientFooter/PatientFooter";
import Logo from "src/assets/logo.svg";
import "./RecordingResult.css";

export default function RecordingResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const handleRecordAgainClick = () => {
        navigate("/patient/recording");
    }

    const handleHomeClick = () => {
        navigate("/patient/home")
    }

    return (
        <div className="RecordingResult">
            <div className="header">
                <div className="left">
                    <img
                        className="patient-img"
                        src={Logo}
                    />
                    <div className="home">
                        <a href="/patient/home"><FaArrowLeft size={50} color="black" /></a>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="textRecording">
                    <div className="check" >
                        <FaRegCheckCircle size={50} color="green" />
                        <h1>Recording finished. Check the results</h1>
                    </div>

                    <h2>If you want to edit, press <span className="again">Record Again</span> for voice recording or edit directly with keyboard</h2>

                    <div className="textArea">
                        <div className="textArea-text">
                            <GiClick size={50} />
                            <h2>Click the box below for editing with keyboard directly</h2>
                        </div>
                        <div className="textArea-container">
                            <textarea defaultValue={location.state.transcript}></textarea>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="record-button" onClick={handleHomeClick}>
                            Cancel
                        </button>
                        <button className="record-button" color="var(--request)" onClick={handleRecordAgainClick}>
                            Record Again
                        </button>
                        <button className="record-button">
                            Finish
                        </button>
                    </div>
                </div>
            </div>
            <PatientFooter />
        </div>
    );
}

