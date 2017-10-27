const wxAPI = require('../../common/js/wxAPI');
import {api} from '../../config/api';

Page({
  data: {
  
  },
  onLoad: function (e) {
    console.log(e);
    this.setData({
      task_id:e.task_id
    });
  },
  onShow:function(){
    this.getVisitDetail(this,this.data.task_id);
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    this.setData({
      year,
      month,
      day,
    })
  },
  // 查看大图
  viewPhoto:function(e){
    console.log(e);
  },
  // 获取拜访详情
  getVisitDetail:function(that,taskId){
    let params = {
      account_id:wx.getStorageSync('account_id'),
      task_id: taskId,
    };
    wxAPI.postRequest(api.task_detail,params)
      .then(res=>{
        // that.setData({
        //   status:res.data.status
        // });

        if(0 === res.data.status){
          console.log(res);
          let data = res.data.data;
          that.setData(data);
        }else{
          console.log(res.data.msg);
        }
      })
  },
});