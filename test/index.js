var convert = require('../index');
var assert = require('assert');

describe('html attributes', function() {
    it('class should be repleaced with className', function() {
        assert.equal('<div className="foobar"></div>', convert('<div class="foobar"></div>'));
    });

    it('for should be repleaced with htmlFor', function() {
        assert.equal('<label htmlFor="foobar"></label>', convert('<label for="foobar"></label>'));
    });
});

describe('inline-style', function() {
    it('should be repleaced with js object', function() {
        assert.equal('<div style={{marginTop: 10}}></div>', convert('<div style="margin-top: 10px"></div>'));
    });
});
