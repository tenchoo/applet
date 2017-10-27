const wxAPI = require('../../common/js/wxAPI');
const app = getApp();
import {api} from '../../config/api';

Page({
  data: {
    screenData:['2017年7月','第二周'],
    screenBool:false,
    dateBool:false,
    weekBool:false,
    weeks:[],
  },

  onLoad: function (e) {
  
  },

  onReady: function () {
  
  },

  onShow: function () {
    const date= new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day=date.getDate();
    let years=[];
    let months = [];



    for(let i=2016;i<year+1;i++){
      years.push(i);
    }
    for(let i=1;i<13;i++){
      months.push(i);
    }
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    const lastDayOfWeek = this.getLastDayOfWeek(this,year,month);
    let leftWeek=[],rightWeek=[];
   if(firstDayOfWeek>0){
     // 上个月天数
     if(month<2){
       const nextMonthDays= this.getThisMonthDays(year-1,12);
       const firstWeekFirstDay = nextMonthDays-firstDayOfWeek+1;
       var firstWeekFirstDate = (year-1)+'-'+12+'-'+firstWeekFirstDay;
     }else{
       const nextMonthDays = this.getThisMonthDays(year,month-1);
       const firstWeekFirstDay = nextMonthDays-firstDayOfWeek+1;
       var firstWeekFirstDate = year+'-'+(month-1)+'-'+firstWeekFirstDay;
     }
     leftWeek.push(firstWeekFirstDate);
   }

   //  本月天数
    let weekIndex;
    const monthDays= this.getThisMonthDays(year,month);
    let j;
    if(firstDayOfWeek != 0){
      j=(7 - firstDayOfWeek + 1);
    }else{
      j=1;
    }

    for(let i=j;i<monthDays+1;i+=7){
      let k = year+'-'+month+'-'+i;
      leftWeek.push(k);
      if(i<=day&&day<i+7&&day-i<7){
       weekIndex = leftWeek.length-1;
      }
    }

    if(lastDayOfWeek==6){
      for(let i=j-1;i<monthDays+1;i+=7){
        rightWeek.push(year+'-'+month+'-'+i);
      }
    }else{
      for(let i=7;i<monthDays+1;i+=7){
        rightWeek.push(year+'-'+month+'-'+i);
      }
    }
    // 后一月
    if(lastDayOfWeek<6){
      rightWeek.push(year+'-'+(month+1)+'-'+(6-lastDayOfWeek));
    }
    let weeks=[];
    for(let i=0;i<5;i++){
      let k=leftWeek[i]+'~'+rightWeek[i];
      weeks.push(k)
    }


    this.setData({
      year,
      month,
      years,
      months,
      weekIndex,
      leftWeek,
      rightWeek,
      weeks,
      screenData:[year+'年'+ month +'月','第'+(weekIndex+1)+'周'],
      yearIndex:years.length-1,
      monthIndex:months.indexOf(month),
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
  selectYear:function(e){
    if(e){
      this.setData({
        yearIndex:e.target.dataset.index
      })
    }
  },
  selectMonth:function(e){
   if(e){
     this.setData({
       monthIndex:e.target.dataset.index
     })
   }
  },
  screen1:function(){
    let dateBool = this.data.dateBool;
    let weekBool = this.data.weekBool;
    let screenBool = this.data.screenBool;
    if(screenBool){
      if(!dateBool){
        this.setData({
          dateBool:true,
          weekBool:false,
        })
      }else{
        this.setData({
          dateBool:false,
          screenBool:false,
        })
      }
    }else{
      this.setData({
        dateBool:true,
        screenBool:true,
        weekBool:false,
      })
    }

  },
  screen2:function(){
    let weekBool = this.data.weekBool;
    let dateBool = this.data.dateBool;
    let screenBool = this.data.screenBool;
    if(screenBool){
      if(!weekBool){
        this.setData({
          weekBool:true,
          dateBool:false
        })
      }else{
        this.setData({
          screenBool:false,
          weekBool:false
        })
      }
    }else{
      this.setData({
        screenBool:true,
        weekBool:true,
        dateBool:false,
      })
    }
  },
  getWeek:function(e){
    if(e){
      let id = e.target.dataset.index;
      this.setData({
        weekIndex:id,
        screenBool:false,
        screenData:[this.data.year+'年'+ this.data.month +'月','第'+(id+1)+'周'],
      })
    }
  },
  onShareAppMessage: function () {
  
  }
})