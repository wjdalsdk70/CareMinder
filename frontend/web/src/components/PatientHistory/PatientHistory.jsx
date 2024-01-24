import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getRequests, getChats } from "../../lib/api";
import {
  BsQuestionCircleFill,
  BsArrowDownRightCircleFill,
} from "react-icons/bs";
import moment from "moment";
import "./PatientHistory.css";
import PatientHistoryRequest from "../PatientHistoryRequest/PatientHistoryRequest";

export default function PatientHistory() {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsData = await getRequests();
        console.log("Requests Data:", requestsData);
        setRequests(requestsData);

        // Fetch chats for each request
        const chatPromises = requestsData.map(async (request) => {
          try {
            const chatData = await getChats(request.id);
            console.log(`Chats for Request ${request.id}:`, chatData);
            return {
              requestId: request.id,
              chats: chatData,
            };
          } catch (error) {
            console.error(
              `Error fetching chats for request ${request.id}:`,
              error
            );
            return null;
          }
        });

        const chatResults = await Promise.all(chatPromises);
        console.log("Chat Results:", chatResults);

        setChats(chatResults.filter((result) => result !== null));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  function handleButtonClick() {
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
      <div className="patient-history__requests">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          requests.map((request) => (
            <PatientHistoryRequest
              key={request.id}
              request={request}
              chats={chats}
            />
          ))
        )}
      </div>
    </div>
  );
}
