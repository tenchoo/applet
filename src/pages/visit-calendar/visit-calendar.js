const wxAPI = require('../../common/js/wxAPI');
const app = getApp();
import {api} from '../../config/api';

Page({

  data: {
    calendarWeek: ['日', '一', '二', '三', '四', '五', '六'],
    modalBool: false,
    pickerVal:[],
    pickerBool:false,
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {
    this.calendar(this);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const years = [];
    const months = [];
    this.setData({
      year,
      month
    });
    for(let i=2000;i<=year+5;i++){
      years.push(i)
    }
    for(let j=1;j<13;j++){
      months.push(j);
    }

    this.setData({
      years,
      months,
    });

    this.setData({
      pickerVal:[years.indexOf(year),months.indexOf(month)]
    })

  },
  // 日历
  calendar: function (that) {
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;

    this.renderDay(this, currentYear, currentMonth);
    that.setData({
      currentYear,
      currentMonth
    });


  },
  // 计算每月有多少天
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  // 计算每月第一天是星期几
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  // 计算每月最后一天星期几
  getLastDayOfWeek(that, year, month) {
    let dayNum = that.getThisMonthDays(year, month);
    return new Date(Date.UTC(year, month - 1, dayNum)).getDay();
  },
  // 计算天
  renderDay: function (that, year, month) {

    let firstDayWeek = that.getFirstDayOfWeek(year, month);
    let prevMonthDayNum;
    if (month < 2) {
      prevMonthDayNum = that.getThisMonthDays(year - 1, 11)
    } else {
      prevMonthDayNum = that.getThisMonthDays(year, month - 1);
    }


    let prevMonthDays = []; //显示前一月份日数
    let nextMonthDays = []; //显示后一月份日
    if (firstDayWeek > 0) {
      for (let i = 0; i < firstDayWeek; i++) {
        prevMonthDays.unshift(prevMonthDayNum - i);
      }
    }

    let lastDayOfWeek = that.getLastDayOfWeek(that, year, month);
    if (lastDayOfWeek < 6) {
      for (let i = 0; i < 6 - lastDayOfWeek; i++) {
        nextMonthDays.push(i + 1);
      }
    }
    // 获取行程信息
    // 上月
    let prevParams = null;
    if (month < 2) {
      prevParams = {
        account_id: wx.getStorageSync('account_id'),
        year: year - 1,
        month: 12
      };
    } else {
      prevParams = {
        account_id: wx.getStorageSync('account_id'),
        year: year,
        month: month - 1
      };
    }

    // 当月
    let params = {
      account_id: wx.getStorageSync('account_id'),
      year: year,
      month: month,
    };
    // 下月
    let nextParams = null;
    if (month > 11) {
      nextParams = {
        account_id: wx.getStorageSync('account_id'),
        year: year + 1,
        month: 1
      };
    } else {
      nextParams = {
        account_id: wx.getStorageSync('account_id'),
        year: year,
        month: month + 1
      };
    }

    // 上月
    if (prevMonthDays.length > 0) {

      wxAPI.postRequest(api.journey, prevParams)
        .then(res => {
          if (0 === res.data.status) {
            let data = res.data.data;
            let prevMonthData = [];
            for (let i = 0; i < prevMonthDays.length; i++) {
              let j = prevMonthDays[i]-1;
              let cont = {
                ind: j+1,
                date: data[j].date,
                taskList: data[j].taskList
              };
              prevMonthData.push(cont);
            }
            that.setData({
              prevMonthData
            });
          } else {
            console.log(res.data.msg);
          }
        });
    }else{
      that.setData({
        prevMonthData:[]
      })
    }
    // 本月
    wxAPI.postRequest(api.journey, params)
      .then(res => {
        if (0 === res.data.status) {
          let data = res.data.data;
          that.setData({
            monthData: data
          });
        } else {
          console.log(res.data.msg);
        }
      });
    // 下月
    if (nextMonthDays.length > 0) {

      wxAPI.postRequest(api.journey, nextParams)
        .then(res => {
          if (0 === res.data.status) {
            let data = res.data.data;
            let nextMonthData = [];
            for (let i = 0; i < nextMonthDays.length; i++) {
              let cont = {
                date: data[i].date,
                taskList: data[i].taskList
              };
              nextMonthData.push(cont);
            }


            that.setData({
              nextMonthData
            });
          } else {
            console.log(res.data.msg);
          }
        });
    }else{
      that.setData({
        nextMonthData:[]
      })
    }

    that.setData({
      prevMonthDays,
      nextMonthDays
    })

  },
  getPrevDayTask:function(e){
    if(e){
      let id = e.target.dataset.prev;
      this.getData(this,id,this.data.prevMonthData);
    }
  },
  getDayTask: function (e) {
    if(e){
      let id = e.target.dataset.id;
      this.getData(this,id,this.data.monthData);
    }
  },
  getNextDayTask:function(e){
    if(e){
      let id = e.target.dataset.nex;
      this.getData(this,id,this.data.nextMonthData);
    }
  },
  // 获取所选日期数据
  getData:function(that,id,d){

    let data = d[id];
    // 所选日期任务
    if(data.taskList){
      let selectTaskList = data.taskList;
      if(selectTaskList.length){
        let date=new Date(data.date);
        // 所选日期
        let selectDate = date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日';

        that.setData({
          selectDate,
          selectTaskList,
          modalBool:true,
        })
      }
    }

  },
  // 关闭模态框
  closeModal:function(){
    this.setData({
      modalBool:false
    })
  },
  // 筛选日期
  changeDate:function(e){
    let val=e.detail.value;
    let year=this.data.years[val[0]];
    let month=this.data.months[val[1]];
    this.setData({
      tempYear:year,
      tempMonth:month,
      tempYearIndex:val[0],
      tempMonthIndex:val[1],
    })
  },
  pickerSure:function(){
    this.renderDay(this, this.data.tempYear, this.data.tempMonth);
    this.setData({
      year:this.data.tempYear,
      month:this.data.tempMonth,
      pickerVal:[this.data.tempYearIndex,this.data.tempMonthIndex],
      pickerBool:false
    });
  },
  pickerCancel:function(){
    this.setData({
      pickerBool:false
    })
  },
  viewDataPicker:function(){
    if(this.data.pickerBool){
      this.setData({
        pickerBool:false
      })
    }else{
      this.setData({
        pickerBool:true
      })
    }

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },


  onShareAppMessage: function () {

  }
})