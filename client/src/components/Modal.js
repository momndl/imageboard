import React from "react";

export default function Modal(props) {
    return (
        <div>
            {" "}
            i am a modal
            <p>props.data.id: {props.data.id}</p>{" "}
            <p>props.data.title: {props.data.title}</p>
            <p>props.data.username: {props.data.username}</p>
            <p>props.data.url: {props.data.url}</p>
            <p>props.data.created_at: {props.data.created_at}</p>
        </div>
    );
}
