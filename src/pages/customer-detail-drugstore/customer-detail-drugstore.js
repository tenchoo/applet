const common = require('../../common/js/common');
const wxAPI = require('../../common/js/wxAPI');
const app = getApp();
import {api} from '../../config/api';

Page({
  data: {
    tabs: ['基本信息', '拜访记录'],
    activeIndex: 0,
    defaultBool: true,
  },
  onLoad:function(e){
    this.setData({
      clientId: e.client_id
    });
  },
  onShow:function(e){
    app.getClientDetail(this,this.data.clientId);
    app.getTaskPage(this, this.data.clientId, '1', '1');
  },
  // tab栏点击
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
    if('1'===e.currentTarget.id){

    }
  },
  // 星标药店
  toggleStar:function(){
    app.toggleStar(this, api.client_star_mark, this.data.clientId,true);
  },
  onReachBottom: function () {
    if (this.data.currentPage < this.data.pageCount) {
      app.getTaskPage(this, this.data.doctorId, '1', parseInt(this.data.currentPage) + 1 + '');
    }
  }
});