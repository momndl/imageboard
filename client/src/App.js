import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";

class App extends Component {
    state = {
        data: null,
        imgData: null,
    };

    componentDidMount() {
        this.callBackendAPI()
            .then((res) => this.setState({ data: res.express }))
            .catch((err) => console.log(err));
        this.fetchImages()
            .then((res) => this.setState({ imgData: res.imgData }))
            .catch((err) => console.log(err));
        console.log(this.state);
    }
    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch("/express_backend");
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    fetchImages = async () => {
        const response = await fetch("/images");
        const body = await response.json();
        console.log("respo", body);
        console.log("success?", body.success);
        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    render() {
        return (
            <div className="App">
                <Header />
                {this.state.imgData &&
                    this.state.imgData.map((image, i) => (
                        <div className="imgDiv" key={i}>
                            <img
                                className="image"
                                alt={image.title}
                                src={image.url}
                            ></img>
                            <p>{image.title}</p>
                        </div>
                    ))}
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">{this.state.data}</p>
            </div>
        );
    }
}

export default App;
