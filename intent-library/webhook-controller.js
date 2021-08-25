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

const dialogflowFullfillment = require("dialogflow-fulfillment-builder");
const config = require("./../config")();
var db= require("./../helper/constants");
const intentMapper = require("./intent-mapper");
var admin = require("firebase-admin");

/**
 * Dialogflow fullfillment controller
 * @param {object} req http request 
 * @param {object} res http response
 * @param {function} next invokes the succeeding middleware/function
 
 */


module.exports = async (req, res, next) => {
    try {
        const requestIntent = req.body.queryResult.intent.displayName;
        let fulfillment = new dialogflowFullfillment(config.fullfillmentConfig, req.body);
        console.log("###### this is fulfilment#######")
        console.log(fulfillment);
        console.log("###### End fulfilment#######")

        if (intentMapper[requestIntent]) {
            await intentMapper[requestIntent](fulfillment);
        } else if(req.body.queryResult.action=='smalltalk.confirmation.cancel') {
            req.body.setSimpleResponses("Its sad to see you exit.Bye!- boilerplate");
            
        }
        else{
            const requiredIntent = getIntent(requestIntent);
            await require(requiredIntent)(fulfillment);}
            
        let result = fulfillment.getCompiledResponse();
        
        let querytext=req.body.queryResult.queryText;
        let source= req.body.originalDetectIntentRequest.source
        console.log(source);
        let temp=req.body.session
        let sess=temp.split("/");
        let sess_id=sess[4];
        console.log(sess_id);
        const reF=db.collection('chat-logs').doc(sess_id);
        for(let i=0;i<result.fulfillmentMessages.length;i++){
            switch(source){
                case 'google':
                    switch(result.fulfillmentMessages[i].simpleResponses){
                        case undefined:
                            break;
                        default:
                            if (result.fulfillmentMessages[i].platform=='ACTIONS_ON_GOOGLE'){
                                let data={
                            
                                    platform:'ACTIONS_ON_GOOGLE',
                                    userquery:querytext,
                                    botanswer:result.fulfillmentMessages[i].simpleResponses.simpleResponses[0].displayText,
                                    time:admin.firestore.FieldValue.serverTimestamp()
                                    }
        
                                    reF.collection('messages').doc().set(data);
                               
        
                            }
                        }
                    break;   

                case 'GOOGLE_TELEPHONY':
                    if (result.fulfillmentMessages[i].platform=='TELEPHONY'){
                        let data1={
                        
                            platform:'TELEPHONY',
                            userquery:querytext,
                            botanswer:result.fulfillmentMessages[i].telephonySynthesizeSpeech.ssml,
                            time:admin.firestore.FieldValue.serverTimestamp()
                            }
                            reF.collection('messages').doc().set(data1);

                    }
                    else{
                        
                        break;

                    }
                   
                    

            }
        };
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getIntent = (name) => {
    let file = name.toLowerCase();
    file = file.replace(/ +/g, "-");
    return `./intents/${file}`;
};