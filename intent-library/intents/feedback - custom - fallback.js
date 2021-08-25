
"use strict";

const { Suggestion } = require("dialogflow-fulfillment");
var db= require("../../helper/constants");

/**
* Default Welcome Intent controller
* @param {object} df webhook fulfillment object
* 
*/




const feedback_end = async (df) =>{
    df.setSynthesizeSpeech("Thank you for your patience and making our service better everyday")
    df.setSimpleResponses("Thank you for your patience and making our service better everyday")};

module.exports = feedback_end;