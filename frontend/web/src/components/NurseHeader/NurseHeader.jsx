import React from "react";
import { FaBars } from "react-icons/fa";
import Logo from "src/assets/logo.svg";
import { MdKeyboardArrowLeft } from "react-icons/md";
import data from "src/data.json";

import "./NurseHeader.css";
import {IoIosArrowBack} from "react-icons/io";

export default function NurseHeader() {
    return (
        <header className="nurse-header">
            <div className="header-nurse-container">
                <img className="header-img" src={Logo} alt=""/>
                <FaBars className="header-bars"/>
            </div>

            <div className="go_back">
                <IoIosArrowBack size="32"/>
                <h2>{data.nurse.nurseHeaderBack}</h2>
            </div>
        </header>
    );
}