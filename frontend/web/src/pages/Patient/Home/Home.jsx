import React from "react";
import "./Home.css";

import data from "src/data.json";
import PatientHeader from "src/components/PatientHeader/PatientHeader";
import PatientFooter from "src/components/PatientFooter/PatientFooter";

import { BsQuestionCircleFill } from "react-icons/bs";
import { TbMicrophone } from "react-icons/tb";
import { MdKeyboardArrowLeft } from "react-icons/md";
import PatientHistory from "src/components/PatientHistory/PatientHistory";

export default function Home() {
  const patient = data.patient;

  return (
    <div className="patient__home">
      <PatientHeader />
      <main>
        <div className="container">
          <div className="menu">
            <h1>{patient.title}</h1>
            <h2>{patient.subtitle} </h2>
          </div>

          <div className="rq-container">
            <div className="question-container">
              <h1 className="title">{patient.questionTitle}</h1>
              <button>
                <BsQuestionCircleFill size={260} className="icon" />
                <h1>{patient.questionSubtitle}</h1>
                <h3>{patient.confirmation}</h3>
              </button>
            </div>

            <div className="separator"></div>

            <div className="request-container">
              <h1 className="title">{patient.requestTitle}</h1>
              <button>
                <TbMicrophone size={260} className="icon" />
                <h1>{patient.requestSubtitle}</h1>
                <h3>{patient.confirmation}</h3>
              </button>
            </div>
          </div>
        </div>
      </main>
      <PatientHistory />
      <PatientFooter />
    </div>
  );
}
