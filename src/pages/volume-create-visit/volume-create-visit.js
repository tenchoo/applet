const wxAPI = require('../../common/js/wxAPI');
import {api} from '../../config/api';

Page({

  data: {},

  onLoad: function (options) {

  },

  onShow: function () {

  },
  // 创建拜访
  createVisit: function () {
    let params = {
      account_id:wx.getStorageSync('account_id'),
    };
    // wxAPI.postRequest(api.task_add,params)
    if (wx.showModal) {
      wx.showModal({
        title: '提示',
        content: '创建成功！是否继续创建拜访计划？',
        confirmColor: '#50a0ff'
      })
    }
  },

});