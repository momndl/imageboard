import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeaderF(props) {
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const usernameRef = useRef(null);
    const fileRef = useRef(null);
    const [success, setSuccess] = useState(false);
    const [uploadData, setUploadData] = useState({
        title: "",
        username: "",
        description: "",
        file: "",
    });
    useEffect(() => {
        console.log("useEffectRunnin");
        usernameRef.current.value = "";
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        fileRef.current.value = "";
        setUploadData({
            title: "",
            username: "",
            description: "",
            file: "",
        });
    }, [success]);

    const upload = () => {
        const values = Object.values(uploadData);
        const filtered = values.filter((val) => !val);

        if (filtered.length === 0) {
            const fd = new FormData();
            fd.append("title", uploadData.title);
            fd.append("description", uploadData.description);
            fd.append("username", uploadData.username);
            fd.append("file", uploadData.file);
            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.success) {
                        setSuccess(!success);
                        props.refreshFn();
                    } else {
                        console.log("upload failure");
                    }
                })
                .catch((err) => console.log(err));
        } else {
            // fill out all fields warning
            alert("fill out everything");
        }
    };
    return (
        <header id="header">
            <span>
                <Link to={"/"}>
                    {" "}
                    <h1>THE IMAGEBOARD</h1>
                </Link>

                <h2>upload your best stuff</h2>
            </span>
            <div className="fileupload">
                <input
                    ref={titleRef}
                    onChange={(e) => {
                        setUploadData({ ...uploadData, title: e.target.value });
                    }}
                    placeholder="title"
                ></input>
                <input
                    ref={descriptionRef}
                    onChange={(e) => {
                        setUploadData({
                            ...uploadData,
                            description: e.target.value,
                        });
                    }}
                    placeholder="description"
                ></input>
                <input
                    ref={usernameRef}
                    onChange={(e) => {
                        setUploadData({
                            ...uploadData,
                            username: e.target.value,
                        });
                    }}
                    placeholder="username"
                ></input>
                <input
                    ref={fileRef}
                    onChange={(e) => {
                        setUploadData({
                            ...uploadData,
                            file: e.target.files[0],
                        });
                    }}
                    type={"file"}
                    accept="image/*"
                ></input>
                <button onClick={() => upload()}>Upload!</button>
            </div>
        </header>
    );
}
