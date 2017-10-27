const wxAPI = require('../../common/js/wxAPI');
const app = getApp();
import {api} from '../../config/api';

Page({
  data: {
    screenData:['地区筛选','医院等级','筛选科室']
  },
  onLoad:function(e){
    // this.setData({
    //   doctorId:e.doctor_id
    // })
  },
  onShow:function(){
    app.getHospitalPage(this);
  },

  onReachBottom: function () {
    // 下拉加载更多医院列表
    if (this.data.currentPage < this.data.pageCount) {
      app.getHospitalPage(this, {page:parseInt(this.data.currentPage) + 1});
    }
  },
});