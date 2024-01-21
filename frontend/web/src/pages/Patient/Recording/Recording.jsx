import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { PiWaveformBold } from "react-icons/pi";
import PatientFooter from "src/components/PatientFooter/PatientFooter";
import Logo from "src/assets/logo.svg";
import "./Recording.css";
import SpeechRecognition ,{ useSpeechRecognition } from 'react-speech-recognition';

import { LiveAudioVisualizer } from 'react-audio-visualize';





export default function Recording() {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const { transcript, resetTranscript} = useSpeechRecognition();
    
   
    useEffect(() => {

        SpeechRecognition.startListening({ continuous: true, language: "ko" });
        console.log("Listening starts");
    
    }, []);

    const handleHomeClick = () => {
        SpeechRecognition.stopListening();
        navigate("/patient/home");
    }

    const handleFinishClick = () => {
      
        console.log("Finish recording");
        SpeechRecognition.stopListening();
        navigate("/patient/recordingresults", { state: { transcript: transcript } });
      
    }

    return (
        <div className="recording">
            <div className="header">
                <div className="left">
                    <img
                        className="patient-img"
                        src={Logo}
                        alt="Patient Logo"
                    />
                    <div className="home">
                        <a href="/patient/home"><FaArrowLeft size={50} color="black" /></a>
                    </div>
                </div>
            </div>
            <div className="body">
                <PiWaveformBold size={200} />
            </div>
            <h2 className="record-text">Recording your voice</h2>
            <div className="record-buttons">
                <button className="record-button" onClick={handleHomeClick}>
                    Cancel
                </button>
                <button className="record-button" onClick={handleFinishClick}>
                    Finish
                </button>
            </div>
            <PatientFooter />
        </div>
    );
}
