const wxAPI = require('../../common/js/wxAPI');
import {api} from '../../config/api';

const app = getApp();
Page({
  data: {},
  onLoad: function (e) {
    this.setData({
      doctorId: e.doctor_id
    });
  },
  onShow: function (options) {
    app.getDoctorDetail(this, this.data.doctorId);
  },
  addCustomer: function () {
    let params = {
      account_id:wx.getStorageSync('account_id'),
    };
    wxAPI.postRequest(api.add_doctor,params)
      .then((res)=>{
      if(0 === res.data.status){
        if(wx.showToast){
          wx.showToast({
            title:'修改成功',
            icon:'success'
          })
        }else{
          console.log('update your wechat');
        }
      }
      })
  }

});