const s3 = require("./s3");
const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const db = require("../db/db");
const { uploader } = require("./uploads");

app.use(express.json());

// create a GET route
app.get("/express_backend", (req, res) => {
    //Line 9
    res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
}); //Line 11

app.get("/test", (req, res) => {
    // db.test.then((data) => {
    //     console.log("dat a", data);
    // });
    db.test().then((data) => console.log("1", data));
    console.log("fetched");
    res.json({ dings: "fetched" });
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
        db.setImageData(url, username, title, description).then((data) => {
            const { rows } = data;
            res.json(rows);
        });
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

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// app.post("/upload.json", uploader.single("file"), s3.uploadS3, (req, res) => {
//     console.log("file", req.file);
//     console.log("input", req.body);
//     if (req.file) {
//         const { title, description, username } = req.body;
//         const { filename } = req.file;
//         const url =
//             "https://moses-imageboard.s3.eu-central-1.amazonaws.com/" +
//             filename;
//         console.log("upload something");
//         res.json({ success: true });
//     } else {
//         console.log("no upload something");
//         res.json({ success: false });
//     }
// });
