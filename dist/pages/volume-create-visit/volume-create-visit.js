"use strict";var _api=require("../../config/api"),wxAPI=require("../../common/js/wxAPI");Page({data:{},onLoad:function(o){},onShow:function(){},createVisit:function(){wx.getStorageSync("account_id");wx.showModal&&wx.showModal({title:"提示",content:"创建成功！是否继续创建拜访计划？",confirmColor:"#50a0ff"})}});