const express = require("express"); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const db = require("../db/db");

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

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
    res.send("fetched");
});