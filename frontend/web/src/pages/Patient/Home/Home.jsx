import React from "react";
import "./Home.css";
import Logo from "src/assets/logo.svg";

export default function Home() {
    return (
        <div className="patient__container">
            <div className="Patient__menu">
                <h1> Title</h1>
                <h2> which hospital some text</h2>
            </div>

            <div className="patient__randq__container">
                <div className="patient__request__container">
                    <h1>Request</h1>
                    <button>
                        <img
                            className="header__img"
                            src={Logo}
                            alt=""
                            width="80px"
                            height="80px"
                        />
                        <h1>tell us you request</h1>
                        <h3>some text </h3>
                    </button>
                </div>

                <div className="patient__question__container">
                    <h1>Question</h1>
                    <button>
                        <img
                            className="header__img"
                            src={Logo}
                            alt=""
                            width="80px"
                            height="80px"
                        />
                        <h1>tell us you question</h1>
                        <h3>some text </h3>
                    </button>
                </div>
            </div>

        </div>
    );
}
