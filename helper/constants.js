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

/**
 * Application Constants to be defined here
 */
var admin = require("firebase-admin");



var serviceAccount = require('../../newagent-l9dp-firebase-adminsdk-jbzug-16a205f622.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    
  });
var database=admin.firestore();

module.exports = database;