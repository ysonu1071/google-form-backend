const express = require("express");
const { saveFormStructure, getFormList, fetchDataForPreview, saveFormResponse, getFormResponse } = require("../controllers/formController");

const route = express.Router();

route.post("/save-structure", saveFormStructure)
route.get("/form-list", getFormList)
route.post("/fetchdata-for-preview", fetchDataForPreview)
route.post("/save-form-response", saveFormResponse)
route.post("/get-form-response", getFormResponse)


module.exports = route;