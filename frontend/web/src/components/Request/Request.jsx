import React, { useState, useEffect, useRef } from "react";
import {
  BsQuestionCircleFill,
  BsArrowDownRightCircleFill,
  BsSend,
} from "react-icons/bs";
import moment from "moment";
import {
  postChatMessage,
  getChatMessages,
  getArea,
  getTablet,
} from "src/lib/api";

import "./Request.css";
import { useRedirectToHome } from "src/hooks/useSession";

export default function Request({ request, session, from_patient }) {
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(isOpen);
  const [messageText, setMessageText] = useState("");
  const [chat, setChat] = useState([]);
  const [area, setArea] = useState("Area");

  const [newMessageCount, setNewMessageCount] = useState(0);
  let prevCount = 0;

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const fetchMessagesInterval = setInterval(() => {
      fetchChatMessages();
    }, 5000);
    return () => clearInterval(fetchMessagesInterval);
  }, []);

  useEffect(() => {
    fetchArea();
  }, []);

  async function fetchArea() {
    if (!request.tablet_id) return;
    try {
      const resp = await getTablet(session, request.tablet_id);
      const area = await getArea(session, resp.area_id);
      setArea(area.name);
    } catch (error) {
      console.error("Error fetching area:");
    }
  }

  async function fetchChatMessages() {
    if (!request.id) return;
    try {
      const resp = await getChatMessages(session, request.id);

      if (prevCount - resp.length !== 0 && !isOpenRef.current) {
        setNewMessageCount((newMessage) => newMessage + 1);
        prevCount = resp.length;
      }

      setChat(resp);
    } catch (error) {
      console.error("Error fetching chat messages");
    }
  }

  async function newMessage() {
    try {
      const resp = await postChatMessage(session, request.id, {
        text: messageText,
        from_patient: from_patient,
      });
      await fetchChatMessages();
      setMessageText("");
    } catch (error) {
      console.error("Error creating chat messages");
    }
  }

  const handleClick = () => {
    setNewMessageCount(0);
    setIsOpen(!isOpen);
  };

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
    >
      <div
        className={`top-container ${getStateText(request.state)}`}
        onClick={handleClick}
      >
        {newMessageCount > 0 && (
          <span className="request-item__notification">{newMessageCount}</span>
        )}
        <div className="icon-container">
          {request.is_question ? (
            <BsQuestionCircleFill size={50} className="icon" />
          ) : (
            <BsArrowDownRightCircleFill size={50} className="icon" />
          )}
        </div>
        <div className="content-container">
          <div className="info-container">
            <h2>{from_patient ? getStateText(request.state) : area}</h2>
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
        <div className="chat-container__messages">
          {chat &&
            chat.map((chatMessage) => {
              return (
                <div
                  key={request.id + "-" + chatMessage.id}
                  className={`chat-item patient-${
                    from_patient
                      ? chatMessage.from_patient
                      : !chatMessage.from_patient
                  }`}
                >
                  <p>{chatMessage.text}</p>
                  <p className="chat-time">{timeAgo(chatMessage.time)}</p>
                </div>
              );
            })}
        </div>
        <div className="chat-container__input">
          <input
            type="text"
            placeholder="Type a message..."
            onChange={(e) => setMessageText(e.target.value)}
            value={messageText}
          />
          <button onClick={newMessage}>
            <BsSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
