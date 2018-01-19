require('./index.css');
var __mm =require('util/mm.js');
require('page/common/nav-simple/index.js');


$(function(){
  var type = __mm.getUrlParam('type') || 'default',
  $element = $('.' + type + '-success').show();
  if(type === 'payment'){
    var orderNumber = __mm.getUrlParam('orderNumber');
    var $orderNumber = $element.find('.order-number');
    $orderNumber .attr('href',$orderNumber.attr('href')+orderNumber);
  }


})
