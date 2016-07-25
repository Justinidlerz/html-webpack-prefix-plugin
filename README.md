Prefix extension for the HTML Webpack Plugin
========================================

Enhances [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)
functionality by adding the `{prefix: '//xxx.xxx.com/', attrs : { 'img:src' : false } }` option.

This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) - a plugin that simplifies the creation of HTML files to serve your webpack bundles.

Installation
------------
You must be running webpack on node 0.12.x or higher

Install the plugin with npm:
```shell
$ npm install --save-dev html-webpack-prefix-plugin
```

Basic Usage
-----------
Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new HtmlWebpackPrefixPlugin()
]  
```
The above configuration will actually do nothing due to the configuration defaults.

As soon as you now set `prefix` to a path the generated output of the HtmlWebpackPlugin will
always add a prefix. 
```javascript
plugins: [
  new HtmlWebpackPlugin({
		prefix: '//xxx.xxx.com/'
	}),
  new HtmlWebpackPrefixPlugin()
]  
```

Even if you generate multiple files make sure that you add the HtmlWebpackPrefixPlugin **only once**:

```javascript
plugins: [
  new HtmlWebpackPlugin({
		prefix: '//xxx.xxx.com/'
	}),
  new HtmlWebpackPlugin({
		prefix: '//xxx.xxx.com/',
		filename: 'demo.html'
	}),
  new HtmlWebpackPlugin({
		prefix: '//xxx.xxx.com/',
		filename: 'test.html'
	}),
  new HtmlWebpackPrefixPlugin()
]  
```

The html-webpack-prefix-plugin default set prefix label attrs `["img:src", "img:srcset", "img:data-src", "script:src", "link:href"]`.   

If you want to remove and add attr you can set attrs options.

```javascript
new HtmlWebpackPlugin({
	prefix: '//xxx.xxx.com/',
	attrs : {
		'img:src' : false, //remove
		'img:data-url' : true // add
	}
})
```

If you onlu want to add attr you can set attrs options.

```javascript
new HtmlWebpackPlugin({
	prefix: '//xxx.xxx.com/',
	attrs : ['img:url']
})
```
