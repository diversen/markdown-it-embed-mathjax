md = require('./index');

// Change markdown-it default options as you like, e.g.: 
md.options.html = false;

// Render a string
var str = "<p>test</p>\n\n";
str+="# her er en test\n\n";
str+= "![test](./test/test.mp4)\n\n";
str+= "$1 *2* 3$\n\n";
str+="Para with a CSS class{my-class}\n\n";
str+="Para with a CSS class in a comment<!--{comment-class}-->\n\n";
console.log(md.render(str));

