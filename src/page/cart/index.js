var _mm =require('util/mm.js');
var nav =require('page/common/nav/index.js');
require('page/common/header/index.js');

require('./index.css');
var templateIndex = require('./index.string');

var _cart = require('service/cart-server.js');

var page = {
    data : {

    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){

        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        // 商品的选择
        $(document).on('click', '.cart-select', function(){
          var $this = $(this);
          var productId = $this.parents('.cart-table').data('product-id');
          //切换选中状态
          if($this.is(':checked')){
            _cart.selectProduct(productId,function(res){
              _this.renderCart(res);

            }, function(errMsg){
              _this.showCartError();



            });

          }else{
            _cart.unselectProduct(productId,function(res){
              _this.renderCart(res);

            }, function(errMsg){
              _this.showCartError();


          });
        }

        });

        // 商品的全选择
        $(document).on('click', '.cart-select-all', function(){
          var $this = $(this);

          //切换全选中状态
          if($this.is(':checked')){
            _cart.selectAllProduct(function(res){
              _this.renderCart(res);

            }, function(errMsg){
              _this.showCartError();



            });

          }else{
            _cart.unselectAllProduct(function(res){
              _this.renderCart(res);

            }, function(errMsg){
              _this.showCartError();


          });
        }

        });

        // 商品数量的变化
        $(document).on('click', '.count-btn', function(){
            var $this       = $(this),
                $pCount     = $this.siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                type        = $this.hasClass('plus') ? 'plus' : 'minus',
                productId   = $this.parents('.cart-table').data('product-id'),
                minCount    = 1,
                maxCount    = parseInt($pCount.data('max')),
                newCount    = 0;
            if(type === 'plus'){
                if(currCount >= maxCount){
                    _mm.errorTips('large than max');
                    return;
                }
                newCount = currCount + 1;
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            }
            // 更新购物车商品数量
            _cart.updateProduct({
                productId : productId,
                count : newCount
            }, function(res){
                _this.renderCart(res);
            }, function(errMsg){
                _this.showCartError();
            });
        });

        // 删除单个
        $(document).on('click', '.cart-delete', function(){
          if(window.confirm('are you sure')){
            var productId = $(this).parents('.cart-table').data('product-id');
            _this.deleteCartProduct(productId);

          }
        });

        // 删除选中
        $(document).on('click', '.delete-selected', function(){
          if(window.confirm('are you sure to delete-selected')){
            var arrProductIds = [],
                $selectedItem = $('.cart-select:checked');

                //循环查找选中的
            for(var i=0, iLength = $selectedItem.length; i<iLength; i++){
              arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
            }
            if(arrProductIds.length){
              _this.deleteCartProduct(arrProductIds.join(','));

            }else{
              _mm.errorTip('donot selected');
            }


            _this.deleteCartProduct(productId);

          }
        });
        //提交购物车
        $(document).on('click', '.btn-submit', function(){

          //总价大于0 进行提交
          if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
            window.location.href = './order-confirm.html';
          }else{
            _mm.errorTip('plz select');
          }

        });




    },
    // 加载购物车的数据
    loadCart : function(){
        var _this       = this;
        //获取购物车列表
        _cart.getCartList(function(res){
          _this.renderCart(res);

        }, function(errMsg){
          _this.showCartError();


        })
        // loading
        //$pageWrap.html('<div class="loading"></div>');

    },
    //渲染购物车
    renderCart : function(data){
      this.filter(data);
      //缓存购物车信息
      this.data.cartInfo = data;
      //生成html
      var cartHtml = _mm.renderHtml(templateIndex, data);
      $('.page-wrap').html(cartHtml);
      //通知导航的购物车更新数量
      nav.loadCartCount();



    },
    //删除商品,支持批量
    deleteCartProduct : function(productIds){
      var _this = this;
      _cart.deleteProduct(productIds, function(res){
          _this.renderCart(res);
      }, function(errMsg){
          _this.showCartError();
      });

    },
    // 数据匹配
    filter : function(data){
      data.notEmpty = !!data.cartProductVoList.length;

    },
    showCartError : function(){
      $('.page-wrap').html('<p class="err-tip">something wrong</p>');
    }
};
$(function(){
    page.init();
})
