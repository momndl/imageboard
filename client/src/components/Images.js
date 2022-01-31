import React, { Component } from "react";
import Modal from "./Modal";

export default class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            imgData: null,
            currentImg: null,
            titlePreview: false,
        };
        this.closeModal = this.closeModal.bind(this);
    }

    fetchImages = async () => {
        const response = await fetch("/images");
        const body = await response.json();
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
    // imgHoverOn = (e) => {
    //     this.setState({ titlePreview: true });
    // };
    // imgHoverOf = (e) => {
    //     this.setState({ titlePreview: false });
    // };
    componentDidMount() {
        this.fetchImages()
            .then((res) => this.setState({ imgData: res.imgData }))
            .catch((err) => console.log(err));
    }

    toggleClass = (id) => {
        const selectedItem = this.state.selectedItem === id;

        return selectedItem ? "active" : "";
    };

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
                                onMouseEnter={() =>
                                    this.setState({ selectedItem: image.id })
                                }
                                onMouseLeave={() =>
                                    this.setState({ selectedItem: null })
                                }
                                onClick={() => {
                                    this.closeModal();
                                    this.setState({ currentImg: image });
                                }}
                                className="imagePreview"
                                alt={image.title}
                                src={image.url}
                                imageid={image.id}
                            ></img>
                            <p
                                className={`titlePreview ${this.toggleClass(
                                    image.id
                                )}`}
                            >
                                {image.title}
                            </p>
                        </div>
                    ))}
            </div>
        );
    }
}
