import React, { useState } from "react";
import data from "src/data.json";
import "./AddArea.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { BsPersonFillAdd } from "react-icons/bs";
import { postArea } from "../../../../lib/api";
import { useNavigate } from "react-router-dom";
import { useRedirectToLogin } from "../../../../hooks/useSession";

export default function AddArea({ session }) {
  useRedirectToLogin(session, "/nurse/login");
  const nurse = data.nurse;
  const navigate = useNavigate();
  const [status, setStatus] = useState()

  const [formData, setFormData] = useState({
    area: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveReturn = async (e) => {
    e.preventDefault();
    try {
      await postArea(
        session,
        formData.area,
      );
      navigate("/nurse/admin/settings");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveAddAnother = async (e) => {
    e.preventDefault();
    try {
      await postArea(
          session,
          formData.area
      );
      setFormData({
        area: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  function handleCancel() {
    navigate("/nurse/admin/settings");
  }

  return (
    <div className="adduser-container">
      <NurseHeader session={session} />
      <div className="title">
        <BsPersonFillAdd size="3rem" />
        <h1>Add new Area</h1>
      </div>

      <div id="data_form">
        <form>
          <div className="input_field">
            <p>
              Set Area
              <span>{nurse.required}</span>
            </p>
            <input
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Set Area"
              autoComplete="off"
            ></input>
          </div>
          <div id="bottom_buttons">
            <button className="cancel_button" onClick={handleCancel}>Cancel</button>
            <button className="save_button" onClick={handleSaveAddAnother}>
              Save and add another
            </button>
            <button className="save_button" onClick={handleSaveReturn}>
              Save and return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
