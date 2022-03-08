import React, { useState, useEffect } from "react";
import "./App.css";
import ImagePreview from "./components/ImagePreview";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageFocus from "./components/ImageFocus";
import HeaderF from "./components/HeaderF";

export default function AppF() {
    const [imgData, setImgData] = useState({ data: null });
    const [refresh, setRefresh] = useState(false);
    const [highestId, setHighestId] = useState(0);
    const [lowestId, setLowestId] = useState(0);

    const refreshFn = () => {
        setRefresh(!refresh);
    };

    const fetchImages = async () => {
        const response = await fetch("/images");
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };

    const buttonHandler = async (id) => {
        const response = await fetch(`/moreimages/${id}.json`);
        const body = await response.json();
        if (response.status !== 200) {
            throw Error(body.message);
        }

        const moreObj = { ...imgData };
        body.data.forEach((element) => {
            moreObj.data.push(element);
            setLowestId(element.id);
        });
        setImgData(moreObj);
    };

    useEffect(() => {
        fetchImages()
            .then((response) => {
                if (!imgData) {
                    setImgData({ data: response.imgData });
                } else {
                    setImgData({ ...imgData, data: response.imgData });
                }
                setHighestId(response.imgData[0].id);
                setLowestId(response.imgData[response.imgData.length - 1].id);
            })
            .catch((err) => console.log("err", err));

        return () => {};
    }, [refresh]);

    return (
        <BrowserRouter>
            <HeaderF refreshFn={refreshFn} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ImagePreview
                            buttonHandler={buttonHandler}
                            lowestId={lowestId}
                            highestId={highestId}
                            imgData={imgData}
                            refresh={refresh}
                        />
                    }
                ></Route>
                <Route
                    path="/image/:imageId"
                    element={<ImageFocus highestId={highestId} />}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}
