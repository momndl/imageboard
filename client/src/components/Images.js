import React, { Component } from "react";
import Modal from "./Modal";

export default class Images extends Component {
    constructor(props) {
        super(props);
        this.state = { openModal: false, imgData: null };
    }

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

    componentDidMount() {
        this.fetchImages()
            .then((res) => this.setState({ imgData: res.imgData }))
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <div>
                {this.state.openModal && (
                    <>
                        {" "}
                        <Modal />{" "}
                    </>
                )}
                {!this.state.imgData && <> loading images...</>}
                {this.state.imgData &&
                    this.state.imgData.map((image, i) => (
                        <div className="imgDiv" key={i}>
                            <img
                                onClick={() => {
                                    this.setState({
                                        openModal: !this.state.openModal,
                                    });
                                }}
                                className="image"
                                alt={image.title}
                                src={image.url}
                            ></img>
                            <p>{image.title}</p>
                        </div>
                    ))}
            </div>
        );
    }
}
