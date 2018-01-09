require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var navSide ={
  option : {
    name : '',
    navList : [
      {name: 'user-center', desc : 'my information', herf: './user-center.html'},
      {name: 'order-list', desc : 'my order', herf: './order-list.html'},
      {name: 'pass-update', desc : 'my password', herf: './user-pass-update.html'},
      {name: 'about', desc : 'about MMall', herf: './about.html'}
    ]

  },
  init: function(option){
    //合并选项
    $.extend(this.option, option);
    this.renderNav();

  },
  //渲染导航菜单
  renderNav: function(){
    //计算active数据
    for(var i = 0, ilength = this.option.navList.length; i< ilength; i++){
      if(this.option.navList[i].name === this.option.name){
        this.option.navList[i].isActive = true;

      }

    };
    //渲染list数据
    var navHtml = _mm.renderHtml(templateIndex, {
      navList : this.option.navList
    });
    //把html放入容器
    $('.nav-side').html(navHtml);

  }
};

module.exports = navSide;
