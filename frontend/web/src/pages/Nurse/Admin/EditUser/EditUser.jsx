import React, { useEffect, useState } from "react";
import data from "src/data.json";
import "./EditUser.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { FaUserEdit } from "react-icons/fa";
import { getStaff, postStaff, updateStaff } from "../../../../lib/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser({ session }) {
  const nurse = data.nurse;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    roles: 0,
    type: 0,
    nfc: "NFCTOKEN",
  });

  const fetchData = async () => {
    try {
      const user = await getStaff(id);
      setFormData({
        username: user.username || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        roles: user.role || 0,
        type: user.type || 0,
        nfc: user.nfc || "NFCTOKEN",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData().then((r) => null);
  }, [id]);

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
      await updateStaff(
        session,
        id,
        formData.username,
          formData.first_name,
        formData.last_name,
        formData.roles,
        formData.type,
        formData.nfc
      );
      navigate("/nurse/admin/userlist");
    } catch (error) {
      console.error(error);
    }
  };

  function handleCancel() {
    navigate('/nurse/admin/userlist');
  }

  return (
    <div className="edituser-container">
      <NurseHeader />
      <div className="title">
        <FaUserEdit size="3rem" />
        <h1>Edit user data</h1>
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
              {nurse.role}
              <span>{nurse.required}</span>
            </p>
            <select
              name="roles"
              onChange={handleChangeNum}
              value={formData.roles}
            >
              <option value={0}>Secretary</option>

              <option value={1}>Careworker</option>
            </select>
          </div>
          <div className="input_field">
            <p>
              {nurse.type}
              <span>{nurse.required}</span>
            </p>
            <select
              name="type"
              onChange={handleChangeNum}
              value={formData.type}
            >
              <option value={0}>Helper</option>

              <option value={1}>Nurse</option>

              <option value={2}>Doctor</option>
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
            <button className="cancel_button" onClick={handleCancel}>Cancel</button>
            <button className="save_button" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
