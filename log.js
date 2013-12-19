/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 *	A very simple debug log file lib for Node.JS
 *
 *	Author: Paul Norwood <paul@greatdividetech.com>
 *
 *	The MIT License (MIT)
 *
 *	Copyright (c) 2013 Great Divide Technology <development@greatdividetech.com>
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in
 *	all copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE	
 *	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *	THE SOFTWARE. 
 *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/* private vars */
var fs = require("fs");
var util = require("util");
var dir, log;

/* private methods */
var setDir = function(p) {
	if (p) {
		dir = p;
	}
	else dir = __dirname+"/log";
        try {
                if(!fs.statSync(dir).isDirectory()) fs.mkdirSync(dir, 0600);
        } catch(e) {
                fs.mkdirSync(dir, 0600);
        }

	return;
};

var openLogFile = function () {
	if (!dir) setDir();
	try {
	        log = fs.createWriteStream(dir+"/debug.log", { flags: "a" });
	}
	catch(e) {
		throw "log:: "+e;
	}

        return;
};

var printDate = function() {
        var date = new Date();
        return (date.toISOString()+" ");
};


/* exported methods */
module.exports = new function() {

        this.debug = function() {
                if(log != null && log.writable === true) {
			var line = printDate() + util.format.apply(this, arguments) + "\n";
                        log.write(line);
                }
		return;
        };

	this.open = function() {
		(if !log) return openLogFile();
	};

	this.close = function() {
		return log.close();
	};

	this.path = function() {
		return setDir(arguments);
	};

	return openLogFile();
};
