import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import ImagePreview from "./components/ImagePreview";
import Images from "./components/Images";

class App extends Component {
    state = {
        data: null,
    };

    componentDidMount() {
        this.callBackendAPI()
            .then((res) => this.setState({ data: res.express }))
            .catch((err) => console.log(err));
    }

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
                <Header />
                <ImagePreview />
                {/* <Images /> */}
                <p className="App-intro">{this.state.data}</p>
            </div>
        );
    }
}

export default App;
