import React, { useEffect, useState } from "react";

export default function InfoBox({ type, message }) {
    const [visible, setVisible] = useState(true);
    let color;
    switch (type) {
        case "error":
            color = "#b91c1c";
            break;
        case "success":
            color = "#059669";
            break;
        case "warning":
            color = "#fbce6d";
            break;
        default:
            color = "#bcbbbb"
            break;
    }
    
    if (!visible) return null;

    return <div className="info-box" style={{ backgroundColor: color }}>{message}</div>;
}
