var _mm =require('util/mm.js');




var templateAddressModal = require('./address-modal.string');

var _address = require('service/address-server.js');
var _cities = require('util/cities/index.js');



var addressModal = {
  show : function(option){
    //option的绑定
    this.option = option;
    this.option.data = option.data || {};
    this.$modalWrap = $('.modal-wrap');
    //渲染页面
    this.loadModal();
    //绑定事件
    this.bindEvent();


  },
  bindEvent : function(){
    var _this = this;
    //省份和城市的二级联动
    this.$modalWrap.find('#receiver-province').change(function(){
      var selectProvice = $(this).val();
      _this.loadCities(selectProvice);


    });

    //提交收货地址
    this.$modalWrap.find('.address-btn').click(function(){
      var receiverInfo = _this.getReceiverInfo(),
          isUpdate = _this.option.isUpdate;
      //使用新地址且验证通过
      if(!isUpdate && receiverInfo.status){
        _address.save(receiverInfo.data, function(res){
          _mm.successTip('address success');
          _this.hide();
          typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);

        }, function(errMsg){
          _mm.errorTip(errMsg);
        });

      }
      //更新地址
      else if (isUpdate && receiverInfo.status){
        _address.update(receiverInfo.data, function(res){
          _mm.successTip('update success');
          _this.hide();
          typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);

        }, function(errMsg){
          _mm.errorTip(errMsg);
        });

      }
      //验证不通过
      else{
        _mm.errorTip(receiverInfo.errMsg) || 'something wrong'
      }




    });
    //保证点击modal内容区的时候不关闭弹窗
    this.$modalWrap.find('.modal-container').click(function(e){

      e.stopPropagation();


    });

    //点击叉号或者蒙版区关闭弹窗

    this.$modalWrap.find('.close').click(function(){

      _this.hide();


    });




  },
  loadModal : function(){
    var addressModalHtml = _mm.renderHtml(templateAddressModal, {
      isUpdate : this.option.isUpdate,
      data : this.option.data
    });
    this.$modalWrap.html(addressModalHtml);
    //加载省份
    this.loadProvince();

  },
  loadProvince : function(){
    var provinces = _cities.getProvinces() || [];
    var $provinceSelect = this.$modalWrap.find('#receiver-province');
    $provinceSelect.html(this.getSelectOption(provinces));
    //如果更新地址有省份 则回填
    if(this.option.isUpdate && this.option.data.receiverProvince){
      $provinceSelect.val(this.option.data.receiverProvince);
      this.loadCities(this.option.data.receiverProvince);

    }


  },

  loadCities : function(provinceName){
    var cities = _cities.getCities(provinceName) || [];
    var $citySelect = this.$modalWrap.find('#receiver-city');

    $citySelect.html(this.getSelectOption(cities));
    //如果更新地址有城市 则回填
    if(this.option.isUpdate && this.option.data.receiverCity){
      $citySelect.val(this.option.data.receiverCity);


    }


  },
  //获取表单收件人信息的方法,并做表单的验证
  getReceiverInfo : function(){
    var receiverInfo = {},
    result = {
      status : false
    };
    if(this.option.isUpdate){
      receiverInfo.id = this.$modalWrap.find('#receiver-id').val();

    }
    //表单验证
    receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
    receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
    receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
    receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
    receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
    receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

    if(!receiverInfo.receiverName){
      result.errMsg = 'name';
    }else if(!receiverInfo.receiverProvince){
      result.errMsg = 'province';

    }else if(!receiverInfo.receiverCity){
      result.errMsg = 'city';

    }else if(!receiverInfo.receiverPhone){
      result.errMsg = 'phone';

    }else if(!receiverInfo.receiverAddress){
      result.errMsg = 'address';

    }else{
      result.status = true;
      result.data = receiverInfo;
    }
    return result;


  },
  //获取select框的选项,输入是array
  getSelectOption : function (optionArray){
    var html = '<option value="">plz select</option>';
    for(var i =0, length = optionArray.length; i < length; i++){
      html += '<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>';

    }
    return html;



  },
  //关闭弹窗
  hide : function(){
    this.$modalWrap.empty();

  }


};
module.exports = addressModal;
