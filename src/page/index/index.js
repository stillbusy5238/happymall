var _mm =require('util/mm.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./index.string');
require('./index.css');
require('util/slider/index.js');

$(function() {
  //渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化
    var $silder = $('.banner').unslider({
      dots:true
    });
    //前一张和后一张的事件绑定
    $('.banner-con .banner-arrow').click(function(){
      var forward = $(this).hasClass('prev') ? 'prev' : 'next';
      $silder.data('unslider')[forward]();
    });

});
