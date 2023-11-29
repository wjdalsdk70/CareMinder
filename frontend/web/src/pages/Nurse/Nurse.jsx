import React, { useState, useEffect } from "react";
import Filter from "src/components/Filter/Filter";
import { BiLoaderCircle } from "react-icons/bi";
import { MdOutlineDownloading } from "react-icons/md";
import Request from "src/components/Request/Request";
import { get_request } from "src/lib/api";

import "./Nurse.css";

const Nurse = () => {



  const [selectedOptions, setSelectedOptions] = useState({});

  const handleCheckboxChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="nurse">
      <div className="nurse__container">
        <div className="nurse__waiting">
          <h1>
            <BiLoaderCircle />
            대기 중인 환자 요청
          </h1>
          <div className="nurse__filters">
            <Filter
              title="Filter 1"
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
            <Filter
              title="Filter 2"
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
            <Filter
              title="Filter 3"
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
        </div>
        <div className="nurse__line" />
        <div className="nurse__processing">
          <h1>
            <MdOutlineDownloading />
            내가 진행 중인 요청사항
          </h1>
          <div className="nurse__filters">
            <Filter
              title="Filter 1"
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
            <Filter
              title="Filter 2"
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
            <Filter
              title="Filter 3"
              options={[]}
              selectedOptions={selectedOptions}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <div>
            <Request isQuestion={true} text="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nurse;
