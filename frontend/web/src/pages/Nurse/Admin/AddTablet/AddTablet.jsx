import React, { useState } from "react";
import data from "src/data.json";
import "./AddTablet.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { BsPersonFillAdd } from "react-icons/bs";
import { postStaff } from "../../../../lib/api";
import {useNavigate} from "react-router-dom";
import {useRedirectToLogin} from "../../../../hooks/useSession";

export default function AddTablet({ session }) {
  useRedirectToLogin(session, '/nurse/login')
  const nurse = data.nurse;
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    roles: 0,
    type: 0,
    nfc: "NFCTOKEN",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeNum = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postStaff(
        session,
        formData.username,
        formData.password,
        formData.first_name,
        formData.last_name,
        formData.roles,
        formData.type,
        formData.nfc
      );
      navigate('/nurse/admin/userlist');
    } catch (error) {
      console.error(error);
    }
  };

  function handelCancel() {
    navigate('/nurse/admin/userlist');
  }

  return (
    <div className="adduser-container">
      <NurseHeader />
      <div className="title">
        <BsPersonFillAdd size="3rem" />
        <h1>Add new User</h1>
      </div>

      <div id="data_form">
        <form onSubmit={handleSubmit}>
          <div className="input_field">
            <p>
              {nurse.username}
              <span>{nurse.required}</span>
            </p>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={nurse.username}
              autoComplete="off"
            ></input>
          </div>
          <div className="input_field">
            <p>
              {nurse.first_name}
              <span>{nurse.required}</span>
            </p>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder={nurse.first_name}
              autoComplete="off"
            ></input>
          </div>
          <div className="input_field">
            <p>
              {nurse.last_name}
              <span>{nurse.required}</span>
            </p>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder={nurse.last_name}
              autoComplete="off"
            ></input>
          </div>
          <div className="input_field">
            <p>
              {nurse.password}
              <span>{nurse.required}</span>
            </p>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={nurse.password}
              autoComplete="off"
            ></input>
          </div>
          <div className="input_field">
            <p>
              {nurse.role}
              <span>{nurse.required}</span>
            </p>
            <select name="roles" onChange={handleChangeNum} defaultValue="">
              <option value="" disabled>
                Please select a Role
              </option>
              <option value={0}>{nurse.roles[0]}</option>

              <option value={1}>{nurse.roles[1]}</option>
            </select>
          </div>
          <div className="input_field">
            <p>
              {nurse.type}
              <span>{nurse.required}</span>
            </p>
            <select name="type" onChange={handleChangeNum} defaultValue="">
              <option value="" disabled>
                Please select a Type
              </option>
              <option value={0}>{nurse.types[0]}</option>

              <option value={1}>{nurse.types[1]}</option>

              <option value={2}>{nurse.types[2]}</option>
            </select>
          </div>
          <div className="input_field">
            <div className="input_field">
              <p>{nurse.nfcData}</p>
              <input
                name="nfcData"
                onChange={handleChange}
                placeholder={nurse.nfcData}
                style={{ width: "35vmin" }}
                disabled={true}
              ></input>
            </div>
            <button className="change_data_button">Change Data</button>
          </div>
          <div id="bottom_buttons">
            <button className="cancel_button">Cancel</button>
            <button className="save_button" type="submit">
              Save
            </button>
            <button className="save_button" type="submit">
              Save and go to staff list
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
