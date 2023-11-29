import React from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { MdOutlineDownloading } from "react-icons/md";

import "./Nurse.css";

export default function Nurse() {
  return (
    <div className="nurse">
      <div className="nurse__container">
        <div className="nurse__waiting">
          <h1>
            <BiLoaderCircle />
            대기 중인 환자 요청
          </h1>
        </div>
        <div className="nurse__line" />
        <div className="nurse__processing">
          <h1>
            <MdOutlineDownloading />
            내가 진행 중인 요청사항
          </h1>
        </div>
      </div>
    </div>
  );
}
