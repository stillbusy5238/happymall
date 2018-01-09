require('./index.css');
var _mm =require('util/mm.js');
require('page/common/nav-simple/index.js');
var _user =require('service/user-server.js');

//表单里的错误提示
var formError ={
  show : function(ErrMsg){
    $('.error-item').show().find('.err-msg').text(ErrMsg);
  },
  hide : function(){
    $('.error-item').hide().find('.err-msg').text('');
  }

};
//逻辑部分
var page ={
  init: function(){
    this.bindEvent();

  },
  bindEvent : function(){
    var _this = this;
    // 验证username
    $('#username').blur(function(){
      var username = $.trim($(this).val());
      //如果用户名为空我们不做验证
      if(!username){
        return;
      }
      //异步验证用户名是否存在
      _user.checkUsername(username, function(res){
        formError.hide();

      }, function(ErrMsg){
        formError.show(ErrMsg);
      });
    });
    //注册按钮的点击
    $('#submit').click(function(){
      _this.submit();

    });
    //如果按下回车也会提交
    $('.user-content').keyup(function(e){
      if(e.keyCode === 13){
        _this.submit();
      }
    });

  },

  //提交表单
  submit: function(){
    var formData = {
      username : $.trim($('#username').val()),
      password : $.trim($('#password').val()),
      passwordConfirm : $.trim($('#password-confirm').val()),
      phone : $.trim($('#phone').val()),
      email : $.trim($('#email').val()),
      question : $.trim($('#question').val()),
      answer : $.trim($('#answer').val()),


    },
    //表单验证结果
    validateResult = this.formValidate(formData);
    //验证成功和失败
    if(validateResult.status){
      //提交
      _user.register(formData, function(res){
        window.location.href = './result.html?type=register';

      }, function(ErrMsg){
        formError.show(ErrMsg);

      });

    }else{
      formError.show(validateResult.msg)



    }

  },
  formValidate : function(formData){
    var result ={
      status : false,
      msg    : ''
    };
    if(!_mm.validate(formData.username, 'require')){
      result.msg = '1';
      return result;
    }
    if(!_mm.validate(formData.password, 'require')){
      result.msg = '2';
      return result;
    }
    //不能少于6位
    if(formData.password.length <6){
      result.msg = '3';
      return result;
    }
    //必须和密码相等
    if(formData.password !== formData.passwordConfirm){
      result.msg = '4';
      return result;
    }
    //验证手机
    if(!_mm.validate(formData.phone, 'phone')){
      result.msg = '5';
      return result;
    }
    //验证邮箱
    if(!_mm.validate(formData.email, 'email')){
      result.msg = '6';
      return result;
    }
    //密码提示问题
    if(!_mm.validate(formData.question, 'require')){
      result.msg = '7';
      return result;
    }
    //密码提示问题答案
    if(!_mm.validate(formData.answer, 'require')){
      result.msg = '8';
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
