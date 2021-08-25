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
var db= require("../../helper/constants");
const validateOption = require("../../helper/validate_query")

/**
 * Default Welcome Intent controller
 * @param {object} df webhook fulfillment object
 */

const getGenre = async (df) =>{
    /* EXAMPLE OF HELPER FUNCTION WHICH CAN BE USED TO MAKE TEST CASES
    const param=df._request.queryResult.queryText;
    const test_answer=validateOption(param);*/
    
    df.setSynthesizeSpeech("Could you please choose one of Pop,Rock,Jazz,Blues or Heavy Metal")
    df.setSimpleResponses("Of course,could you  please choose one of the Genre below");
    df.setSuggestions({"suggestions":["pop","rock","jazz","blues","heavy metal"]})
};

module.exports = getGenre;
