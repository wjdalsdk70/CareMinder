import React, { useState, useEffect } from "react";
import {
  BsQuestionCircleFill,
  BsArrowDownRightCircleFill,
} from "react-icons/bs";
import moment from "moment";

export default function PatientHistoryRequest({ request, chats }) {
  const [isOpen, setIsOpen] = useState(false);

  const getStateText = (state) => {
    switch (state) {
      case 0:
        return "Waiting";
      case 1:
        return "Processing";
      case 2:
        return "Finished";
      default:
        return "Unknown State Text";
    }
  };

  const timeAgo = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  return (
    <div
      key={request.id}
      className={`request-item ${getStateText(request.state)}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={`top-container ${getStateText(request.state)}`}>
        <div className="icon-container">
          {request.is_question ? (
            <BsQuestionCircleFill size={50} className="icon" />
          ) : (
            <BsArrowDownRightCircleFill size={50} className="icon" />
          )}
        </div>
        <div className="content-container">
          <div className="info-container">
            <h2>{getStateText(request.state)}</h2>
            <p className="time">{timeAgo(request.time)}</p>
          </div>
          <div className="text-container">
            <p>{request.text}</p>
          </div>
        </div>
      </div>
      <div
        className={`chat-container ${getStateText(request.state)} ${
          isOpen ? "open" : "closed"
        }`}
      >
        {chats &&
          chats
            .find((chat) => chat.requestId === request.id)
            .chats.map((chat) => {
              return (
                <div
                  key={request.id + "-" + chat.id}
                  className={`chat-item patient-${chat.from_patient}`}
                >
                  <p>{chat.text}</p>
                  <p className="chat-time">{timeAgo(chat.time)}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
}
