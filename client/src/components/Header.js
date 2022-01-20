import React, { Component } from "react";

export default class Header extends Component {
    componentDidMount() {
        fetch("/test").then((data) => console.log("data:", data));
    }
    render() {
        return (
            <header id="header">
                {" "}
                <h2>header</h2>
                <button onClick={console.log("click")}>check db</button>
            </header>
        );
    }
}
