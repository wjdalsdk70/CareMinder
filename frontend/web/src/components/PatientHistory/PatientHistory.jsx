import React, { useState } from "react";

import "./PatientHistory.css";
import { FaBars } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function PatientHistory() {
  const [isOpen, setIsOpen] = useState(false);

  function handleButtonClick() {
    console.log(!isOpen);
    setIsOpen(!isOpen);
  }

  return (
    <div className={`patient-history ${isOpen && "active"}`}>
      <div onClick={handleButtonClick} className="patient-history__button">
        <MdKeyboardArrowLeft
          className={`patient-history__button__icon ${isOpen && "active"}`}
          size="8rem"
        />
      </div>
      <div className="patient-history__title">
        <FaBars size="2rem" className="patient-history__title__icon" />
        <h1>Request Details</h1>
      </div>
      <div className="patient-history__requests">{/* fetch requests */}</div>
    </div>
  );
}
