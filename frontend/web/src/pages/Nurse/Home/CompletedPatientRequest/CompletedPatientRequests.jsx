import React, { useEffect, useState } from "react";
import data from "src/data.json";
import "./CompletedPatientRequest.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { FaUserEdit } from "react-icons/fa";
import {getArea, getRequestsFiltered, getStaff, getTablet, patchArea} from "../../../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { useRedirectToLogin } from "../../../../hooks/useSession";

export default function CompletedPatientRequests({ session }) {
    useRedirectToLogin(session, "/nurse/login");
    const [request, setRequests] = useState([])
    const [area, setArea] = useState([])
    const [staff, setStaff] = useState([])

    async function fetchRequests() {
        try {
            const getAllRequests = await getRequestsFiltered(session, {
                state : 2
            });
            setRequests(getAllRequests);

        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() =>{
        fetchRequests()
    }, [])

    function formatTime(timeString) {
        const date = new Date(timeString);
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${hour}:${minute < 10 ? '0' : ''}${minute}`;
    }

    function formatIsQuestion(isQuestion) {
        return isQuestion ? 'Question' : 'Request';
    }

    return (
        <div className="container">
            <NurseHeader session={session} />
            <div className="title">
                <FaUserEdit size="3rem" />
                <h1>Completed patient requests</h1>
            </div>
            <div className="data-form">
                <form className="table">
                    <div className="completedRequestHeader">
                        <div className="itemTime">Time</div>
                        <div className="item">Classification</div>
                        <div className="itemRequest">Request Details</div>
                    </div>

                    {request.map((request, index) => {

                            return (
                                <div key={index} className="row">
                                    <div className="itemTime">{formatTime(request.time)}</div>
                                    <div className="item">{formatIsQuestion(request.is_question)}</div>
                                    <div className="itemRequest">{request.text}</div>
                                </div>
                            )
                    })}


                </form>
            </div>
        </div>

    );
}

