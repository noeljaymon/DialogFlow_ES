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
 * 
 */

function recommend(df){

    var genre= df.getContext("song_name").parameters.musictype;
   
    return db.collection('Spotify').where('genre','==',genre).orderBy('views','desc').limit(4).get().then((snapshot)=>{
    let music_arr =[];
    let view_arr=[];
    snapshot.forEach((doc)=>{
        var song= df._request.queryResult.queryText;
        console.log(song);
        const music=doc.data().songName;
        const view=doc.data().views;
        if(music!=song){
            music_arr.push(music);
            view_arr.push(view)
        }
    }); 
        df.setSynthesizeSpeech(`Recommendations are ${music_arr} with ${view_arr} views respectively.If all your queries are answered, would you be interested to provide feedback`);
        df.setSimpleResponses(`Recommendations are ${music_arr} with ${view_arr} views respectively`);
        df.setSimpleResponses('If all your queries are answered, would you be interested to provide feedback');
        df.setSuggestions({

            "suggestions":["Yes","No"]
        })
    });
    

};

module.exports = recommend;