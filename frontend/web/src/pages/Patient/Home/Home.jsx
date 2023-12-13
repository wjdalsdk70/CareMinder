import React from "react";
import "./Home.css";
import Logo from "src/assets/logo.svg";
import data from "src/data.json"
import PatientHeader from "../../../components/PatientHeader/PatientHeader";
import Footer from "../../../components/Footer/Footer";

import { BsQuestionCircleFill } from "react-icons/bs";
import { TbMicrophone } from "react-icons/tb";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function Home() {
    const patient = data.patient

    return (
        <div className="patient__home">
            <PatientHeader/>
            <div className="container">
                <div className="menu">
                    <h1>{patient.title}</h1>
                    <h2>{patient.subtitle} </h2>
                </div>

                <div className="rq-container">
                    <div className="question-container">
                        <h1>{patient.questionTitle}</h1>
                        <button>
                            <BsQuestionCircleFill size={260} className="icon"/>
                            <h1>{patient.questionSubtitle}</h1>
                            <h3>{patient.confirmation}</h3>
                        </button>
                    </div>

                    <div className="separator"></div>

                    <div className="request-container">
                        <h1>{patient.requestTitle}</h1>
                        <button>
                            <TbMicrophone size={260} className="icon"/>
                            <h1>{patient.requestSubtitle}</h1>
                            <h3>{patient.confirmation}</h3>
                        </button>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>

    );
}
