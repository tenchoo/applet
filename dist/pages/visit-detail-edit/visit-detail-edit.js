"use strict";var _api=require("../../config/api"),wxAPI=require("../../common/js/wxAPI"),app=getApp();Page({data:{summary:"",dot_goods:"",lat:"",lng:""},onLoad:function(t){},onShow:function(){},choosePhoto:function(){var t=this;app.chooseImg(t)},previewPhoto:function(t){var a=this;app.previewImg(t.target.dataset.src,a.data.photoLists)},editTask:function(t,a){var o={account_id:wx.getStorageSync("account_id"),task_id:taskId,summary:t.data.summary,dot_goods:t.data.dot_goods,lat:t.data.lat,lng:t.data.lng};if(a&&"[object Object]"===Object.prototype.toString.call(a))for(var e in a)o.hasOwnProperty(e)&&(o[e]=a[e]);wxAPI.postRequest(_api.api.task_save,o).then(function(t){0===t.data.status?console.log(t):console.log(t.data.msg)})},delSelfImg:function(t){var a=this;wxAPI.showModal("","是否删除该图片？","删除").then(function(o){if(o.confirm){var e=a.data.photoLists;e.splice(t.currentTarget.dataset.index,1),a.setData({photoLists:e})}}),console.log(t.currentTarget.dataset.index)},uploadPhoto:function(t,a,o){var e={account_id:wx.getStorageSync("account_id"),task_id:a,file_name:o};wxAPI.postRequest(_api.api.upload_photo,e).then(function(t){0===t.data.status?console.log(t):console.log(t.data.msg)})}});