const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const Chaindata = require("./model")


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

mongoose.Promise = global.Promise;
let connection = mongoose.connect("mongodb+srv://root:root@cluster0.kfdaeof.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
}).then((res) => {
    console.log('database connected')
}).catch(err => {
    console.log('Could not connect to the database. Error...', err);
    process.exit();
});


app.post("/updatedb",async (req,res)=>{
  console.log("running update db")

  console.log(req.body);
 
      let myobj = {
        address: req.body.address,
        balance: req.body.balance,
      };
      console.log("myobj",myobj);

      const data1 = await Chaindata.find({address:req.body.address})

      if(data1.length){
        const data = await Chaindata.updateOne({address:req.body.address},{balance:req.body.balance})
        console.log("data",data);
      }else{
        const data = await Chaindata.create(myobj);
        console.log("data",data);
      }
        res.json({"message": "Server is running :D",data1});

})


app.delete('/delete',async (req, res) => {
  console.log('running delete')
  console.log(req.body.id);
   const data = await Chaindata.deleteOne(req.body.id);
   console.log("data",data);
   res.json({"message": "record deleted"});

});
let PORT = 8080

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

