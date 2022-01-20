import React, { Component } from "react";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { title: "", username: "", description: "", file: null };
    }
    componentDidMount() {
        // fetch("/test").then((data) => console.log("data:", data));
    }

    upload(params) {
        console.log("state", this.state);
        const fd = new FormData();
        fd.append("title", this.state.title);
        fd.append("description", this.state.description);
        fd.append("username", this.state.username);
        fd.append("file", this.state.file);

        fetch("/upload", { method: "POST", body: fd })
            .then((response) => response.json)
            .then((result) => console.log(result))
            .catch(console.log);
    }
    render() {
        return (
            <header id="header">
                <span>
                    <h1>THE IMAGEBOARD</h1>
                    <h2>upload your best stuff</h2>
                </span>
                <div className="fileupload">
                    <input
                        onChange={(e) => {
                            this.setState({ title: e.target.value });
                        }}
                        placeholder="title"
                    ></input>
                    <input
                        onChange={(e) => {
                            this.setState({ description: e.target.value });
                        }}
                        placeholder="description"
                    ></input>
                    <input
                        onChange={(e) => {
                            this.setState({ username: e.target.value });
                        }}
                        placeholder="username"
                    ></input>
                    <input
                        onChange={(e) => {
                            this.setState({ file: e.target.value });
                        }}
                        type={"file"}
                    ></input>
                    <button onClick={() => this.upload()}>Upload!</button>
                </div>
            </header>
        );
    }
}
