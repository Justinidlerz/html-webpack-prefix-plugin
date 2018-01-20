/**
 * @Create idler.zhu(zqc.sunny@aliyun.com)
 * @CreateDate  2018/1/20
 */
const path = require('path');
const url = require('url');

/**
 * match links and reorganization data
 * @param rawLinks {Array}
 * @returns {Array}
 */
const matchLinks = rawLinks => (
  rawLinks.reduce((prev, link) => {
    let { start } = link;
    let valueList = [link.value];
    // split content when not base64
    if (link.value.indexOf(';base64,') === -1) {
      valueList = link.value.split(',');
    }
    const matched = valueList.map((newLink) => {
      let trimmed = newLink.trim();
      const cLength = newLink.length;
      const spacePos = trimmed.indexOf(' ');
      const spaceStart = newLink.indexOf(trimmed);
      let len = cLength + spaceStart;
      if (spacePos !== -1) {
        len = spacePos + spaceStart;
        trimmed = trimmed.substring(0, spacePos);
      }
      const matchedData = {
        start,
        length: len,
        value: trimmed,
      };
      start += cLength + 1;
      return matchedData;
    });
    return prev.concat(matched);
  }, []).reverse()
);

/**
 * replace html content
 * @param html {String}
 * @param rawLinks {Array}
 * @param prefix {String}
 * @returns {string}
 */
module.exports = (html, rawLinks, prefix) => {
  const links = matchLinks(rawLinks);
  const content = [html];
  const isLocalPrefixPath = /^\.?\/[^/]+$/.test(prefix);
  links.forEach((link) => {
    // is absolute path then return
    if (/^http[s]?:\/\/|^\/\//i.test(link.value)) return;

    let value;
    if (isLocalPrefixPath) {
      value = path.join(prefix, link.value).replace(/\\/ig, '/');
    } else {
      value = url.resolve(prefix, link.value);
    }
    const cut = content.pop();
    content.push(cut.substr(link.start + link.length));
    content.push(value);
    content.push(cut.substr(0, link.start));
  });
  content.reverse();
  return content.join('');
};
