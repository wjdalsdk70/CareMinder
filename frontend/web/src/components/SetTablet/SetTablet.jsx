import React from 'react';
import './SetTablet.css';
import data from 'src/data.json';

export default function SetTablet() {
    return(
        <div className="set-tablet">
            <textarea placeholder={data.nurse.changeName} className="text-area"></textarea>
            <textarea placeholder={data.nurse.changeArea} className="text-area"></textarea>
        </div>
    );

}
