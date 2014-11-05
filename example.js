var convert = require('./index');

var html_str = '<div class="foo" style="color: red;"><label for="input"></label><input id="input" /><span>{this.state.value}</span></div>';

var jsx_str = convert(html_str);

console.log(jsx_str);
