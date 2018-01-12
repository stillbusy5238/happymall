require('./index.css');
var _mm = require('util/mm.js');

//通用页面头部

var header ={
  init:function(){
    this.onload();
    this.bindEvent();



  },
  onload : function(){
    //解析关键字
    var keyword = _mm.getUrlParam('keyword');
    if(keyword){
      $('#search-input').val(keyword);
    };
  },
  bindEvent : function(){
    var _this = this;
    $('#search-btn').click(function(){
      _this.searchSubmit();


    });
    //输入回车后做搜索
    $('#search-input').keyup(function(e){
      if(e.keyCode === 13){
        _this.searchSubmit();

      }

    });



  },
  //搜索的提交
  searchSubmit : function(){
    var keyword = $.trim($('#search-input').val());
    //如果有关键字跳转到list，如果没有就跳转到home
    if(keyword){
      window.location.href = './list.html?keyword=' + keyword;

    }else{
      _mm.goHome();
    }
  }

}

  header.init();
