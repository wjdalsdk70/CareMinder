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
import { Link } from "react-router-dom";

export default function NurseSidebar({ session, isOpen, onClose }) {
  const sidebarRef = useRef(null);
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

    fetchStaff();

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  async function fetchStaff() {
    const resp = await getStaff(session, session.user.id);
    setStaff(resp);
  }

  function handleLogOut() {
    session.logout();
  }

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <IoClose onClick={onClose} className="sidebar-close">
        Close &times;
      </IoClose>

      <div className="sidebar-links">
        <img className="sidebar-logo" src={longLogo} alt="" />

        <div className="sidebar-link-user">
          <p>
            <BiSolidUserCircle />
            {/* {staff.username} */}
            ahsdfad sfh
            <div onClick={handleLogOut}>
              <GoSignOut className="sidebar-link-signout" />
            </div>
          </p>
        </div>

        <div className="sidebar-link">
          <Link to="/nurse/home/" href="#">
            <FaHouse />
            Patient Request
          </Link>
        </div>

        <div className="sidebar-link">
          <Link to="/nurse/home/">
            <IoIosCheckmarkCircle />
            Completed Patient Requests
          </Link>
        </div>

        <div className="sidebar-link">
          <Link to="/nurse/home/">
            <MdDownloading />
            Set progress by patient
          </Link>
        </div>

        <div className="sidebar-link">
          <Link to="/nurse/admin/userlist">
            <FaUserEdit />
            Query user Information
          </Link>
        </div>

        <div className="sidebar-link">
          <Link to="/nurse/admin/settings">
            <IoMdSettings />
            Configuration Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
