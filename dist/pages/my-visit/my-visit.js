"use strict";var _api=require("../../config/api"),wxAPI=require("../../common/js/wxAPI");Page({data:{yearSelected:"2016",monthSelected:"4",selectedMonthData:[],selectedDayData:[]},onLoad:function(t){},onShow:function(){this.getTaskJourney(this)},getTaskJourney:function(t){var a={account_id:wx.getStorageSync("account_id"),year:t.data.yearSelected,month:t.data.monthSelected};wxAPI.postRequest(_api.api.journey,a).then(function(a){if(0===a.data.status){var e=a.data.data;t.setData({selectedMonthData:e})}else console.log(a.data.msg)})},getDayTaskJournry:function(t,a){var e=selectedMonthData[a].taskList;e&&t.setData({selectedDayData:e})}});