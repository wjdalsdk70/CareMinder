import React, { useEffect, useState } from "react";
import data from "src/data.json";
import "./AddTablet.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { FaUserEdit } from "react-icons/fa";
import {
  getAreas,
  postTablet

} from "../../../../lib/api";
import {useNavigate} from "react-router-dom";
import {useRedirectToLogin} from "../../../../hooks/useSession";

export default function EditTablets({ session }) {
  useRedirectToLogin(session, '/nurse/login')
  const nurse = data.nurse;
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
      await postTablet(session, formData.name, formData.area_id);
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
          <h1>Add Tablet</h1>
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
                  name="area_id"
                  onChange={handleChangeNum}
                  value={formData.area_id}
                  defaultValue={"select an Area"}
              >
                <option value="" disabled>
                  Please select an Area
                </option>
                {area.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.name}
                    </option>
                ))}
              </select>
            </div>
            <div id="bottom_buttons">
              <button className="cancel_button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save_button" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}