import React from "react";
import data from "src/data.json";
import "./UserList.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { FaUserEdit, FaPlusCircle } from "react-icons/fa";

export default function UserList() {
    const nurse = data.nurse;

    return (
        <div className="userlist-container">
            <NurseHeader />
            <div className="title">
                <FaUserEdit size="3rem" />
                <h1>Query User Information</h1>
            </div>
            <p style={{ marginTop: "2vmin", marginLeft: "2vmin" }}>Double-click on the nursing staff information to find out more about the nursing staff. You can add users by pressing the plus button.</p>
            <div id="userlist-add">
                <div id="userlist">
                    <div id="list-items">
                        <h2 className="item-number">No.</h2>
                        <h2 className="item-name">Name</h2>
                        <h2 className="company-id">Company ID</h2>
                    </div>

                    <div id="userlist-rows">

                        <div className="userlist-row">
                            <hr className="userlist-line-top" />
                            <div className="list-item">
                                <p className="number-value">127</p>
                                <p className="name-value">care minder</p>
                                <p className="company-id-value">4461982374</p>
                            </div>
                            <hr className="userlist-line-bottom" />
                        </div>

                        <div className="userlist-row">
                            <hr className="userlist-line-top" />
                            <div className="list-item">
                                <p className="number-value">1</p>
                                <p className="name-value">care minder</p>
                                <p className="company-id-value">666585566</p>
                            </div>
                            <hr className="userlist-line-bottom" />
                        </div>

                        <div className="userlist-row">
                            <hr className="userlist-line-top" />
                            <div className="list-item">
                                <p className="number-value">88885</p>
                                <p className="name-value">care minder</p>
                                <p className="company-id-value">999999999</p>
                            </div>
                            <hr className="userlist-line-bottom" />
                        </div>

                    </div>

                </div>
                <FaPlusCircle size="2.5rem" id="add-info"/>
            </div>
            <div id="bottom_buttons">
                <button className="cancel_button">Cancel</button>
                <button className="save_button" type="submit">Save</button>
            </div>
        </div>
    );
}
