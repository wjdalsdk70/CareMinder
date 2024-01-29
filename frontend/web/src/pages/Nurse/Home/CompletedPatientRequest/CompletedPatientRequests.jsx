import React, { useEffect, useState } from "react";
import data from "src/data.json";
import "./CompletedPatientRequest.css";
import NurseHeader from "src/components/NurseHeader/NurseHeader";
import { FaUserEdit } from "react-icons/fa";
import {getArea, getRequestsFiltered, patchArea} from "../../../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { useRedirectToLogin } from "../../../../hooks/useSession";

export default function CompletedPatientRequests({ session }) {
    useRedirectToLogin(session, "/nurse/login");
    const [request, setRequests] = useState([])

    async function fetchRequests() {
        try {
            const getAllRequests = await getRequestsFiltered(session, {

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
                    <div className="completed-request-header">
                        <p>Time</p>
                        <p>Name</p>
                        <p>The Area</p>
                        <p>Classification</p>
                        <p>Request Details</p>
                        <div className="completed-request-item">View Details</div>
                    </div>
                    {request.map((row, index) => (
                        <div key={index} className="row">
                            <p>{formatTime(row.time)}</p>
                            <p>{row.staff_id}</p>
                            <p>{row.tablet_id}</p>
                            <p>{formatIsQuestion(row.is_question)}</p>
                            <p>{row.text}</p>
                            <p>{row.response}</p>
                        </div>
                    ))}


                </form>
            </div>
        </div>

    );
}

