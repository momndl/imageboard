import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";

export default function ImagePreview(props) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    const [imgData, setImgData] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    useEffect(() => {
        fetchImages()
            .then((response) => setImgData(response.imgData))
            .then(console.log("images fetched! imgData:", imgData));
    }, [props.refresh]);

    // useEffect(() => {
    //     console.log("props", props.imgData);
    // }, []);

    async function fetchImages() {
        const response = await fetch("/images");
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    }

    function modalHandler() {
        setOpenModal(!openModal);
    }
    function toggleClass(id) {
        const selectedImage = selectedImg === id;
        return selectedImage ? "active" : "";
    }
    function testitest(id) {
        console.log("dings digga", id);
    }
    return (
        <div className="imgGrid">
            {openModal && (
                <>
                    <Modal
                        closeModal={modalHandler}
                        openModal={openModal}
                        data={currentImage}
                    />{" "}
                </>
            )}
            {!imgData && <div> loading images...</div>}
            {imgData &&
                imgData.map((image) => (
                    <div className="imgDiv" key={image.id}>
                        <Link to={`/image/${image.id}`}>
                            <img
                                onMouseEnter={() => {
                                    setSelectedImg(image.id);
                                    console.log("first");
                                }}
                                onMouseLeave={() => setSelectedImg(null)}
                                onClick={() => {
                                    testitest(image.id);
                                    modalHandler();
                                    setCurrentImage(image);
                                }}
                                className="imagePreview"
                                alt={image.title}
                                src={image.url}
                                imageid={image.id}
                            />
                        </Link>
                        <p className={`titlePreview ${toggleClass(image.id)}`}>
                            {image.title}
                        </p>
                    </div>
                ))}
        </div>
    );
}
