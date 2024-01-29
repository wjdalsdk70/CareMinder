import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import NurseSidebar from "../NurseSidebar/NurseSidebar";
import Logo from "src/assets/logo.svg";
import { IoIosArrowBack } from "react-icons/io";
import data from "src/data.json";
import "./NurseHeader.css";
import {useNavigate} from "react-router-dom";

export default function NurseHeader({ session }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()

  const openSidebar = (event) => {
    event.stopPropagation();
    console.log("Opening sidebar");
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  function handleBack(){
    navigate(-1)
  }

  return (
    <>
      <header className="nurse-header">
        <div className="header-nurse-container">
          <img className="header-img" src={Logo} alt="" />
          <FaBars
            className="header-bars"
            onClick={(event) => openSidebar(event)}
          />
          <NurseSidebar
            session={session}
            isOpen={isSidebarOpen}
            onClose={closeSidebar}
          />
        </div>
        <div className="go_back" onClick={handleBack}>
          <IoIosArrowBack size="32" />
          <h2>{data.nurse.nurseHeaderBack}</h2>
        </div>
      </header>
    </>
  );
}
