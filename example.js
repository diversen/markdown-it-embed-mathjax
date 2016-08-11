md = require('./index');

// Change markdown-it default options as you like, e.g.: 
md.options.html = true;

// Render a string
var str = "<p>test</p># her er en test ![test](./test/test.mp4) $1 *2* 3$";
str+="\n\nPara with a CSS class{my-class}";
str+="\n\nPara with a CSS class in a comment<!--{comment-class}-->";
console.log(md.render(str));

