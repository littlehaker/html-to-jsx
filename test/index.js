var convert = require('../index');
var assert = require('assert');

describe('html attributes', function() {
    it('class should be repleaced with className', function() {
        assert.equal(convert('<div class="foobar"></div>'), '<div className="foobar"></div>');
    });

    it('for should be repleaced with htmlFor', function() {
        assert.equal(convert('<label for="foobar"></label>'), '<label htmlFor="foobar"></label>');
    });

    it('attributes should be camelCased', function() {
        assert.equal(convert('<input type="text" maxlength="10" minlength="0"/>'), '<input type="text" maxLength="10" minLength="0"/>');
    });
});

describe('html tags', function() {
    it('should have root element', function() {
        assert.equal(convert('<div>foo</div><div>bar</div>'), '<div><div>foo</div><div>bar</div></div>');
    })

    it('should have backslash', function() {
        assert.equal(convert('<div><br><hr><img src=""><input type="text"><a>foo</a></div>'), '<div><br/><hr/><img src=""/><input type="text"/><a>foo</a></div>');
    });
});

describe('comments', function() {
    it('should be replaced to jsx comment', function() {
        assert.equal(convert('<!-- this is a comment -->'), '{/* this is a comment */}');
    });
});

describe('inline-style', function() {
    it('should be repleaced with js object', function() {
        assert.equal(convert('<div style="line-height: 49px; margin: 1px 0 2px;"></div>'), '<div style={{lineHeight: \'49px\', margin: \'1px 0 2px\'}}></div>');
    });
});
