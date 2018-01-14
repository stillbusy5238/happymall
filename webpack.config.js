
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
    'list' : ['./src/page/list/index.js'],
    'detail' : ['./src/page/detail/index.js'],
    'cart' : ['./src/page/cart/index.js'],
    'user-login' : ['./src/page/user-login/index.js'],
    'user-register' : ['./src/page/user-register/index.js'],
    'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
    'user-pass-update' : ['./src/page/user-pass-update/index.js'],
    'user-center' : ['./src/page/user-center/index.js'],
    'user-center-update' : ['./src/page/user-center-update/index.js'],
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
    new HtmlWebpackPlugin(getHtmlConfig('list', 'list')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', 'detail')),
    new HtmlWebpackPlugin(getHtmlConfig('cart', 'cart')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','login')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','register')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','pass-reset')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','pass-update')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','pass-center')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','pass-center-update')),
    new HtmlWebpackPlugin(getHtmlConfig('result','result')),

  ]
};

if('dev' === WEBPAKC_ENV){
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}


module.exports = config;
