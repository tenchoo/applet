// pages/add-customer-drugstore/add-customer-drugstore.js
Page({

  data: {
    // 选中radio的值
    radioData:'',
  },
  radioChange:function(e){
    let value = e.detail.value;
    this.setData({
      radioData:value
    })
  },
});