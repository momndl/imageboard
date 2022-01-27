import React, { Component } from "react";
import Modal from "./Modal";

export default class Images extends Component {
    constructor(props) {
        super(props);
        this.state = { openModal: false, imgData: null, currentImg: null };
        this.closeModal = this.closeModal.bind(this);
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
    closeModal() {
        this.setState({
            openModal: !this.state.openModal,
        });
    }

    componentDidMount() {
        this.fetchImages()
            .then((res) => this.setState({ imgData: res.imgData }))
            .catch((err) => console.log(err));
    }
    render() {
        return (
            <div className="imgGrid">
                {this.state.openModal && (
                    <>
                        <Modal
                            closeModal={this.closeModal}
                            openModal={this.state.openModal}
                            data={this.state.currentImg}
                        />{" "}
                    </>
                )}
                {!this.state.imgData && <> loading images...</>}
                {this.state.imgData &&
                    this.state.imgData.map((image) => (
                        <div className="imgDiv" key={image.id}>
                            <img
                                onClick={(e) => {
                                    console.log("imgclick!", e.target);
                                    this.closeModal();
                                    this.setState({ currentImg: image });
                                }}
                                className="imagePreview"
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
