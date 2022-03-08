import React, { useEffect, useState, useRef } from "react";
import Comments from "./Comments";

export default function Modal(props) {
    const [showComments, setShowComments] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const modalMainRef = useRef(null);

    const modalBgStyle = {
        height: `${props.modalBgHeight}px`,
    };

    useEffect(() => {
        window.scrollTo({ top: 150, behavior: "smooth" });
        fetch(`comments/${props.data.id}.json`)
            .then((res) => res.json())
            .then((resComments) => {
                setCommentCount(resComments.commentData.length);
            })
            .catch((err) => console.log(err));
    }, [props.data.id]);

    // !! delete function for future use !!
    // function deleteImage(id) {
    //     fetch(`/delete/${id}.json`)
    //         .then((res) => res.json())
    //         .then((data) => console.log("data after fetch delete", data));
    // }
    return (
        <div style={modalBgStyle} className="modalBg">
            <div ref={modalMainRef} className="modalMain">
                <span
                    className="closeX"
                    onClick={() => {
                        props.closeModal();
                    }}
                >
                    x
                </span>
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
                    <span>{props.data.username} </span> {props.data.posted}
                </p>
                {showComments ? (
                    <div className="commentWrapper">
                        <button
                            className="showCommentsBtn"
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
                        className="showCommentsBtn"
                        onClick={() => {
                            setShowComments(!showComments);
                        }}
                    >
                        comments {commentCount === 0 ? "" : `(${commentCount})`}
                    </button>
                )}
            </div>
        </div>
    );
}
