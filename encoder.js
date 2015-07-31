#!/usr/bin/env node
/* jshint strict: true, undef: true, unused: true, node: true */

'use strict';
/*
 * @author: 绝云
 * @description: utils
 */


var pastry = require('pastry'),
    hasValue = pastry.hasValue,
    isArray = pastry.isArray;

var utils = require('./utils'),
    dump = utils.dump,
    eachFile = utils.eachFile,
    encodeFile = utils.encodeFile,
    extname = utils.extname,
    walkFiles = utils.walkFiles;

var pkg = require('./package.json');

var argv = require('minimist')(process.argv.slice(2), {
    default: {
        directory: null,
        encoding: 'utf8',
        exclude: null,
        extname: null,
        file: null,
        recursively: false,
        target: null,
    },
    alias: {
        d: 'directory',
        e: 'encoding',
        f: 'file',
        h: 'help',
        r: 'recursion',
        t: 'target',
        v: 'version',
    }
});

if (argv.exclude) {
    argv.exclude = isArray(argv.exclude) ? argv.exclude : [argv.exclude];
}
if (argv.extname) {
    argv.extname = isArray(argv.extname) ? argv.extname : [argv.extname];
}

function printHelpInfo() {
    dump({
        name: pkg.name,
        description: pkg.description,
        version: pkg.version,
        usage: pkg.usage,
        options: {
            '--directory(-d)': 'specify directory',
            '--encoding(-e)': 'specify target encoding (default: utf8)',
            '--file(-f)': 'specify a target file',
            '--help(-h)': 'print this help message',
            '--recursively(-r)': 'if encode all files recursively',
            '--target(-t)': 'specify a target filename',
            '--version(-v)': 'print current version of this script',
            '--exclude': 'specify an exclude list, for example: --exclude node_modules --exclude test',
            '--extname': 'specify an extnames filter list, for example: --extname js --extname css'
        }
    });
}
function processFile(filename, targetFilename) {
    if (argv.extname) {
        var fileExt = extname(filename);
        if (hasValue(argv.extname, fileExt)) {
            encodeFile(filename, argv.encoding, targetFilename);
        }
    } else {
        encodeFile(filename, argv.encoding, targetFilename);
    }
}

if (argv.version) {
    dump({
        version: pkg.version
    });
} else if (argv.help || (!argv.file && !argv.directory)) {
    printHelpInfo();
} else {
    if (argv.file) {
        processFile(argv.file, argv.target);
    }
    if (argv.directory) {
        if (argv.recursively) {
            walkFiles(argv.directory, processFile, argv.exclude);
        } else {
            eachFile(argv.directory, processFile);
        }
    }
}

