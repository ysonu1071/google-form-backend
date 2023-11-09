const jwt = require("jsonwebtoken");
const FormModel = require("../models/formModel");
const FormFieldsModel = require("../models/fromFieldsModel")
const FormResponseModle = require("../models/formResponse");

const saveFormStructure = async(req, res) => {
    let token = req.header("Authorization");
    token = token.split(" ")[1];

    const {form, questions} = req.body;
        
    try {
        let tokenData = jwt.verify(token, process.env["SECRET_KEY"]);
        let userId = tokenData.id;

        let formInfo =  await FormModel.create({userId, title:form.title, description: form.description});

        let fieldInfo = await FormFieldsModel.create({formId:formInfo._id, fields:questions });

     
        return res.status(201).json({status:"success", message:"Form created", formInfo:formInfo, fieldsInfo:fieldInfo})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({status:"fail", message:error.message});
    }
}


const getFormList = async(req, res) => {
    let token = req.header("Authorization");
    token = token.split(" ")[1];

    try {
        let userData = jwt.verify(token, process.env["SECRET_KEY"]);
        let userId = userData.id;

        let formList = await FormModel.find({userId});
        console.log(formList);
        return res.status(200).json({status:"success", message:"Form list fatched", formList:formList});

    } catch (error) {
        console.log(error.message);
        res.status(500).json({status:"fail", message:error.message});
    }
}


const fetchDataForPreview = async(req, res) => {
    const {formId} = req.body;

    try {
        let formInfo = await FormModel.find({_id: formId});
        let fieldsInfo = await FormFieldsModel.find({formId: formId});

        return res.status(201).json({status:"success", message:"Form detail fteched", formInfo:formInfo, fieldsInfo:fieldsInfo})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({status:"fail", message:error.message});
    }
}


const saveFormResponse = async(req, res) => {
    const {formId, fieldsAnswer} = req.body;
    console.log("form response is: ", {formId, fieldsAnswer});

    try {
        let formResponse = await FormResponseModle.find({formId});

        if(formResponse.length == 0){
           let createdResponse = await FormResponseModle.create({formId, responseData:[fieldsAnswer]})
           console.log("created ", createdResponse);
        }else{
            let updatedResponse = await FormResponseModle.updateOne({formId}, {$push: {responseData: fieldsAnswer}});
           console.log("updated ",updatedResponse);

        }

        let responseData = await FormResponseModle.find({formId});
        console.log("res data is: ", responseData);

        return res.status(200).json({status:"success", message:"Response saved", responseData})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({status:"fail", message:error.message});
    }
}


const getFormResponse = async(req, res) => {
    const {formId} = req.body;

    try {
        let responseData = await FormResponseModle.find({formId});

        return res.status(200).json({status:"success", message:"Response fateched", responseData:responseData})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({status:"fail", message:error.message});
    }
}

module.exports = {saveFormStructure, getFormList, fetchDataForPreview, saveFormResponse, getFormResponse};