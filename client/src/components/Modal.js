import React from "react";

export default function Modal(props) {
    return (
        <div
            className="modalBg"
            onClick={() => {
                props.closeModal();
                console.log("props", props);
            }}
        >
            <div className="modalMain">
                <img
                    className="modalImg"
                    src={props.data.url}
                    alt={props.data.title}
                ></img>
                <p className="modalTitle">{props.data.title}</p>
                <p className="modalUsername">
                    uploaded by: {props.data.username}
                </p>
                <p className="modalDate">
                    uploaded at: {props.data.created_at}
                </p>
            </div>
        </div>
    );
}
