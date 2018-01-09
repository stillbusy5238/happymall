var _mm =require('util/mm.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
require('./index.css');

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
      name : 'pass-update'
    });



  },
  bindEvent : function(){
    var _this = this;
    //事件冒泡
    $(document).on('click', '.btn-submit', function(){
      var userInfo = {
        password : $.trim($('#password').val()),
        passwordNew : $.trim($('#password-new').val()),

        passwordConfirm : $.trim($('#password-confirm').val())
      },
      validdateResult = _this.validdateForm(userInfo);
      if(validdateResult.status){
        //更改用户密码
        _user.updatePassword({
          passwordOld : userInfo.password,
          passwordNew : userInfo.passwordNew
        }, function(res,msg){
          _mm.successTip(msg);


        }, function(errMsg){
          _mm.errorTip(errMsg);

        });
      }else{
        _mm.errorTip(validdateResult.msg);
      }
    });
  },


  //验证字段信息
  validdateForm : function(formData){
    var result ={
      status : false,
      msg    : ''
    };

    //验证原密码是否为空
    if(!_mm.validate(formData.password, 'require')){
      result.msg = 'old password cannot be empty';
      return result;
    }
    //验证新密码长度
    if(!formData.passwordNew || formData.passwordNew.length <6){
      result.msg = 'new password cannot less than 6';
      return result;
    }
    //密码提示问题
    if(formData.passwordNew !== formData.passwordConfirm){
      result.msg = 'must be equal to new password';
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
