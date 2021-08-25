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

function feedback_custom(df){
    const score=df.getContext('feedback-custom-followup').parameters;
    if(score.rating){
        
        df.setSynthesizeSpeech(`Thank you for your honest feedback of ${score.rating} star rating. Could you tell us what went wrong and how can we improve it?`)
        df.setSimpleResponses(`Thank you for your honest feedback of ${score.rating} star rating. Could you tell us what went wrong and how can we improve it?`);
    }
    else if (score.good)
    {
        df.setSynthesizeSpeech(`Feels good to receive  ${score.good} star rating. Could you tell us what went well for you.`);
        df.setSimpleResponses(`Feels good to receive  ${score.good} star rating. Could you tell us what went well for you.`);

    }
    else
    {
        df.setSynthesizeSpeech(`${score.number} is not a valid rating. Please provide a rating between 1 to 5 `);
        df.setSimpleResponses(`${score.number} is not a valid rating. Please provide a rating between 1-5 `);

    }

};




module.exports = feedback_custom;
