# markdown-it-embed-mathjax

Markdown-it with mathjax, and html5 video embed

[Video embed](https://www.npmjs.com/package/markdown-it-html5-embed)

[Mathjax](https://www.npmjs.com/package/markdown-it-mathjax)

[Decorate](https://github.com/rstacruz/markdown-it-decorate) 

# Install: 

    // Install and save
    npm install markdown-it-embed-mathjax --save

# Usage as lib: 

    // include the lib.
    md = require('markdown-it-embed-mathjax');

    // Change markdown-it default options as you like, e.g.: 
    md.options.html = true;

    // Render a string
    var str = "<p>test</p># her er en test ![test](./test/test.mp4) $1 *2* 3$";
    str+="\n\nPara with a CSS class{my-class}";
    console.log(md.render(str));

# Usage as CLI command

    npm install -g markdown-it-embed-mathjax

Translate a string to a markdown-it rendered string (with option for CSS classes, mp4 embedding and mathjax): 
Reads from stdin or file(s), and outputs to stdout. 

Example with stdin from a shell: 

    echo "A test with a auto link: http://github.com/diversen"  | markdown-it-embed-mathjax --linkify

Example with file(s): 
     
    markdown-it-embed-mathjax-bin README.md --linkify --html --breaks

Options are the same as markdown-it options:

    opts.boolean = ['help', 'html', 'xhtmlOut', 'breaks', 'linkify', 'typographer','decorate', 'embed', 'mathjax'];
    opts.string = ['langPrefix', 'quotes'];

Video (like images):

    ![video test](http://techslides.com/demos/sample-videos/small.mp4)

Mathjax: 

    $1 *2* 3$

@ MIT

