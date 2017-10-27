import {api} from '../../config/api';
const wxAPI = require('../../common/js/wxAPI');
const app = getApp();

Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
    this.login(this);
  },
  // 登录
  login: function (that) {
    wxAPI.login()
      .then((res) => {
        if (res.code) {
          let code = res.code;
          // 验证是否获取权限
          wxAPI.getSetting('scope.userInfo')
            .then((res) => {
              // 未授权
              if (!res) {
                // 获取获取用户信息权限
                wxAPI.authorize('scope.userInfo')
                  .then(() => {
                    wxAPI.getSetting('scope.userInfo')
                      .then(res => {
                        // 授权成功
                        if (res) {
                          that.getUserInfo(code,this,app);
                        } else {
                          // 授权失败

                        }
                      })
                  })
              } else {
                // 已授权
               that.getUserInfo(code,this,app);
              }
            })
        }
      })
  },
  // 获取用户信息
  getUserInfo: function (code,that,app) {
    // 获取用户信息
    wxAPI.getUserInfo(true)
      .then((res) => {
        app.globalData.userInfo = res.userInfo;
        return wxAPI.postRequest(api.check_bind, {code})
      })
      .then((res) => {
        console.log(res);
        if (0 === res.data.status) {
          let accountRow = res.data.data.accountRow;
          wx.setStorageSync('open_id', accountRow.open_id);
          if ('1' === accountRow.is_bind) {
            wx.setStorageSync('account_id', accountRow.account_id);
            wx.switchTab({
              url:'../index/index'
            })
          } else {
            wx.redirectTo({
              url: '../signup/signup'
            })
          }
        } else {

        }
      })
  },
})