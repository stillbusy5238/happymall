var _mm = require('util/mm.js');

var _user ={
  //检查登陆状态
  checkLogin: function(resolve,reject){
    _mm.request({

      url: _mm.getServerUrl('/user/get_user_info.do'),
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
