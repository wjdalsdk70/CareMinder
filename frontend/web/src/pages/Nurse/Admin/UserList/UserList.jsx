import React from "react";
import data from "src/data.json";
import "./UserList.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { FaUserEdit } from "react-icons/fa";

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
                <div id="userlist">
                    <div id="list-items">
                        <h2>No.</h2>
                        <h2>Name</h2>
                        <h2>Company ID</h2>
                    </div>

                    <div className="list-item">
                        <p className="item1">127</p>
                        <p className="item1">crazyname</p>
                        <p className="item1">4461982374</p>
                    </div>
                </div>
            <div id="bottom_buttons">
                <button className="cancel_button">Cancel</button>
                <button className="save_button" type="submit">Save</button>
            </div>
        </div>
    );
}
