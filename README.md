# markdown-it-embed-mathjax-highlight.js

Markdown-it with mathjax, and html5 video embed. 

Install: 

    // Install and save
    npm install markdown-it-embed-mathjax --save

Usage: 

    // include the lib.
    md = require('markdown-it-embed-mathjax');

    // Change options as you like (as in markdown-it), e.g.: 
    md.options.html = true;

    // Render a string
    var str = "<p>test</p># her er en test ![test](./test/test.mp4) $1 *2* 3$";
    console.log(md.render(str));

# markdown-it-embed-mathjax
