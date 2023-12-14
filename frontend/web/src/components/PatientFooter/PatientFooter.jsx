import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import "./PatientFooter.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <FaCircleInfo size={48} className="info" />
        <h3>
          Currently, there is a delay due to the influx of emergency patients.
          We fully recognize the urgency of the patients, but due to the nature
          of the emergency room, we are treating them according to their
          priorities, so we ask for their understanding.{" "}
        </h3>
      </div>
    </footer>
  );
}
