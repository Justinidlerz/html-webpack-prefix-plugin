Prefix extension for the HTML-Webpack-Plugin
============================================

Enhances [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) function by adding the options.
```javascript
{
  prefix: '//example.com/', 
  attrs : { 
    'img:src': false 
  } 
}
```


This is an extension plugin for the [webpack](http://webpack.github.io) plugin [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)  
A plugin that simplifies the creation of HTML files to serve your webpack bundles.

Installation
------------
You must be running webpack on node 6.x or higher

Install the plugin with npm:
```shell
$ npm install html-webpack-prefix-plugin --save-dev
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


As soon as you now set `prefix` to a path the generated output of the HtmlWebpackPlugin will always append prefix to matched attributes from HTML label. 
```javascript
plugins: [
  new HtmlWebpackPlugin({
    prefix: '//example.com/'
  }),
  new HtmlWebpackPrefixPlugin()
]  
```

Even if you generate multiple files make sure that you add the HtmlWebpackPrefixPlugin **only once**:
```javascript
plugins: [
  new HtmlWebpackPlugin({
    prefix: '//example.com/'
  }),
  new HtmlWebpackPlugin({
    prefix: '//example.com/',
    filename: 'demo.html'
  }),
  new HtmlWebpackPlugin({
    prefix: '//example.com/',
    filename: 'test.html'
  }),
  new HtmlWebpackPrefixPlugin()
]  
```

The html-webpack-prefix-plugin had default prefix attributes options   
  - img:src
  - img:srcset
  - img:data-src
  - script:src
  - link:href     

If you want to remove and add attr you can set attributes options like so:

```javascript
new HtmlWebpackPlugin({
  prefix: '//example.com/',
  attrs : {
    'img:src': false, //remove from default option
    'img:data-url': true // add new attribute to field
  }
})
```

If you only want to append attribute to default,  
you can parse the Array to options like so:

```javascript
new HtmlWebpackPlugin({
  prefix: '//xxx.xxx.com/',
  attrs : ['img:url']
})
```

