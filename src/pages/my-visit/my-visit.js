const wxAPI = require('../../common/js/wxAPI');
import {api} from '../../config/api';

Page({
  data: {
    yearSelected:'2016',
    monthSelected:'4',
    // 所选月的数据
    selectedMonthData:[],
    // 所选日的数据
    selectedDayData:[],
  },

  onLoad: function (e) {
  
  },

  onShow: function () {
    this.getTaskJourney(this);
  },
  // 获取所选年月的数据
  getTaskJourney:function(that){
    let params = {
      account_id:wx.getStorageSync('account_id'),
      year:that.data.yearSelected,
      month:that.data.monthSelected
    };
    wxAPI.postRequest(api.journey,params)
      .then(res => {
        if(0 === res.data.status){

          let data = res.data.data;
          that.setData({
            selectedMonthData:data
          })
        }else{
          console.log(res.data.msg);
        }
      })
  },
  // 获取选中日的数据
  getDayTaskJournry:function(that,num){
    let data = selectedMonthData[num].taskList;
    if(data) {
      that.setData({
        selectedDayData:data
      });
    }
  }
});