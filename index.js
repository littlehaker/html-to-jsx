function convert(html) {
  return html
    .replace(/\sclass=/g, ' className=')
    .replace(/\sfor=/g, ' htmlFor=')
    .replace(/\sstyle="(.+?)"/g, function(attr, styles){
      var jsxStyles = new StyleParser(styles).toJSXString();
      return " style={{" + jsxStyles + "}}";
    })
}

module.exports = convert;

// Codes below are copied from Facebook's html to jsx module.

/**
 * Repeats a string a certain number of times.
 * Also: the future is bright and consists of native string repetition:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
 *
 * @param {string} string  String to repeat
 * @param {number} times   Number of times to repeat string. Integer.
 * @see http://jsperf.com/string-repeater/2
 */
function repeatString(string, times) {
  if (times === 1) {
    return string;
  }
  if (times < 0) { throw new Error(); }
  var repeated = '';
  while (times) {
    if (times & 1) {
      repeated += string;
    }
    if (times >>= 1) {
      string += string;
    }
  }
  return repeated;
}

/**
 * Determine if the string ends with the specified substring.
 *
 * @param {string} haystack String to search in
 * @param {string} needle   String to search for
 * @return {boolean}
 */
function endsWith(haystack, needle) {
  return haystack.slice(-needle.length) === needle;
}

/**
 * Trim the specified substring off the string. If the string does not end
 * with the specified substring, this is a no-op.
 *
 * @param {string} haystack String to search in
 * @param {string} needle   String to search for
 * @return {string}
 */
function trimEnd(haystack, needle) {
  return endsWith(haystack, needle)
    ? haystack.slice(0, -needle.length)
    : haystack;
}

/**
 * Convert a hyphenated string to camelCase.
 */
function hyphenToCamelCase(string) {
  return string.replace(/-(.)/g, function(match, chr) {
    return chr.toUpperCase();
  });
}

/**
 * Determines if the specified string consists entirely of whitespace.
 */
function isEmpty(string) {
   return !/[^\s]/.test(string);
}

/**
 * Determines if the specified string consists entirely of numeric characters.
 */
function isNumeric(input) {
  return input !== undefined
    && input !== null
    && (typeof input === 'number' || parseInt(input, 10) == input);
}

/**
 * Handles parsing of inline styles
 *
 * @param {string} rawStyle Raw style attribute
 * @constructor
 */
var StyleParser = function(rawStyle) {
  this.parse(rawStyle);
};
StyleParser.prototype = {
  /**
   * Parse the specified inline style attribute value
   * @param {string} rawStyle Raw style attribute
   */
  parse: function(rawStyle) {
    this.styles = {};
    rawStyle.split(';').forEach(function(style) {
      style = style.trim();
      var firstColon = style.indexOf(':');
      var key = style.substr(0, firstColon);
      var value = style.substr(firstColon + 1).trim();
      if (key !== '') {
        this.styles[key] = value;
      }
    }, this);
  },

  /**
   * Convert the style information represented by this parser into a JSX
   * string
   *
   * @return {string}
   */
  toJSXString: function() {
    var output = [];
    for (var key in this.styles) {
      if (!this.styles.hasOwnProperty(key)) {
        continue;
      }
      output.push(this.toJSXKey(key) + ': ' + this.toJSXValue(this.styles[key]));
    }
    return output.join(', ');
  },

  /**
   * Convert the CSS style key to a JSX style key
   *
   * @param {string} key CSS style key
   * @return {string} JSX style key
   */
  toJSXKey: function(key) {
    return hyphenToCamelCase(key);
  },

  /**
   * Convert the CSS style value to a JSX style value
   *
   * @param {string} value CSS style value
   * @return {string} JSX style value
   */
  toJSXValue: function(value) {
    if (isNumeric(value)) {
      // If numeric, no quotes
      return value;
    } else if (endsWith(value, 'px')) {
      // "500px" -> 500
      return trimEnd(value, 'px');
    } else {
      // Proably a string, wrap it in quotes
      return '\'' + value.replace(/'/g, '"') + '\'';
    }
  }
};
