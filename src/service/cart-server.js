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
  //获取购物车数量
  getCartList: function(resolve,reject){
    _mm.request({
      //登出
      url: _mm.getServerUrl('/cart/list.do'),

      sucess : resolve,
      error : reject
    });
  },
  //选择购物车商品
  selectProduct : function(productId,resolve,reject){
    _mm.request({
      //登出
      url: _mm.getServerUrl('/cart/select.do'),
      data : {
        productId : productId
      },

      sucess : resolve,
      error : reject
    });
  },

  //取消选择购物车商品
  unselectProduct : function(productId,resolve,reject){
    _mm.request({
      //登出
      url: _mm.getServerUrl('/cart/un_select.do'),
      data : {
        productId : productId
      },

      sucess : resolve,
      error : reject
    });
  },

  //全选择购物车商品
  selectAllProduct : function(resolve,reject){
    _mm.request({
      //登出
      url: _mm.getServerUrl('/cart/select_all.do'),

      sucess : resolve,
      error : reject
    });
  },
  //取消全选择
  unselectAllProduct : function(resolve,reject){
    _mm.request({
      //登出
      url: _mm.getServerUrl('/cart/un_select_all.do'),

      sucess : resolve,
      error : reject
    });
  },

  //更新商品数量
  updateProduct : function(productInfo,resolve,reject){
    _mm.request({
      //登出
      url: _mm.getServerUrl('/cart/update.do'),
      data : productInfo,

      sucess : resolve,
      error : reject
    });
  },
  //删除商品
  deleteProduct : function(productIds,resolve,reject){
    _mm.request({
      //登出
      url: _mm.getServerUrl('/cart/delete_product.do'),
      data : {
        productIds : productIds
      },

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
