import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getRequestsFiltered, getChatMessages } from "../../lib/api";
import {
  BsQuestionCircleFill,
  BsArrowDownRightCircleFill,
} from "react-icons/bs";
import moment from "moment";
import "./PatientHistory.css";
import PatientHistoryRequest from "../PatientHistoryRequest/PatientHistoryRequest";
import useLocalStorage from "src/hooks/useLocalStorage";

export default function PatientHistory() {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tablet, setTablet] = useLocalStorage("tablet", {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsData = await getRequestsFiltered(tablet.id);
        console.log("Requests Data:", requestsData);
        setRequests(requestsData);

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
            <PatientHistoryRequest key={request.id} request={request} />
          ))
        )}
      </div>
    </div>
  );
}
