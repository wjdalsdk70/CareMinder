import React from "react";
import "./Home.css";
import Logo from "src/assets/logo.svg";
import data from "src/data.json"

export default function Home() {
    const patient = data.patient

    return (
        <div className="patient__home">
            <div className="container">
                <div className="menu">
                    <h1>{patient.title}</h1>
                    <h2>{patient.subtitle} </h2>
                </div>

                <div className="rq-container">
                    <div className="question-container">
                        <h1>{patient.questionTitle}</h1>
                        <button>
                            <img
                                className="header__img"
                                src={Logo}
                                alt=""
                                width="80px"
                                height="80px"
                            />
                            <h1>{patient.questionSubtitle}</h1>
                            <h3>{patient.confirmation}</h3>
                        </button>
                    </div>

                    <div className="request-container">
                        <h1>{patient.requestTitle}</h1>
                        <button>
                            <img
                                className="header__img"
                                src={Logo}
                                alt=""
                                width="80px"
                                height="80px"
                            />
                            <h1>{patient.requestSubtitle}</h1>
                            <h3>{patient.confirmation}</h3>
                        </button>
                    </div>
                </div>

            </div>
        </div>

    );
}
