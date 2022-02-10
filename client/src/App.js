import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import ImagePreview from "./components/ImagePreview";
// import Images from "./components/Images";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            imgData: null,
            refresh: false,
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
            .then((response) => this.setState({ imgData: response.imgData }))
            .then(
                console.log(
                    "images fetched from app! imgData:",
                    this.state.imgData
                )
            );
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
        return (
            <div className="App">
                <Header refreshFn={this.refreshFn} />
                <ImagePreview
                    imgData={this.state.imgData}
                    refresh={this.state.refresh}
                />

                <p className="App-intro">{this.state.data}</p>
            </div>
        );
    }
}

export default App;
