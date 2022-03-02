import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import ImagePreview from "./components/ImagePreview";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageFocus from "./components/ImageFocus";
import HeaderF from "./components/HeaderF";
// import Images from "./components/Images";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            imgData: null,
            refresh: false,
            highestId: 0,
        };
        this.refreshFn = this.refreshFn.bind(this);
    }

    refreshFn() {
        this.setState({ refresh: !this.state.refresh });
    }

    componentDidMount() {
        this.callBackendAPI()
            .then((res) => this.setState({ data: res.express }))
            .catch((err) => console.log(err));
        this.fetchImages()
            .then((response) => {
                console.log("response", response.imgData);
                this.setState({ imgData: response.imgData });
                this.setState({ highestId: response.imgData[0].id });
            })
            .catch((err) => console.log("err", err));
    }

    fetchImages = async () => {
        const response = await fetch("/images");
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    callBackendAPI = async () => {
        const response = await fetch("/express_backend");
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    render() {
        return <div>nice</div>;
    }
}

export default App;
