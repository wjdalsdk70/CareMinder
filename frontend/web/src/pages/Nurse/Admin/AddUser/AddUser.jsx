import React from "react";

export default function AddUser() {

    const inputs = [
        { name: "Name" },
        { name: "Company ID" },
        { name: "ID" },
        { name: "Password" },
        { name: "NFC Data" }
    ]

    return (
        <div>
            <form>
                <div>
                    {inputs.map((input, index) => (
                        <div key={index}>
                            <p>{input.name}</p>
                            <input placeholder={input.name}></input>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
}
