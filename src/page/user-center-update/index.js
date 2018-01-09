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
    this.bindEvent();

  },
  onload : function(){
    //初始化左侧菜单
    navSide.init({
      name : 'user-center'
    });
    //加载个人信息
    this.loadUserInfo();


  },
  bindEvent : function(){
    var _this = this;
    //事件冒泡
    $(document).on('click', '.btn-submit', function(){
      var userInfo = {
        phone : $.trim($('#phone').val()),
        email : $.trim($('#email').val()),
        question : $.trim($('#question').val()),
        answer : $.trim($('#answer').val())
      },
      validdateResult = _this.validdateForm(userInfo);
      if(validdateResult.status){
        _user.updateUserInfo(userInfo, function(res,msg){
          _mm.successTip(msg);
          window.location.href = './user-center.html';

        }, function(errMsg){
          _mm.errorTip(errMsg);

        });
      }else{
        _mm.errorTip(validdateResult.msg);
      }
    });
  },

  //加载用户信息
  loadUserInfo : function(){
    var userHtml = '';
    _user.getUserInfo(function(res){
      userHtml = _mm.renderHtml(templateIndex, res);
      $('.panel-body').html(userHtml);
    }, function(errMsg){
      _mm.errorTip(errMsg);

    });

  },
  //验证字段信息
  validdateForm : function(formData){
    var result ={
      status : false,
      msg    : ''
    };

    //验证手机
    if(!_mm.validate(formData.phone, 'phone')){
      result.msg = 'phone is not right';
      return result;
    }
    //验证邮箱
    if(!_mm.validate(formData.email, 'email')){
      result.msg = 'email is not right';
      return result;
    }
    //密码提示问题
    if(!_mm.validate(formData.question, 'require')){
      result.msg = 'not valid question';
      return result;
    }
    //密码提示问题答案
    if(!_mm.validate(formData.answer, 'require')){
      result.msg = 'answer is not right';
      return result;
    }


    //通过验证
    result.status = true;
    result.msg = 'success';
    return result;

  }
};

$(function(){
  page.init();
})
