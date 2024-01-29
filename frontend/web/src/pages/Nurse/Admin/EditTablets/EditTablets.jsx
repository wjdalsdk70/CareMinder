import React, { useEffect, useState } from "react";
import data from "src/data.json";
import "./EditTablets.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { FaUserEdit } from "react-icons/fa";
import {
  getAreas,
  patchTablet,
  getTablet,

} from "../../../../lib/api";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useRedirectToLogin} from "../../../../hooks/useSession";

export default function EditTablets({ session }) {
  useRedirectToLogin(session, '/nurse/login')
  const nurse = data.nurse;
  const { id } = useParams();
  const navigate = useNavigate();
  const [area, setArea] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    area_id: "",
  });

  const fetchData = async () => {
    try {
      const areaData = await getAreas(session);
      setArea(areaData)
      const tablet = await getTablet(id);
      setFormData({
        name: tablet.name || "",
        area_id: tablet.area_id || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchData().then((r) => null);
  }, []);

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

  const handleCancel = () => {
    navigate("/nurse/admin/settings");

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patchTablet(session, id, formData.name, formData.area_id);
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
        <h1>Edit Tablet</h1>
      </div>
      <div id="data_form">
        <form onSubmit={handleSubmit}>
          <div className="input_field">
            <p>
              Name of Tablet
              <span>{nurse.required}</span>
            </p>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name of Tablet"
                autoComplete="off"
            ></input>
          </div>

          <div className="input_field">
            <p>
              Area of tablet
              <span>{nurse.required}</span>
            </p>
            <select
                name="area_id" // Correcting the name attribute
                onChange={handleChangeNum}
                value={formData.area_id}
            >
              {area.map((tablet, index) => {
                return (
                    <option key={index} value={tablet.id}>
                      {tablet.name}
                    </option>
                );
              })}
            </select>
          </div>
          <div id="bottom_buttons">
            <button className="cancel_button" onClick={handleCancel}>
              Cancel
            </button>
            <button className="save_button" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}