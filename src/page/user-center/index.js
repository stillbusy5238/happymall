var _mm =require('util/mm.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
require('./index.css');
var templateIndex = require('./index.string');
var _user = require('service/user-server.js');

//逻辑部分
var page ={
  init: function(){
    this.onload();

  },
  onload : function(){
    //初始化左侧菜单
    navSide.init({
      name : 'user-center'
    });
    //加载个人信息
    this.loadUserInfo();


  },
  //加载
  loadUserInfo : function(){
    var userHtml = '';
    _user.getUserInfo(function(res){
      userHtml = _mm.renderHtml(templateIndex, res);
      $('.panel-body').html(userHtml);
    }, function(errMsg){
      _mm.errorTip(errMsg);

    });

  }
};

$(function(){
  page.init();
})
