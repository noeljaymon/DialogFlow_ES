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
 */

const feedback_reject = async (df) =>{
    df.setSynthesizeSpeech("Thats alright, do you want  music recommendation or latest songs or help with playing spotify on tv or to play spotify on bluetooth or exit")
    df.setSimpleResponses("No problem.Please select next  query  below.")
      
    df.setSuggestions({
    "suggestions":["music recommendation","How can i play spotify on Tv","How to play spotify on bluetooth","Latest songs","exit"]})
    if(df._request.queryResult.action=='smalltalk.confirmation.cancel'){
        df.setSimpleResponses("Its sad to see you exit.Bye!");

    }
     
};

module.exports = feedback_reject;
