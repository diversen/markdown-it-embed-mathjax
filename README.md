# markdown-it-embed-mathjax.js

Markdown-it with mathjax, and html5 video embed

[Video embed](https://www.npmjs.com/package/markdown-it-html5-embed)

[CSS classes](https://github.com/andrey-p/markdown-it-classy)

[Mathjax](https://www.npmjs.com/package/markdown-it-mathjax)

Install: 

    // Install and save
    npm install markdown-it-embed-mathjax --save

Usage: 

    // include the lib.
    md = require('markdown-it-embed-mathjax');

    // Change markdown-it default options as you like, e.g.: 
    md.options.html = true;

    // Render a string
    var str = "<p>test</p># her er en test ![test](./test/test.mp4) $1 *2* 3$";
    str+="\n\nPara with a CSS class{my-class}";
    console.log(md.render(str));

