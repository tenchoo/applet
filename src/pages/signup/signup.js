const wxApi = require('../../common/js/wxAPI');
import {api} from '../../config/api';

Page({
  data: {
    companyName: '',
    tel: '',
    btnCaptcha: '获取验证码',
    btnCaptchaState: false,
    captcha: '',
    email: '',
    dotModule: ''
  },
  onLoad: function (options) {

  },
  // 失去焦点
  blurCompanyName: function (e) {
    this.setData({
      companyName: e.detail.value
    })
  },
  blurTel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  blurCaptcha: function (e) {
    this.setData({
      captcha: e.detail.value
    })
  },
  blurEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  blurInviteCode:function(e){
    this.setData({
      inviteCode: e.detail.value
    })
  },
  // 获取验证码
  getCaptcha: function () {
    let _this = this;
    let phone = new RegExp('^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$');
    if (phone.test(this.data.tel)) {
      wxApi.postRequest(api.send_captcha, {mobile: this.data.tel})
        .then((res) => {
          if (0 === res.data.status) {
            let timeNum = 60;
            if (wx.showModal) {
              // wx.showModal({
              //   title: '提示',
              //   content: '发送成功',
              //   showCancel: false,
              //   confirmColor: '#50a0ff'
              // })
            }
            _this.setData({
              btnCaptchaState: true,
              btnCaptcha: timeNum + 's后重新获取'
            });

            let timer = setInterval(
              function () {
                timeNum--;
                if(-1 < timeNum){
                  this.setData({
                    btnCaptcha: timeNum + 's后重新获取'
                  });
                }else{
                  clearInterval(timer);
                 this.setData({
                    btnCaptchaState: false,
                    btnCaptcha: '重新获取验证码'
                  });
                }
              }.bind(this)
              , 1000)

          } else {
            if (wx.showModal) {
              wx.showModal({
                title: '提示',
                content: res.data.msg,
                showCancel: false,
                confirmColor: '#50a0ff'
              })
            }
          }
        });
    } else {
      if (wx.showModal) {
        wx.showModal({
          title: '提示',
          content: '手机号错误',
          showCancel: false,
          confirmColor: '#50a0ff'
        })
      }
    }

  },
  // checkbox选择
  checkboxChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      dotModule: e.detail.value.join(',')
    })
  },
  // 提交注册信息
  submit: function () {
    let _this = this;
    // 验证
    let failRegex = false;
    const regex = {
      phone: new RegExp('^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$'),
      email: new RegExp('\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*'),
    };
    let modalContent = '';
    let [companyNameBool, phoneBool, captchaBool, emailBool, dotModuleBool] = [!!this.data.companyName, regex.phone.test(this.data.tel), !!this.data.captcha, regex.email.test(this.data.email), !!this.data.dotModule];
    if (!companyNameBool || !captchaBool || this.data.tel === '' || !dotModuleBool) {
      [failRegex, modalContent] = [true, '请填写完整'];
    } else if (!phoneBool && this.data.email === '') {
      [failRegex, modalContent] = [true, '手机格式错误'];
    } else if (!phoneBool && this.data.email !== '' && !emailBool) {
      [failRegex, modalContent] = [true, '手机及邮件格式错误'];
    } else if (this.data.email !== '' && !emailBool) {
      [failRegex, modalContent] = [true, '邮件格式错误'];
    } else if (emailBool && !phoneBool) {
      [failRegex, modalContent] = [true, '手机格式错误'];
    } else {
      failRegex = false;
      toSubmit();
    }
    if (wx.showModal && failRegex) {
      wx.showModal({
        title: '提示',
        content: modalContent,
        showCancel: false,
        confirmColor: '#50a0ff'
      })
    }

    // 提交注册
    function toSubmit() {
      let params = {
        company_name: _this.data.companyName,
        mobile: _this.data.tel,
        captcha: _this.data.captcha,
        email: _this.data.email,
        dot_module: _this.data.dotModule,
        open_id: wx.getStorageSync('open_id'),
        invite_code:_this.data.inviteCode
      };
      wxApi.postRequest(api.register, params)
        .then((res) => {
          if(0 === res.data.status){
            wx.setStorageSync('account_id',res.data.data.account_id);
            if(wx.reLaunch){
              wx.reLaunch({
                url:'../index/index'
              })
            }else{
              console.log('update your wechat');
            }
          }
        })
    }

  },

  onReady: function () {

  },
  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },


  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
});