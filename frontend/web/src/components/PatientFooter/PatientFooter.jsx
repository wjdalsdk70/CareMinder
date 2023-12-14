import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import "./PatientFooter.css";
import data from "src/data.json";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <FaCircleInfo size={48} className="info" />
        <h3>
          {data.patient.notification}
        </h3>
      </div>
    </footer>
  );
}
