import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
export default function Comments(props) {
    const usernameRef = useRef(null);
    const commentRef = useRef(null);
    const imageId = props.id;
    const [comments, setComments] = useState({
        success: "",
        entries: "",
        latestComment: "",
    });
    const [newComment, setNewComment] = useState({
        username: "",
        comment: "",
        id: imageId,
    });
    useEffect(() => {
        fetch(`comments/${imageId}.json`)
            .then((res) => res.json())
            .then((resComments) => {
                console.log("comments", resComments);
                setComments({
                    ...comments,
                    success: resComments.success,
                    entries: resComments.commentData,
                });
                setNewComment({
                    username: "",
                    comment: "",
                    id: imageId,
                });
            })
            .catch((err) => console.log(err));
    }, [imageId, comments.latestComment]);

    function postComment(username, comment, id) {
        const data = { username: username, comment: comment, id: id };

        fetch("/addcomment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) =>
            response.json().then((res) => {
                setComments({ ...comments, latestComment: res.commentData });
            })
        );
    }

    return (
        <div className="commentContainer">
            Comments
            <div>
                <input
                    ref={usernameRef}
                    placeholder="username"
                    onChange={(e) =>
                        setNewComment({
                            ...newComment,
                            username: e.target.value,
                        })
                    }
                ></input>
                <input
                    ref={commentRef}
                    placeholder="comment"
                    onChange={(e) =>
                        setNewComment({
                            ...newComment,
                            comment: e.target.value,
                        })
                    }
                ></input>
                {newComment.comment && newComment.username ? (
                    <button
                        onClick={() => {
                            postComment(
                                newComment.username,
                                newComment.comment,
                                imageId
                            );
                            usernameRef.current.value = "";
                            commentRef.current.value = "";
                        }}
                        className="commentBtn activeBtn"
                    >
                        add comment
                    </button>
                ) : (
                    <button
                        className="commentBtn"
                        onClick={() => {
                            usernameRef.current.value = "";
                            commentRef.current.value = "";
                        }}
                    >
                        add comment
                    </button>
                )}
            </div>
            {comments.entries.length === 0 ? (
                <p>no comments yet</p>
            ) : (
                comments.entries.map((comment) => (
                    <p key={comment.comment_id}>
                        {comment.comment} -- {comment.username} --{" "}
                        {comment.posted}
                    </p>
                ))
            )}
        </div>
    );
}
