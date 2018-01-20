const HTMLMatcher = require('./lib/HTMLMatcher');
const contentRepeat = require('./lib/contentRepeat');

function HtmlWebpackPrefixPlugin() {}

HtmlWebpackPrefixPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-html-processing', (htmlPluginData, callback) => {
      const newData = Object.assign(htmlPluginData, {
        html: this.addPrefix(htmlPluginData.html, htmlPluginData.plugin.options),
      });
      callback(null, newData);
    });
  });
};


HtmlWebpackPrefixPlugin.prototype.addPrefix = function (html, options) {
  if (options.prefix) {
    const rawLinks = HTMLMatcher(html, options.attrs);
    return contentRepeat(html, rawLinks, options.prefix);
  }
  return html;
};


module.exports = HtmlWebpackPrefixPlugin;
