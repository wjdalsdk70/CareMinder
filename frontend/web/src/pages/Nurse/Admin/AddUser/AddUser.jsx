import React from "react";
import data from "src/data.json";
import "./AddUser.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { BsPersonFillAdd } from "react-icons/bs";

export default function AddUser() {
    const nurse = data.nurse;

    return (
        <div className="adduser-container">
            <NurseHeader />
            <div className="title">
                <BsPersonFillAdd size="3rem" />
                <h1>Add new User</h1>
            </div>
            <div id="data_form">
                <form>
                    <div className="input_field">
                        <p>{nurse.userName}<span>{nurse.required}</span></p>
                        <input placeholder={nurse.userName}></input>
                    </div>
                    <div className="input_field">
                        <p>{nurse.companyID}</p>
                        <input placeholder={nurse.companyID}></input>
                    </div>
                    <div className="input_field">
                        <p>{nurse.ID}<span>{nurse.required}</span></p>
                        <input placeholder={nurse.ID}></input>
                    </div>
                    <div className="input_field">
                        <p>{nurse.password}<span>{nurse.required}</span></p>
                        <input placeholder={nurse.password}></input>
                    </div>
                    <div className="input_field">
                        <div className="input_field">
                            <p>{nurse.nfcData}</p>
                            <input placeholder={nurse.nfcData} style={{ width: "35vmin" }}></input>
                        </div>
                        <button className="change_data_button">Change Data</button>
                    </div>
                    <div id="bottom_buttons">
                        <button className="cancel_button">Cancel</button>
                        <button className="save_button" type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}