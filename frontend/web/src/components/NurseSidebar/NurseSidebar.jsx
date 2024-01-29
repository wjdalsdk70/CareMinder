import React from "react";

import { useState, useEffect, useRef } from "react";
import { FaBars, FaUserEdit } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { BiSolidUserCircle } from "react-icons/bi";
import { GoSignOut } from "react-icons/go";
import longLogo from "src/assets/longLogo.svg";
import { IoClose } from "react-icons/io5";
import "./NurseSidebar.css";
import {
  IoIosArrowBack,
  IoIosCheckmarkCircle,
  IoMdSettings,
} from "react-icons/io";
import { MdDownloading } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getStaff } from "../../lib/api";

export default function NurseSidebar({ isOpen, onClose }) {
  const sidebarRef = useRef(null);
  const navigate = useNavigate;
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <IoClose onClick={onClose} className="sidebar-close">
        Close &times;
      </IoClose>

      <div className="sidebar-links">
        <img className="sidebar-logo" src={longLogo} alt="" />

        <div className="sidebar-link-user">
          <a href="#">
            <BiSolidUserCircle />
            Username
            <a href="#">
              <GoSignOut className="sidebar-link-signout" />
            </a>
          </a>
        </div>

        <div className="sidebar-link">
          <a href="#">
            <FaHouse />
            Patient Request
          </a>
        </div>

        <div className="sidebar-link">
          <a href="#">
            <IoIosCheckmarkCircle />
            Completed Patient Requests
          </a>
        </div>

        <div className="sidebar-link">
          <a href="#">
            <MdDownloading />
            Set progress by patient
          </a>
        </div>

        <div className="sidebar-link">
          <a href="#">
            <FaUserEdit />
            Query user Information
          </a>
        </div>

        <div className="sidebar-link">
          <a href="#">
            <IoMdSettings />
            Configuration Settings
          </a>
        </div>
      </div>
    </div>
  );
}
