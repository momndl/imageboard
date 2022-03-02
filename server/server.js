const s3 = require("./s3");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("../db/db");
const { uploader } = require("./uploads");

app.use(express.json());

app.get("/express_backend", (req, res) => {
    res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
});

app.post("/upload", uploader.single("file"), s3.uploadS3, (req, res) => {
    if (req.file) {
        const { title, description, username } = req.body;
        const { filename } = req.file;
        console.log(
            "title ",
            title,
            "| description ",
            description,
            "| username ",
            username
        );
        console.log("filename ", filename);
        const url =
            "https://moses-imageboard.s3.eu-central-1.amazonaws.com/" +
            filename;
        db.setImageData(url, username, title, description)
            .then((data) => {
                const { rows } = data;
                res.json({ success: true, imgData: rows });
            })
            .catch((err) => console.log("error in upload", err));
    } else {
        res.json({ success: false });
    }
});

app.get("/images", (req, res) => {
    db.getImagesAll().then((response) => {
        const { rows } = response;
        res.json({ success: true, imgData: rows });
    });
});

app.get("/image/:id.json", (req, res) => {
    const { id } = req.params;

    db.getImageDataById(id)
        .then((respose) => {
            const { rows } = respose;
            res.json({ success: true, imageData: rows });
        })
        .catch((error) => {
            console.log("error in image at  /image/:id.json", error);
            res.json({ success: false });
        });
});

app.get("/image/comments/:id.json", (req, res) => {
    const { id } = req.params;

    db.getComments(id)
        .then((respose) => {
            const { rows } = respose;
            res.json({ success: true, commentData: rows });
        })
        .catch((error) => {
            console.log(
                "error in comments at  /image/comments/:id.json ",
                error
            );
            res.json({ success: false });
        });
});

app.post("/addcomment", (req, res) => {
    const { username, comment, id } = req.body;
    console.log("input", username, comment, id);
    db.setCommentData(id, username, comment)
        .then((data) => {
            const { rows } = data;
            res.json({ success: true, commentData: rows });
        })
        .catch((err) => console.log("error in upload", err));
});

app.get("/moreimages/:id.json", (req, res) => {
    const { id } = req.params;
    db.getMore(id)
        .then((respose) => {
            const { rows } = respose;
            res.json({ success: true, data: rows });
        })
        .catch((error) => {
            console.log("error in moreimages at  /moreimages/:id.json ", error);
            res.json({ success: false });
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
