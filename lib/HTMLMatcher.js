/**
 * @Create idler.zhu(zqc.sunny@aliyun.com)
 * @CreateDate  2018/1/20
 */
const Parser = require('fastparse');
const typeis = require('typeis');

const defaultMatchAttributes = ['img:src', 'img:srcset', 'img:data-src', 'script:src', 'link:href'];

/**
 * parser match process
 * @param match
 * @param strUntilValue
 * @param name
 * @param value
 * @param index
 */
const processMatch = function (match, strUntilValue, name, value, index) {
  if (!this.isRelevantTagAttr(this.currentTag, name)) return;
  this.results.push({
    start: index + strUntilValue.length,
    length: value.length,
    value,
  });
};

/* eslint-disable */
const parser = new Parser({
  outside: {
    '<!--.*?-->': true,
    '<![CDATA[.*?]]>': true,
    '<[!\\?].*?>': true,
    '<\/[^>]+>': true,
    '<([a-zA-Z\\-:]+)\\s*': function (match, tagName) {
      this.currentTag = tagName;
      return 'inside';
    },
  },
  inside: {
    '\\s+': true,
    '>': 'outside',
    '(([0-9a-zA-Z\\-:]+)\\s*=\\s*\")([^\"]*)\"': processMatch,
    "(([0-9a-zA-Z\\-:]+)\\s*=\\s*\')([^\']*)\'": processMatch,
    '(([0-9a-zA-Z\\-:]+)\\s*=\\s*)([^\\s>]+)': processMatch,
  },
});
/* eslint-enable */

/**
 * get parsed links
 * @param html {String}
 * @param attributes {Array}
 * @return {Array|*}
 */
const getRawLinks = (html, attributes) => (
  parser.parse('outside', html, {
    currentTag: null,
    results: [],
    isRelevantTagAttr: (tag, attr) => attributes.includes(`${tag}:${attr}`),
  }).results
);

/**
 * extend attributes from default
 * @param attributes
 * @return {*[]}
 */
const extendAttributes = (attributes) => {
  const newAttributes = [].concat(defaultMatchAttributes);
  switch (typeis(attributes)) {
    case 'Object':
      Object.keys(attributes).forEach((key) => {
        const add = attributes[key];
        const isInclude = newAttributes.includes(key);
        if (!add && isInclude) {
          return newAttributes.splice(newAttributes.indexOf(key), 1);
        }
        if (add && !isInclude) {
          return newAttributes.push(key);
        }
        return null;
      });
      return newAttributes;
    case 'Array':
      return newAttributes.concat(attributes);
    default:
      return newAttributes;
  }
};

/**
 * match html
 * @param html {String}
 * @param attributes {Array|Object?}
 * @return {Array}
 */
const HTMLMatcher = (html, attributes) => (
  getRawLinks(html, attributes
    ? extendAttributes(attributes)
    : defaultMatchAttributes)
);

module.exports = HTMLMatcher;
