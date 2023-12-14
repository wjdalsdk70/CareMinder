import React from "react";
import data from "src/data.json";
import "./Settings.css";
import Switch from "src/components/Switch/Switch";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { IoMdAddCircle } from "react-icons/io";
import SetTablet from "src/components/SetTablet/SetTablet";

export default function Settings() {
  // TODO do get

  function addTablet() {
    // Do create
    // do update
  }

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
                    className="settings__home__textarea"
                  ></textarea>
                </div>

                <div>
                  <label>{data.nurse.settingsHospitalSubtitle}</label>
                  <textarea
                    placeholder={data.patient.hospitalSubtitle}
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
                    <div className="row-container row ">
                      <label>{data.nurse.changeName}</label>
                      <label>{data.nurse.changeArea}</label>
                    </div>
                  </div>
                  <IoMdAddCircle size={32} onClick={addTablet} />
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
