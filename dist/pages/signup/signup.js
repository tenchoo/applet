"use strict";var _api=require("../../config/api"),wxApi=require("../../common/js/wxAPI");Page({data:{companyName:"",tel:"",btnCaptcha:"获取验证码",btnCaptchaState:!1,captcha:"",email:"",dotModule:""},onLoad:function(a){},blurCompanyName:function(a){this.setData({companyName:a.detail.value})},blurTel:function(a){this.setData({tel:a.detail.value})},blurCaptcha:function(a){this.setData({captcha:a.detail.value})},blurEmail:function(a){this.setData({email:a.detail.value})},blurInviteCode:function(a){this.setData({inviteCode:a.detail.value})},getCaptcha:function(){var a=this,t=this;new RegExp("^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$").test(this.data.tel)?wxApi.postRequest(_api.api.send_captcha,{mobile:this.data.tel}).then(function(e){if(0===e.data.status){var n=60;wx.showModal,t.setData({btnCaptchaState:!0,btnCaptcha:n+"s后重新获取"});var o=setInterval(function(){-1<--n?this.setData({btnCaptcha:n+"s后重新获取"}):(clearInterval(o),this.setData({btnCaptchaState:!1,btnCaptcha:"重新获取验证码"}))}.bind(a),1e3)}else wx.showModal&&wx.showModal({title:"提示",content:e.data.msg,showCancel:!1,confirmColor:"#50a0ff"})}):wx.showModal&&wx.showModal({title:"提示",content:"手机号错误",showCancel:!1,confirmColor:"#50a0ff"})},checkboxChange:function(a){console.log(a.detail.value),this.setData({dotModule:a.detail.value.join(",")})},submit:function(){var a=this,t=!1,e={phone:new RegExp("^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$"),email:new RegExp("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*")},n="",o=[!!this.data.companyName,e.phone.test(this.data.tel),!!this.data.captcha,e.email.test(this.data.email),!!this.data.dotModule],i=o[0],c=o[1],l=o[2],s=o[3],d=o[4];i&&l&&""!==this.data.tel&&d?c||""!==this.data.email?c||""===this.data.email||s?""===this.data.email||s?s&&!c?(t=!0,n="手机格式错误"):(t=!1,function(){var t={company_name:a.data.companyName,mobile:a.data.tel,captcha:a.data.captcha,email:a.data.email,dot_module:a.data.dotModule,open_id:wx.getStorageSync("open_id"),invite_code:a.data.inviteCode};wxApi.postRequest(_api.api.register,t).then(function(a){0===a.data.status&&(wx.setStorageSync("account_id",a.data.data.account_id),wx.reLaunch?wx.reLaunch({url:"../index/index"}):console.log("update your wechat"))})}()):(t=!0,n="邮件格式错误"):(t=!0,n="手机及邮件格式错误"):(t=!0,n="手机格式错误"):(t=!0,n="请填写完整"),wx.showModal&&t&&wx.showModal({title:"提示",content:n,showCancel:!1,confirmColor:"#50a0ff"})},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(){}});