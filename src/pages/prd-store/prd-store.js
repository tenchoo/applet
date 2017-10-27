const wxAPI = require('../../common/js/wxAPI');
import {api} from '../../config/api';
Page({
  data: {
    goodsDelArray:[],
    editBool:true,
  },

  onLoad: function (options) {
  
  },

  onReady: function () {
  
  },

  onShow: function () {
    this.getgoodsList(this);
  },
  getgoodsList:function(that){
    let params = {
      account_id:wx.getStorageSync('account_id'),
    };
    wxAPI.postRequest(api.goods_list,params)
      .then(res=>{
        if(0===res.data.status){
          let data=res.data.data;
          that.setData({
            goodsList:data.goodsList
          })
        }else{
          console.log(res.data.msg);
        }
      })
  },
  // 本地删除产品
  delGoods:function(e){
    let id = e.target.dataset.id;
    let index = e.target.dataset.index;
    let goodsList = this.data.goodsList;
    let goodsDelArray=this.data.goodsDelArray;
    goodsDelArray.push(id);
    goodsList.splice(index,1);
   this.setData({
     goodsDelArray:goodsDelArray,
     goodsList:goodsList
   })

  },
  toEdit:function(){
    this.setData({
      editBool:false
    })
  },
  onHide: function () {
  
  }
})