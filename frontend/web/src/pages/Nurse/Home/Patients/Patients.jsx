import React, { useState, useEffect } from "react";
import { getRequests as getRequests } from "src/lib/api";
import NurseHeader from "src/components/NurseHeader/NurseHeader";

import "./Patients.css";
import "../Home.css";
import { useRedirectToLogin } from "src/hooks/useSession";

const Patients = ({ session }) => {
  // useRedirectToLogin(session);
  const [requests, setRequests] = useState([]);

  async function load() {
    try {
      const resp = await getRequests();
      setRequests(resp);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
    const timeoutId = setTimeout(load, 1000 * 5);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleCheckboxChange = (event) => {
    setSelectedOptions({
      ...selectedOptions,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <NurseHeader />
      <main>
        <div className="nurse__home-requests nurse__home">
          <div className="container">
            {/* add here */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Patients;
