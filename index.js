'use strict';

var markdownitHTML5Embed = require ('markdown-it-html5-embed');

// Markdown-it
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
    quotes: '“”‘’'
    
});

// Use html5embed for videos
md.use(markdownitHTML5Embed, {
    html5embed: {
        useImageSyntax: true, // Enables video/audio embed with ![]() syntax (default) 
            // useLinkSyntax: true,   // Enables video/audio embed with []() syntax
            attributes: {
                'audio': 'width="100%" controls class="audioplayer"',
                'video': 'width="100%" class="audioplayer" controls'
            }
        }
    }
);

// MathJax
md.use(require('markdown-it-mathjax'));

// Classy 
md.use(require('markdown-it-classy'));

// Decorate markdown-it-decorate
md.use(require('markdown-it-decorate'));

// Export
module.exports= md;

