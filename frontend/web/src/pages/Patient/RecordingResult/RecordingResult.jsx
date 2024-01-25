import React, {useState} from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { useLocation } from "react-router-dom";
import PatientFooter from "src/components/PatientFooter/PatientFooter";
import Logo from "src/assets/logo.svg";
import "./RecordingResult.css";
import {getTablet, postRequest} from "../../../lib/api";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function RecordingResult() {
  //   const loc = useLocation();
  const transcript = localStorage.getItem("recordingResult");
  const isQuestion = localStorage.getItem("isQuestion")
  const [tablet, setTablet] = useLocalStorage("tablet", {});
  const navigate = useNavigate();
  const [text, setText] = useState(transcript)

  const handleRecordAgainClick = () => {
    handelPostRequest().then(r => navigate("/patient/recording"));

  };

  const handleCancelClick = () => {
    navigate("/patient/home");
  };

  const handleFinishClick = () => {
    handelPostRequest().then(r => navigate("/patient/home"));
  };

  async function handelPostRequest(){
    try {
      if (isQuestion === "true"){
        await postRequest(text, true, 1, tablet.id, 1);
      }else{
        await postRequest(text, false, 1, tablet.id, 1);
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="RecordingResult">
      <div className="header">
        <div className="left">
          <img className="patient-img" src={Logo} />
          <div className="home">
            <a href="/patient/home">
              <FaArrowLeft size={50} color="black" />
            </a>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="textRecording">
          <div className="check">
            <FaRegCheckCircle size={50} color="green" />
            <h1>Recording finished. Check the results</h1>
          </div>

          <h2>
            If you want to edit, press{" "}
            <span className="again">Record Again</span> for voice recording or
            edit directly with keyboard
          </h2>

          <div className="textArea">
            <div className="textArea-text">
              <GiClick size={50} />
              <h2>Click the box below for editing with keyboard directly</h2>
            </div>
            <div className="textArea-container" >
              <textarea
                  defaultValue={transcript}
                  onChange={e => {
                    setText(e.target.value);
                  }}
              />
            </div>
          </div>
          <div className="buttons">
            <button className="record-button" onClick={handleCancelClick}>
            Cancel
            </button>
            <button
              className="record-button"
              color="var(--request)"
              onClick={handleRecordAgainClick}
            >
              Record Again
            </button>
            <button className="record-button" onClick={handleFinishClick}>Finish</button>
          </div>
        </div>
      </div>
      <PatientFooter />
    </div>
  );
}
