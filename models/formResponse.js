const mongoose = require("mongoose");


const formResponseSchema = new mongoose.Schema({
    formId:{
        type:String,
        required: true
    },
    responseData: [],
},{timestamps: true});


const FormResponseModle = mongoose.model("formresponse", formResponseSchema);

module.exports = FormResponseModle;