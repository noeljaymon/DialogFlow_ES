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
const{SynthesizeSpeech}=require("dialogflow-fulfillment");
var db= require("../../helper/constants");


/**
 * Default Welcome Intent controller
 * @param {object} df webhook fulfillment object
 */

const defaultWelcomeIntent = async (df) =>{
    // for telephony
    df.setSynthesizeSpeech("Hello i am a spotify bot,Do you want music recommendation or latest songs or help with playing spotify on tv,or to play spotify on bluetooth")
    // for df messenger integration
    df.setResponseText("Hello i am a spotify bot, please select your query below");
    // for actions on google
    df.setSimpleResponses("Hello i am a spotify bot, please select your query below")
    let payload={
        "richContent": [
          [
            {
              "type": "chips",
              "options": [
                {
                  "text": "Music Recommendation"
                },
                {
                  "text": "Latest music"
                },
                {
                  "text": "Play spotify on tv"
                }
              ]
            }
          ]
        ]
      }
      df.setPayload(payload)
//     df.setSuggestions({
//     "suggestions":["Music Recommendation","Play spotify On Bluetooth","Latest Songs"]
// })
};

module.exports = defaultWelcomeIntent;
