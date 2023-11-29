import React from "react";

import "./Request.css";

import {
  BsFillQuestionCircleFill,
  BsArrowDownRightCircleFill,
} from "react-icons/bs";

export default function Request({ isQuestion, text, date }) {
  const Icon = isQuestion
    ? BsFillQuestionCircleFill
    : BsArrowDownRightCircleFill;
  return (
    <div className="request">
      <Icon className="request__icon" />
      <div className="request__info">
        <div className="top">
          <h3>외상-1 (케어어)</h3>
          <span>{}</span>
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
}
