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
//const dff=require('dialogflow-fulfillment');

/**
 * Default Welcome Intent controller
 * @param {object} df webhook fulfillment object
 */
const latest_song = async (df) =>{
    df.setSynthesizeSpeech("Could you please choose one of Pop,Rock,Jazz,Blues or Heavy Metal");
    df.setSimpleResponses("Please choose from one of the genres below")
    df.setSuggestions({
        "suggestions": ["Pop", "Rock","Blues","Heavy Metal","Jazz"]
    })
    
    
};


module.exports = latest_song;