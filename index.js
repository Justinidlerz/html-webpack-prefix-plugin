'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');
var attrParse = require("./lib/attributesParser");


function HtmlWebpackPrefixPlugin (options) {}

HtmlWebpackPrefixPlugin.prototype.apply = function (compiler) {
  var that = this;
  compiler.plugin('compilation', function(compilation) {

    compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
      htmlPluginData.html = that.addPrefix( htmlPluginData.html , htmlPluginData.plugin.options);
      callback(null, htmlPluginData);
    });
  });
};


HtmlWebpackPrefixPlugin.prototype.addPrefix = function ( html, options ){
    if(options.prefix){
        var attrs = ["img:src", "img:srcset", "img:data-src", "script:src", "link:href"];
        if(Object.prototype.toString.call(options.attrs) === '[object Object]'){
            for(var i in options.attrs){
                var index = attrs.indexOf(options.attrs[i]);
                if(index != -1){//列表中存在
                    !options.attrs[i] && attrs.splice(index, 1);
                } else {
                    options.attrs[i] && attrs.push(options.attrs[i]);
                }
            }
        }else if(Object.prototype.toString.call(options.attrs) === '[object Array]'){
            attrs = attrs.concat(options.attrs);
        }
        var rawLinks = attrParse(html, function(tag, attr) {
            return attrs.indexOf(tag + ":" + attr) >= 0;
        });
        var links = [];
        rawLinks.forEach(function(link) {
            var length = link.length;
            var start = link.start;
            var valueList = link.value.split(",");
            valueList.forEach(function(newLink) {
                var trimmed = newLink.trim();
                var cLength = newLink.length;
                var spacePos = trimmed.indexOf(" ");
                var spaceStart = newLink.indexOf(trimmed);
                var len = cLength + spaceStart;
                if (-1 != spacePos) {
                    len = spacePos + spaceStart;
                    trimmed = trimmed.substring(0, spacePos);
                }
                links.push({
                    start: start,
                    length: len,
                    value: trimmed
                });
                start += cLength + 1;
            });
        });

        links.reverse();
        html = [html];
        links.forEach(function(link) {
            if (/^http[s]?:\/\/|^\/\//i.test(link.value)) return;
            var value = url.resolve(options.prefix, link.value);

            var x = html.pop();
            html.push(x.substr(link.start + link.length));
            html.push(value);
            html.push(x.substr(0, link.start));
        });
        html.reverse();
        html = html.join("");
    }

  return html;
}


module.exports = HtmlWebpackPrefixPlugin;
