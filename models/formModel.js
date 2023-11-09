const mongoose = require("mongoose");

const formShema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    userId:{
        type:String,
        required: true,
    },
},{timestamps: true});

const FormModel = mongoose.model('form', formShema);

module.exports = FormModel;