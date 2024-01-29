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

    const handleOutsideTouch = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    fetchStaff(); //oli comment

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideTouch);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideTouch);
    };
  }, [isOpen, onClose]);

  async function fetchStaff() {
    try {
      const resp = await getStaff(session, session.user.id);
      setStaff(resp);
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogOut() {
    console.log("logout");
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
  </p>
  <div className="sidebar-link-signout" onClick={handleLogOut}>
    <GoSignOut />
  </div>
</div>

      
          <Link className="sidebar-link" to="/nurse/home/" href="#">
            <FaHouse color="white"/>
            <p>
            Patient Request
            </p>
          
          </Link>
   

       
          <Link className="sidebar-link" to="/nurse/home/">
            <IoIosCheckmarkCircle color="white" />
            <p> Completed Patient Requests</p>
           
          </Link>
     


          <Link className="sidebar-link" to="/nurse/home/">
            <MdDownloading color="white" />
            <p> Set progress by patient</p>
           
          </Link>
    

      
          <Link className="sidebar-link" to="/nurse/admin/userlist">
            <FaUserEdit color="white" />
            <p>
            Query user Information
            </p>
          </Link>
   

   
          <Link className="sidebar-link" to="/nurse/admin/settings">
            <IoMdSettings color="white" />
            <p>
            Configuration Settings
            </p>
          </Link>
      
      </div>
    </div>
  );
}
