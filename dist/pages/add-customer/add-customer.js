"use strict";var _api=require("../../config/api"),wxAPI=require("../../common/js/wxAPI"),app=getApp();Page({data:{},onLoad:function(t){this.setData({doctorId:t.doctor_id})},onShow:function(t){app.getDoctorDetail(this,this.data.doctorId)},addCustomer:function(){var t={account_id:wx.getStorageSync("account_id")};wxAPI.postRequest(_api.api.add_doctor,t).then(function(t){0===t.data.status&&(wx.showToast?wx.showToast({title:"修改成功",icon:"success"}):console.log("update your wechat"))})}});