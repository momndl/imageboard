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
    console.log("file", req.file);
    console.log("input", req.body);
    if (req.file) {
        const { title, description, username } = req.body;
        const { filename } = req.file;
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
        console.log("no upload something");
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
    console.log("this i want to see", id);
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

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6
