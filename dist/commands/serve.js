"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var path_1 = __importDefault(require("path"));
var commander_1 = require("commander");
var local_api_1 = require("@cloudcodejs/local-api");
/**
 * crucial, (endUserConsumer === production) || (undefined === "development")
 */
var isProduction = process.env.NODE === "production";
exports.serveCommand = new commander_1.Command()
    // [square-brckets-optional]
    .command("serve [filename]")
    .description("Open a file for editing")
    //
    .option(
//input cli options|flags
"-p, --port <number>", 
// <angle brckets> REQUIERED
"port to run server on", 
//default
"4005")
    .action(function (filename, options) {
    if (filename === void 0) { filename = "notebook.js"; }
    try {
        // allows user to specific paths to filename as well as filename
        //eg notes/my-js-notes.js
        var dir = path_1.default.join(process.cwd(), path_1.default.dirname(filename));
        // console.log(filename, options);
        (0, local_api_1.serve)(parseInt(options.port), path_1.default.basename(filename), dir, !isProduction);
        console.log("Opened " + filename + ".\n Navigate to http://localhost:" + options.port + " to edit the file ");
    }
    catch (error) {
        if (error.code === "EADDRINUSE")
            console.log("Port:" + options.port + " is in use, try another port. \n -p || --port " + (options.port + 1) + " ");
        //
        else
            console.log("here is the error", error.message);
        // force exit
        process.exit(1);
    }
});
