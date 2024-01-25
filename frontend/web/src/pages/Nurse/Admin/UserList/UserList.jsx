import React, {useEffect, useState} from "react";
import data from "src/data.json";
import "./UserList.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { FaUserEdit, FaPlusCircle } from "react-icons/fa";
import {getStaffs} from "../../../../lib/api";
import {Link, useNavigate} from "react-router-dom";

export default function UserList() {
    const nurse = data.nurse;
    const [staffs, setStaffs] = useState([])
    const navigate = useNavigate()

    const fetchSettings = async () => {
        try {
            const staffsData = await getStaffs();
            setStaffs(staffsData);
            console.log(staffs)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchSettings().then(r => null);
    }, []);

    function handelGoAddPage() {
        navigate('/nurse/admin/adduser')
    }

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
                        <div>
                            {staffs.map((user, index) => (
                                <Link to={`/nurse/admin/edituser/${user.id}`} key={index}>
                                    <div className="userlist-row">
                                        <hr className="userlist-line-top"/>
                                        <div className="list-item">
                                            <p className="number-value">{user.id}</p>
                                            <p className="name-value">{`${user.first_name} ${user.last_name}`}</p>
                                        </div>
                                        <hr className="userlist-line-bottom"/>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
                <FaPlusCircle size="2.5rem" id="add-info" onClick={handelGoAddPage}/>
            </div>
        </div>
    );
}
