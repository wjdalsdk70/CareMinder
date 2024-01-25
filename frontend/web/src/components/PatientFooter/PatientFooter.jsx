import React, {useEffect, useState} from "react";
import { FaCircleInfo } from "react-icons/fa6";
import "./PatientFooter.css";
import {getSettings} from "../../lib/api";

export default function Footer() {
    const [settings, setSettings] = useState([])

    const fetchSettings = async () => {
        try {
            const settingsData = await getSettings();
            setSettings(settingsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchSettings().then(r => null);
    }, []);

    return (
      <footer className="footer">
        <div className="footer__container">
          <FaCircleInfo size={48} className="info" />
          <h3>
            {settings.notification}
          </h3>
        </div>
      </footer>
  );
}
