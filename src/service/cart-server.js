var _mm = require('util/mm.js');

var _cart ={


  //获取购物车数量
  getCartCount: function(resolve,reject){
    _mm.request({
      //登出
      url: _mm.getServerUrl('/cart/get_cart_product_count.do'),

      sucess : resolve,
      error : reject
    });
  },
  //添加购物车
  addToCart: function(productInfo,resolve,reject){
    _mm.request({
      //登出
      url: _mm.getServerUrl('/cart/add.do'),
      data : productInfo,
      sucess : resolve,
      error : reject
    });
  }

}

module.exports = _cart;
