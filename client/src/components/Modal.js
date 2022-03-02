import React, { useEffect, useState } from "react";
import Comments from "./Comments";

export default function Modal(props) {
    const [imgData, setImgData] = useState(null);
    const [showComments, setShowComments] = useState(false);

    function deleteImage(id) {
        fetch("/delete")
            .then((res) => res.json())
            .then((data) => console.log("data after fetch delete", data));
    }
    return (
        <div className="modalBg">
            <div className="modalMain">
                <div className="imgAndButtons">
                    <span
                        className="prevBtn"
                        onClick={() =>
                            props.currentImageHandler("prev", props.data.id)
                        }
                    >
                        prev
                    </span>
                    <img
                        className="modalImg"
                        src={props.data.url}
                        alt={props.data.title}
                    />
                    <span
                        className="prevBtn"
                        onClick={() =>
                            props.currentImageHandler("next", props.data.id)
                        }
                    >
                        next
                    </span>
                </div>

                <p className="modalTitle">{props.data.title}</p>
                <p className="modalDescription">{props.data.description}</p>
                <p className="modalUsername">
                    uploaded by: {props.data.username}
                </p>
                <p className="modalDate">uploaded at: {props.data.posted}</p>
                <span className="modalDeleteImage">Delete</span>
                {showComments ? (
                    <div>
                        <button
                            onClick={() => {
                                setShowComments(!showComments);
                            }}
                        >
                            close
                        </button>
                        <Comments id={props.data.id} />{" "}
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            setShowComments(!showComments);
                        }}
                    >
                        comments
                    </button>
                )}
            </div>
        </div>
    );
}
