import React from "react";

export default function Modal(props) {
    function deleteImage(id) {
        fetch("/delete")
            .then((res) => res.json())
            .then((data) => console.log("data after fetch delete", data));
    }
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
                <p className="modalDescription">{props.data.description}</p>
                <p className="modalUsername">
                    uploaded by: {props.data.username}
                </p>
                <p className="modalDate">uploaded at: {props.data.posted}</p>
                <span className="modalDeleteImage">Delete</span>
            </div>
        </div>
    );
}
