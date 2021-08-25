/**
 * Copyright 2020 Quantiphi, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

const { Suggestion } = require("dialogflow-fulfillment");
var db= require("../../helper/constants");

/**
 * Default Welcome Intent controller
 * @param {object} df webhook fulfillment object
 * 
 */




const feedback = async (df) =>{
    df.setSynthesizeSpeech("You can rate me between 1 to 5")
    df.setSimpleResponses("You can rate me between 1 to 5")
    df.setSuggestions({
    "suggestions":["1","2","3","4","5"]
})};

module.exports = feedback;
