var Hogan = require('hogan.js');
var conf = {
  serverHost : ''
};

var _mm = {
  request : function(param){
    var _this =this;
    $.ajax({
      type:param.method || 'get',
      url: param.url    || '',
      dataType: param.type || 'json',
      data : param.data || '',
      success : function(res){
        if(0 === res.status){
          //请求成功
          typeof param.sucess === 'function' && param.sucess(res.data, res.msg);
        }else if(10 === res.status){
          _this.doLogin();

        }
        //请求数据错误
        else if(1 === res.status){
          typeof param.error === 'function' && param.error(res.msg);

        }

      },
      error : function(err){
        typeof param.error === 'function' && param.error(err.statusText);


      }
    });
  },
  //获取服务器地址
  getServerUrl : function(path){
    return conf.serverHost + path;

  },
  //获取url参数
  getUrlParam : function (name) {
    //happymmall.com/product/list?keyword=xxx&page=1(keyword=xxx&)
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  //渲染html模板
  renderHtml : function(htmlTemplate, data){
    var template = Hogan.compile(htmlTemplate),
    result = template.render(data);
    return result;

  },
  //成功提示
  successTip: function(msg){
    alert(msg ||'操作成功');

  },
  errorTip: function(msg){
    alert(msg ||'somsthing wrong');

  },
  //字段的验证,支持非空
  validate: function(value, type){
    var value = $.trim(value);
    //非空验证
    if('require' === type){
      return !!value;


    }
    if('phone' === type){
      return /^1\d{10}$/.test(value);
    }
    //邮箱格式验证
    if('email' ===type){
      return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
    }


  },

  //统一登陆处
  doLogin : function(){
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  foHome: function(){
    window.location.href = './index.html';

  }

};

module.exports = _mm
