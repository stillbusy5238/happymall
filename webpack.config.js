
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量的配置 dev/online
var WEBPAKC_ENV = process.env.WEBPAKC_ENV || 'dev';
console.log(WEBPAKC_ENV);
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title){
  return {
    template: './src/view/'+ name +'.html',
    filename: 'view/'+ name +'.html',
    title : title,
    inject: true,
    hash: true,
    chunks:['common',name]

  };
}
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index' : ['./src/page/index/index.js'],
    'login' : ['./src/page/login/index.js'],
    'result' : ['./src/page/result/index.js'],
  },
  output:{
    path: './disk',
    publicPath: '/disk',
    filename:'js/[name].js'
  },
  externals : {
    'jquery' :'window.jQuery'
  },
  module:{
    loaders:[
        {
           test: /\.css$/,
           loader:  ExtractTextPlugin.extract("style-loader","css-loader")
       },
       {
          test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
          loader:  'url-loader?limit=100&name=resource/[name].[ext]'
      },
      {
         test: /\.string$/,
         loader: 'html-loader'
     }

    ]
  },
  resolve : {
    alias :{
      util : __dirname + '/src/util',
      page : __dirname + '/src/page',
      service : __dirname + '/src/service',
      image : __dirname + '/src/image',
      node_modules : __dirname + '/node_modules'

    }
  },
  plugins:[
    //独立通用
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename:'js/base.js'
    }),
    new ExtractTextPlugin("css/[name].css"),
    new HtmlWebpackPlugin(getHtmlConfig('index', 'first')),
    new HtmlWebpackPlugin(getHtmlConfig('login','login')),
    new HtmlWebpackPlugin(getHtmlConfig('result','result')),

  ]
};

if('dev' === WEBPAKC_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}


module.exports = config;
