const mongoose = require("mongoose")

const ChainSchema = new mongoose.Schema({
    address:{
        type:String,
        required:true,
    },
    balance:{
        type:String,
        required:true,
    }
})


const ChainData = mongoose.model("Chaindata",ChainSchema)

module.exports = ChainData