#!/usr/bin/env node

// Minimist opts for arguments
var opts = [];
opts.boolean = ['help', 'html', 'xhtmlOut', 'breaks', 'linkify', 'typographer','decorate', 'embed', 'mathjax'];
opts.string = ['langPrefix', 'quotes'];
var argv = require('minimist')(process.argv.slice(2), opts);
var fs = require('fs');
var path = require('path');

// var md = require('markdown-it')();

var md = require('markdown-it')({
    //highlight: highlighter, 
    html: false, // Enable HTML tags in source
    xhtmlOut: true, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: false, // Convert '\n' in paragraphs into <br>
    // langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify: true, // Autoconvert URL-like text to links
    langPrefix: '',
    // Enable some language-neutral replacement + quotes beautification
    typographer: false,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',
    embed: false,
    decorate: false,
    mathjax: false
    
});


// Get value from object and key
var getValFromKey = function (key, obj) {
    if (obj.hasOwnProperty(key)) {
        return obj[key];
    }
    return undefined;
}

if (getValFromKey ('help', argv)) {
    // console.log(__filename);
    // Current dir
    var dirname = path.dirname(__filename);
    var help = fs.readFileSync(dirname + '/README.md', {encoding: 'utf8'});
    console.log(help);
    process.exit(0);
}

// Set mode option
var mode = getValFromKey('mode', argv);
if (mode == undefined ) {
    mode = 'default';
}

function enableEmbed() {
    // Use html5embed for videos
    var markdownitHTML5Embed = require('markdown-it-html5-embed');

    var options = {

        html5embed: {
            useImageSyntax: true, // Enables video/audio embed with ![]() syntax (default) 
            // useLinkSyntax: true,   // Enables video/audio embed with []() syntax
            attributes: {
                'audio': 'width="100%" controls class="audioplayer"',
                'video': 'width="100%" class="audioplayer" controls'
            }
        }
    }
    md.use(markdownitHTML5Embed, options);
}

function enableMathjax () {
    md.use(require('markdown-it-mathjax'));
}

function enableDecorate () {
    md.use(require('markdown-it-decorate'));
}

// Set markdown otions
for (key in md.options) {
    var argvVal = getValFromKey(key, argv);
    if (argvVal === undefined) {
        // Do nothing
    } else {
        md.options[key] = argvVal;
	
        
        if (key == 'embed' && argvVal != false) {
	    enableEmbed();
	}
        if (key == 'decorate' && argvVal != false) {
	    enableDecorate();
	}
        if (key == 'mathjax' && argvVal != false) {
	    enableMathjax();
	}
    }
}

// StdIn
var readStdin = function () {
    var getStdin = require('get-stdin');
    getStdin().then(str => {
        console.log(md.render(str));
        process.exit(0);
    });
}

// From files
var readFiles = function (files) {
    var str = '';
    for (file in files) {
        str+= fs.readFileSync(files[file], {encoding: 'utf8'});
    }
    console.log(md.render(str));
    process.exit(0);
}


var files = getValFromKey('_', argv);
if (files.length == 0) {
    readStdin();
} else {
    readFiles(files);
}

