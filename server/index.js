const express = require("express");
const trips = require("../database/trips")
const app = express();

const port =  1337;
app.use(express.json());
app.use(express.static("./client/build"));
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");


//mongoose connection  
mongoose
  .connect("mongodb+srv://team123:team123@oneforall.sgmqhhk.mongodb.net/trips?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Hey u are connected To db....");
  })
  .catch((err) => {
    console.log("Cannot connect to DB");
  });

  app.get('/get', (req, res) =>{
    res.json("index")
});

app.get("/read", (req, res) => {
  trips.trips.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
