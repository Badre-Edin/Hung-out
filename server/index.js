const express = require("express");
const app = express();
const cors = require("cors");
const port =  1337;
const {trips} = require('../database/trips')
app.use(express.json());
app.use(cors());
app.use(express.static("./client/build"));
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");


//mongoose connection  
mongoose
  .connect("mongodb://localhost:27017/hung-out", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Hey u are connected To db....");
  })
  .catch((err) => {
    console.log(err);
  });

//test get
  app.get('/get', (req, res) =>{
    res.json("index")
});

//add data to database
  app.post('/get',(req,res)=>{
    const newTrips= new trips ({
      destination : req.body.destination,
      price : req.body.price,
      img : req.body.img
    })
    newTrips.save().then((data)=>{
      res.status(201).send(data)
    })
    .catch((err)=>{
      res.send(404).send(err)
    })
  })
// read data from database
app.get("/read", (req, res) => {
  trips.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
})
// delete data from database
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
 trips.findByIdAndRemove(id).exec()
  trips.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
//update data from database 
app.put("/update",  (req, res) => {
  const price= req.body.price
  const destination = req.body.destination;
  const img = req.body.img;
  const id= req.body._id
  console.log(req.body._id)
 const test=()=>{
    if (id===undefined){
      return {destination:destination}
    }else{
      return {_id:id}
    }
  }
  //using update one u can choose how to to search for element and then what to set into it 
 trips.updateOne(test(),{$set:{
  price:price,
  destination:destination,
  img:img

}},
//upset will check if the id doesn't already exist it will add new data to the database
{upsert:true},(err, result)=>{
  if (err){
    console.log(err);
  }else{
    console.log("updated successfully")
    res.json("Bravo")
  }
 } )
 
}
)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
