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
import {useRedirectToLogin} from "../../../hooks/useSession";
import data from "../../../data.json"

export default function RecordingResult({session}) {
  const patient = data.patient
  useRedirectToLogin(session, "/patient/login");
  //   const loc = useLocation();
  const transcript = localStorage.getItem("recordingResult");
  const isQuestion = localStorage.getItem("isQuestion")
  const [tablet, setTablet] = useLocalStorage("tablet", {});
  const navigate = useNavigate();
  const [text, setText] = useState(transcript)

  const handleRecordAgainClick = () => {
    handlePostRequest().then(r => navigate("/patient/recording"));

  };

  const handleCancelClick = () => {
    navigate("/patient/home");
  };

  const handleFinishClick = () => {
    handlePostRequest().then(r => navigate("/patient/home"));
  };

  async function handlePostRequest(){
    try {
      if (isQuestion === "true"){
        await postRequest(session ,text, true, 0, tablet.id, 1);
      }else{
        await postRequest(session, text, false, 0, tablet.id, 1);
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
            <h1>{patient.patientFinishedRecordingHeader}</h1>
          </div>

          <h2>
            {patient.patientFinishedRecordingRecordAgainBeforeRedRecordAgain}{" "}
            <span className="again">{patient.patientFinishedRecordingRecordAgainRedRecordAgainButton}</span> {patient.patientFinishedRecordingRecordAgainAfterRedRecordAgain}
          </h2>

          <div className="textArea">
            <div className="textArea-text">
              <GiClick size={50} />
              <h2>{patient.patientFinishedRecordingClickToEditText}</h2>
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
              {patient.patientFinishedRecordingCancelButton}
            </button>
            <button
              className="record-button"
              color="var(--request)"
              onClick={handleRecordAgainClick}
            >
              {patient.patientFinishedRecordingRecordAgainButton}
            </button>
            <button className="record-button" onClick={handleFinishClick}>{patient.patientFinishedRecordingFinishButton}</button>
          </div>
        </div>
      </div>
      <PatientFooter session={session}/>
    </div>
  );
}
