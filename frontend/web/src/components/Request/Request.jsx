import React, { useState, useEffect } from "react";
import {
  BsQuestionCircleFill,
  BsArrowDownRightCircleFill,
  BsSend,
} from "react-icons/bs";
import moment from "moment";
import { postChatMessage, getChatMessages, getRequests } from "src/lib/api";

import "./Request.css";

export default function Request({ request, session, from_patient }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [chat, setChat] = useState([]);
  const [newMessagesCountsMap, setNewMessagesCountsMap] = useState(new Map());

  const [newMessageCount, setNewMessageCount] = useState(0)

  useEffect(() => {
    fetchChatMessages();
    const fetchMessagesInterval = setInterval(() => {
      fetchChatMessages().then((response) => {});
    }, 1000);

    return () => clearInterval(fetchMessagesInterval);
  }, []);

  async function fetchChatMessages() {
    if (!request.id) return;
    try {
      const resp = await getChatMessages(session, request.id).then();
      setChat(resp);

      const previousCount = newMessagesCountsMap.get(request.id) || 0;

      const messagesCount = resp.length - previousCount;

      if (messagesCount > 0) {
        setNewMessagesCountsMap((prevMap) => new Map(prevMap.set(request.id, resp.length)));
        setNewMessageCount(newMessageCount => newMessageCount + 1)
      }
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

  const handleNotificationClick = () => {
    setNewMessageCount(0)
    setIsOpen(true); // Optionally, open the chat container when notification is clicked
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
        {/*{newMessagesCountsMap.get(request.id) > 0 && (*/}
        {/*    <span onClick={handleNotificationClick}>{newMessageCount}</span>*/}
        {/*)}*/}
        <div
            className={`top-container ${getStateText(request.state)}`}
            onClick={() => setIsOpen(!isOpen)}
        >
          <div className="icon-container">
            {request.is_question ? (
                <BsQuestionCircleFill size={50} className="icon"/>
            ) : (
                <BsArrowDownRightCircleFill size={50} className="icon"/>
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
