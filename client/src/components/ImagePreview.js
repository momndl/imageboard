import React, { useEffect, useState } from "react";
import Modal from "./Modal";

export default function ImagePreview(props) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    function modalHandler() {
        setOpenModal(!openModal);
    }
    function toggleClass(id) {
        const selectedImage = selectedImg === id;
        return selectedImage ? "active" : "";
    }

    const currentImageHandler = (prevornext, id) => {
        if (prevornext === "prev") {
            if (id === props.lowestId) {
                return;
            } else {
                const prevImg = props.imgData.data.filter(
                    (image) => image.id == id - 1
                );
                setCurrentImage(prevImg[0]);
            }
        } else if (prevornext === "next") {
            if (id === props.highestId) {
                return;
            } else {
                const nextImg = props.imgData.data.filter(
                    (image) => image.id == id + 1
                );
                setCurrentImage(nextImg[0]);
            }
        }
    };

    return (
        <main className="imgPreview">
            {openModal && (
                <Modal
                    currentImageHandler={currentImageHandler}
                    closeModal={modalHandler}
                    openModal={openModal}
                    data={currentImage}
                    lowestId={props.lowestId}
                    highestId={props.highestId}
                />
            )}
            <div className="imgGrid">
                {!props.imgData.data && <div> loading images...</div>}
                {props.imgData.data &&
                    props.imgData.data.map((image) => (
                        <div className="imgDiv" key={image.id}>
                            <img
                                onMouseEnter={() => {
                                    setSelectedImg(image.id);
                                }}
                                onMouseLeave={() => setSelectedImg(null)}
                                onClick={() => {
                                    modalHandler();
                                    setCurrentImage(image);
                                }}
                                className="imagePreview"
                                alt={image.title}
                                src={image.url}
                                imageid={image.id}
                            />
                            <p
                                className={`titlePreview ${toggleClass(
                                    image.id
                                )}`}
                            >
                                {image.title}
                            </p>
                        </div>
                    ))}
            </div>
            {props.lowestId === 1 ? (
                ""
            ) : (
                <button
                    className="moreBtn"
                    onClick={() => props.buttonHandler(props.lowestId)}
                >
                    show more!
                </button>
            )}
        </main>
    );
}
