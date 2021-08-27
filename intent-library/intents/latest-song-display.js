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
function latest_song_display(df){
    let latest_genre=df.getContext('latest_genre').parameters['latest-genre'] ;
    return db.collection("Spotify").where('genre','==',latest_genre).limit(4).get().then((snapshot)=>{
        let genre_arr =[];
        let genre_link=[];
        
        snapshot.forEach((doc)=>{
          
            const song=doc.data().songName;
            const link=doc.data().link;
            // pushing in uppercase so that the response looks better
            genre_arr.push(song.toUpperCase());
            genre_link.push(link);
        })
            
      
        df.setSynthesizeSpeech(`The Top 4 latest song in ${latest_genre} are 1) ${genre_arr[0]},2)${genre_arr[1]},3)${genre_arr[2]},4)${genre_arr[3]}`)
        df.setSynthesizeSpeech(`If all your queries are done would you like to provide us with your valuable feedback?`);
        if (df._request.originalDetectIntentRequest.source === "telegram") {
            df.setPayload({
                "telegram": {
                  "text": ` The Top 4 latest song in *${latest_genre}* music are \n 1)[${genre_arr[0]}](${genre_link[0]}). \n 2)[${genre_arr[1]}](${genre_link[1]})\n 3)[${genre_arr[2]}](${genre_link[2]})\n 4)[${genre_arr[3]}](${genre_link[3]})`,
                  "parse_mode": "Markdown"
                }
              })
            df.setPayload({
                "telegram": {
                    "reply_markup": {
                        "inline_keyboard": [
                            [
                                {
                                    "callback_data": "yes",
                                    "text": "Yes"
                                }
                            ],
                            [
                                {
                                    "callback_data": "no",
                                    "text": "No"
                                }
                            ]
                        ]
                    },
                    "text": "If all your queries are answered, would you be interested to provide feedback"
                }
            })
        }
        else if (df._request.originalDetectIntentRequest.source === "google") {
            df.setSimpleResponses(`The Top 4 latest song in ${latest_genre} are`) ;
            df.setSimpleResponses(`1) ${genre_arr[0]},link: ${genre_link[0]}\n 2)${genre_arr[1]},link: ${genre_link[1]}\n 3) ${genre_arr[2]},link: ${genre_link[2]}\n 4) ${genre_arr[3]},link: ${genre_link[3]}`);
            df.setSimpleResponses("If all your queries are done would you like to provide us with your valuable feedback?") ;
            df.setSuggestions({"suggestions":["Yes","No"]})
        }else{
            df.setResponseText(`The Top 4 latest song in ${latest_genre} are`)
            df.setResponseText(`1) ${genre_arr[0]},link: ${genre_link[0]}\n`)
            df.setResponseText(`2)${genre_arr[1]},link: ${genre_link[1]}\n`)
            df.setResponseText(`3) ${genre_arr[2]},link: ${genre_link[2]}\n`)
            df.setResponseText(`4) ${genre_arr[3]},link: ${genre_link[3]}`)

            df.setPayload({
                "richContent": [
                  [
                    {
                      "options": [
                        {
                          "text": "Yes"
                        },
                        {
                          "text": "No"
                        }
                      ],
                      "type": "chips"
                    }
                  ]
                ]
              })
        }
    });
}


module.exports = latest_song_display;