import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function ImageFocus(props) {
    const { imageId } = useParams();
    const [imageData, setImageData] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const highestId = props.highestId;
    useEffect(() => {
        console.log("navigate:", navigate);
        fetch(`${imageId}.json`)
            .then((res) => res.json())
            .then((imageRes) => {
                console.log("data after fetch focus: ", imageRes);
                setImageData(imageRes);
            })
            .catch((err) => console.log(err));
    }, [location]);
    function prevNext(prevornext, id) {
        if (prevornext === "prev") {
            if (id === 1) {
                return;
            } else {
                navigate(`/image/${id - 1}`);
            }
        } else if (prevornext === "next") {
            if (id === highestId) {
                return;
            } else {
                navigate(`/image/${id + 1}`);
            }
        }
    }
    return (
        <div
            className="modalBg"
            onClick={() => {
                console.log("reactivate me pls");
                // navigate(-1);
            }}
        >
            {imageData ? (
                <div className="modalMain">
                    <img
                        className="modalImg"
                        src={imageData.imageData[0].url}
                        alt={imageData.imageData[0].title}
                    ></img>
                    <p className="modalTitle">{imageData.imageData[0].title}</p>
                    <p className="modalDescription">
                        {imageData.imageData[0].description}
                    </p>
                    <p className="modalUsername">
                        uploaded by: {imageData.imageData[0].username}
                    </p>
                    <p className="modalDate">
                        uploaded at: {imageData.imageData[0].posted}
                    </p>
                    <span className="modalDeleteImage">Delete</span>
                    <span
                        onClick={() =>
                            prevNext("prev", imageData.imageData[0].id)
                        }
                    >
                        prev
                    </span>{" "}
                    <span
                        onClick={() =>
                            prevNext("next", imageData.imageData[0].id)
                        }
                    >
                        next
                    </span>
                </div>
            ) : (
                <div>
                    {" "}
                    <h1>loading image...</h1>{" "}
                </div>
            )}
        </div>
    );
}
