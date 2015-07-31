/* jshint strict: true, undef: true, unused: true, node: true */

'use strict';
/*
 * @author: 绝云
 * @description: utils
 */

var pastry = require('pastry'),
    each = pastry.each,
    hasValue = pastry.hasValue,
    json = pastry.json,
    lc = pastry.lc;

var fs = require('fs'),
    statSync = fs.statSync,
    writeFileSync = fs.writeFileSync;

var path = require('path'),
    join = path.join,
    extname = function(filename) {
        return lc(path.extname(filename).substr(1));
    };

// encoding {
    var charsetDetector = require('node-icu-charset-detector');

    var iconv = require('iconv-lite');

    function bufferToString(buffer) {
        var charset = charsetDetector.detectCharset(buffer).toString();
        try {
            return buffer.toString(charset);
        } catch(e) {
            //console.log(e);
        }
        try {
            return iconv.decode(buffer, charset);
        } catch(err) {
            console.log(err);
        }
    }

    function encodeFile(filename, encoding, targetFilename) {
        targetFilename = targetFilename || filename;
console.log(filename, encoding, targetFilename);
        var buffer = fs.readFileSync(filename);
        var bufferString = bufferToString(buffer);
        try {
            writeFileSync(targetFilename, iconv.encode(bufferString, encoding));
        } catch(e) {
            console.log(e);
        }
    }
// }

function walkFiles (path, processFile, excludeList) {
    excludeList = excludeList || [];

    var dirList = fs.readdirSync(path);
    var file;

    each(dirList, function(item){
        if (!hasValue(excludeList, item)) {
            file = join(path, item);

            if (statSync(file).isFile()){
                processFile(file);
            } else if (statSync(file).isDirectory()){
                walkFiles(file, processFile);
            }
        }
    });
}

function eachFile(path, processFile) {
    var dirList = fs.readdirSync(path);
    var file;

    each(dirList, function(item){
        file = join(path, item);

        if (statSync(file).isFile()){
            processFile(file);
        }
    });
}

function dump(data) {
    try {
        console.log(json.stringify(data, '\r\n', 4));
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    dump: dump,
    eachFile: eachFile,
    encodeFile: encodeFile,
    extname: extname,
    walkFiles: walkFiles
};

