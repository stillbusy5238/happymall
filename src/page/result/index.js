require('./index.css');
var __mm =require('util/mm.js');
require('page/common/nav-simple/index.js');


$(function(){
  var type = __mm.getUrlParam('type') || 'default',
  $element = $('.' + type + '-success').show();

  
})
