
require('./index.css');
var _mm =require('util/mm.js');
require('page/common/nav-simple/index.js');
var _user =require('service/user-server.js');


//表单里的错误提示
var formError ={
  show : function(errMsg){


    $('.error-item').show().find('.err-msg').text(errMsg);
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
    //登录按钮的点击
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
      password : $.trim($('#password').val())


    },
    //表单验证结果
    validateResult = this.formValidate(formData);
    //验证成功和失败
    if(validateResult.status){
      //提交
      _user.login(formData, function(res){
        window.location.href = _mm.getUrlParam('redirect') || './index.html';
        // window.locatin.href = '/disk/view/index.html';

      }, function(errMsg){
        formError.show(errMsg);


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
      result.msg = 'can not empty';
      return result;
    }
    if(!_mm.validate(formData.password, 'require')){
      result.msg = 'can not empty';
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
