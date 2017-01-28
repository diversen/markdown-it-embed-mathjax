#!/usr/bin/env node

// Minimist opts for arguments
var opts = [];
opts.boolean = ['help','h', 'html', 'xhtmlOut', 'breaks', 'linkify', 'typographer','decorate', 'embed', 'mathjax'];
opts.string = ['langPrefix', 'quotes'];

var m = require('minimist-mini')(opts);
var fs = require('fs');
var path = require('path');


var mdOptions = {
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
};

var md = require('markdown-it')(
    mdOptions
);

if (m.get('help') || m.get('h')) {
    m.helpMessage();
    process.exit(0);
}

// Set mode option
var mode = m.get('mode');
if (!mode) {
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


// All boolean opts
opts.boolean.forEach( function (element) {
    //console.log(element);
    md.options[element] = m.get(element);
});

var langPrefix = m.get('langPrefix');
if (langPrefix) {
    md.options[langPrefix] = langPrefix;
}

var langPrefix = m.get('langPrefix');
if (langPrefix) {
    md.options[langPrefix] = langPrefix;
}

var quotes = m.get('quotes');
if (quotes) {
    md.options[quotes] = quotes;
}

if (m.get('embed')) {
    enableEmbed();
}

if (m.get('decorate')) {
    enableDecorate();
}

if (m.get('mathjax')) {
    enableMathjax();
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


var files = m.get('_');
if (files.length == 0) {
    readStdin();
} else {
    readFiles(files);
}

