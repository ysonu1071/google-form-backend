const mongoose = require("mongoose");

const formFieldSchema = new mongoose.Schema({
    formId:{
        type:String,
        requried: true,
    },
    fields:[]
},{timestamps: true});

const formFieldsModel = mongoose.model("formField", formFieldSchema);

module.exports = formFieldsModel;