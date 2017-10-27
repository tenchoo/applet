const wxAPI = require('../../common/js/wxAPI');
const app = getApp();
import {api} from '../../config/api';
Page({

  data: {
  
  },

  onLoad: function (e) {
    this.getProvince(this);
  },

  onReady: function () {
  
  },
  // 获取省份
  getProvince:function(that){
    wxAPI.postRequest(api.province,{
      account_id:wx.getStorageSync('account_id')
    }).then(res=>{
      if(res.data.status===0){
        let provinceList = res.data.data.provinceList;
        console.log(provinceList);
        for(let i=0;i<provinceList.length;i++){
          let name = provinceList[i].name;
        }
      }
    })
  },
  onShow: function () {
  
  },


  onHide: function () {
  
  },

  onUnload: function () {
  
  },

  onReachBottom: function () {
  
  },
})