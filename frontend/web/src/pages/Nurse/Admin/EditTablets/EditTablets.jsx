import React, { useEffect, useState } from "react";
import data from "src/data.json";
import "./EditTablets.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { FaUserEdit } from "react-icons/fa";
import {
  getStaff,
  getTablet,
  postStaff,
  postTablet,
  updateStaff,
} from "../../../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import {useRedirectToLogin} from "../../../../hooks/useSession";

export default function EditTablets({ session }) {
  useRedirectToLogin(session, '/nurse/login')
  const nurse = data.nurse;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    area_id: "",
  });

  const fetchData = async () => {
    try {
      const tablet = await getTablet(session, id);
      setFormData({
        username: tablet.name || "",
        password: tablet.area_id || "",
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
    console.log(formData);
    try {
      await postTablet(formData.name, formData.area_id);
      navigate("/nurse/admin/settings");
    } catch (error) {
      console.error(error);
    }
  };

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
        </form>
      </div>
    </div>
  );
}
