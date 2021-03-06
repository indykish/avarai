/**
 * Copyright 2013 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/* 
 * This is modified by Megam Systems.
 */

var events = require("./events");
var server = require("./server");
var nodes = require("./nodes");
var library = require("./library");
var log = require("./log");
var fs = require("fs");
var settings = null;
var credentials = require("./nodes/credentials");

var path = require('path');

process.env.NODE_VARAI_HOME = process.env.NODE_VARAI_HOME || path.resolve(__dirname+"/..");

var events = require("events");

var VARAI = {

    init: function(httpServer,userSettings) {
        settings = userSettings;
        
        var p = require(path.join(process.env.NODE_VARAI_HOME,"package.json"));
        if (fs.existsSync(path.join(process.env.NODE_VARAI_HOME,".git"))) {
            settings.version = p.version+".git";
        } else {
            settings.version = p.version;
        }
        
        server.init(httpServer,settings);
        library.init();
        return server.app;
    },
    
    start: server.start,
    stop: server.stop,
    nodes: nodes,
    library: library,
    credentials: credentials,
    events: events,
    log: log,
};

VARAI.__defineGetter__("app", function() { console.log("Deprecated use of VARAI.app - use VARAI.httpAdmin instead"); return server.app });
VARAI.__defineGetter__("httpAdmin", function() { return server.app });
VARAI.__defineGetter__("httpNode", function() { return server.nodeApp });
VARAI.__defineGetter__("server", function() { return server.server });
VARAI.__defineGetter__("settings", function() { return settings });

module.exports = VARAI;
