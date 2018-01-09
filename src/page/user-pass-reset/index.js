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
  data : {
    username : '',
    question : '',
    answer : '',
    token : ''
  },
  init: function(){
    this.onload();
    this.bindEvent();

  },
  onload : function(){
    this.loadStepUsername();

  },
  bindEvent : function(){
    var _this = this;
    //输入用户名下一步的点击
    $('#submit-username').click(function(){
      var username = $.trim($('#username').val());
      //用户名存在
      if(username){
        _user.getQuestion(username, function(res){
          _this.data.username = username;
          _this.data.question = res;
          _this.loadStepQuestion();

        }, function(errMsg){
          formError.show(errMsg);

        });
      }else{
        formError.show('plz type username');
      }

    });
    //输入密码提示问题答案中的按钮点击
    $('#submit-question').click(function(){
      var answer = $.trim($('#answer').val());
      //密码存在
      if(answer){
        //检查密码提示问题答案
        _user.checkAnswer({
          username : _this.data.username,
          question : _this.data.question,
          answer: answer


        },function(res){
          _this.data.answer = answer;
          _this.data.token = res;
          _this.loadStepPassword();
        },function(errMsg){
          formError.show(errMsg)

      });
      }else{
        formError.show('plz type answer');
      }
    });
    //输入新密码后的按钮点击
    $('#submit-password').click(function(){
      var password = $.trim($('#password').val());
      //密码存在
      if(password && password.length >=6) {
        //检查密码提示问题答案
        _user.resetPassword({
          username : _this.data.username,
          passwordNew : password,
          forgetToken: _this.data.token


        },function(res){
          window.location.href = './result.html?type=pass-reset';

        },function(errMsg){
          formError.show(errMsg)

      });
      }else{
        formError.show('plz type newpassword and not less than 6');
      }
    });






  },
  //加载输入用户名的一步
  loadStepUsername : function(){
    $('.step-username').show();

  },
  //加载问题
  loadStepQuestion : function(){
    //清除错误提示
    formError.hide();
    $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);


  },
  //加载新密码
  loadStepPassword : function(){
    //清除错误提示
    formError.hide();
    $('.step-question').hide().siblings('.step-password').show();

  },



};

$(function(){
  page.init();
})
