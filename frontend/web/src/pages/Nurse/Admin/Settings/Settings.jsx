import data from "src/data.json";
import "./Settings.css";
import Switch from "src/components/Switch/Switch";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { IoMdAddCircle } from "react-icons/io";
import {getSettings, getStaff, getTablets} from "../../../../lib/api";
import React, { useEffect, useState } from "react";

export default function Settings({session}) {
  const [settings, setSettings] = useState({
    hospital_title: "",
    hospital_description: "",
    notification: "",
  });
  const [tablets, setTablets] = useState([]);

  const fetchData = async () => {
    try {
      const settingsData = await getSettings(session);
      const tabletsData = await getTablets(session);
      setSettings({
        hospital_title: settingsData.hospital_title || "",
        hospital_description: settingsData.hospital_description || "",
        notification: settingsData.notification || ""
      });
      setTablets(tabletsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData().then((r) => null);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="settings__home">
      <NurseHeader />
      <form>
        <div className="container">
          <div className="column">
            <div className="row">
              <div className="on-off">
                <h2>{data.nurse.settingsTitle}</h2>
                <Switch />
              </div>
            </div>
            <div className="row">
              <div className="row-container column">
                <h2>{data.nurse.editHospital}</h2>
                <div>
                  <label>{data.nurse.settingsHospitalTitle}</label>
                  <textarea
                    placeholder={data.patient.hospitalTitle}
                    value={settings.hospital_title}
                    onChange={handleChange}
                    name="hospital_title"
                    className="settings__home__textarea"
                  ></textarea>
                </div>

                <div>
                  <label>{data.nurse.settingsHospitalSubtitle}</label>
                  <textarea
                    placeholder={data.patient.hospitalSubtitle}
                    value={settings.hospital_description}
                    onChange={handleChange}
                    name="hospital_description"
                    className="settings__home__textarea"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row-containe column">
                <h2>{data.nurse.editNotification}</h2>
                <div>
                  <label>{data.nurse.settingsHospitalTitle}</label>
                  <textarea
                    placeholder={data.patient.hospitalTitle}
                    className="settings__home__textarea"
                    value={settings.notification}
                    name="notification"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="row">
              <div className="on-off">
                <h2>{data.nurse.settingsNFC}</h2>
                <Switch />
              </div>
            </div>
            <div className="row">
              <div className="row-container column">
                <h2>{data.nurse.setTable}</h2>
                <div className="row-container row">
                  <div className="row-container column">
                    {tablets.map((tablets) => (
                      <div key={tablets.id} className="row-container row">
                        <label>{tablets.name}</label>
                        <label>{tablets.area_id}</label>
                      </div>
                    ))}
                  </div>
                  <IoMdAddCircle size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          <input className="cancel" type="reset" value="Cancel" />
          <input className="save" type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
}
