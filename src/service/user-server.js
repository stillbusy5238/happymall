var _mm = require('util/mm.js');

var _user ={
  //用户登录
  login: function(userInfo,resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/login.do'),
      data : userInfo,
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  },
  checkUsername: function(username,resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/check_valid.do'),
      data : {
        type : 'username',
        str  : username
      },
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  },
  register: function(userInfo,resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/register.do'),
      data : userInfo,
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  },


  //检查登陆状态
  checkLogin: function(resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/get_user_info.do'),
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  },
  //获取用户密码提示问题
  getQuestion : function(username,resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/forget_get_question.do'),
      data :  {
        username : username
      },
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  },
  //提示问题答案检查
  checkAnswer : function(userInfo,resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/forget_check_answer.do'),
      data :   userInfo,
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  },
  resetPassword : function(userInfo,resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/forget_reset_password.do'),
      data :   userInfo,
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  },
  //获取用户信息
  getUserInfo :function(resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/get_information.do'),
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  },
  //更新个人密码
  updateUserInfo : function(userInfo,resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/update_information.do'),
      data :   userInfo,
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  },
  //更改个人密码在登陆状态下
  updatePassword :function(userInfo,resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/reset_password.do'),
      data : userInfo,
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  },



  //登出
  logout: function(resolve,reject){
    _mm.request({
      //登出
      url: _mm.getServerUrl('/user/logout.do'),
      method : 'POST',
      sucess : resolve,
      error : reject
    });
  }
}

module.exports = _user;
