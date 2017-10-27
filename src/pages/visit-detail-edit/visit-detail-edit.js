const wxAPI = require('../../common/js/wxAPI');
import {api} from '../../config/api';
const app = getApp();

Page({

  data: {
    // 沟通事项，沟通产品，经度，纬度
    summary: '',
    dot_goods: '',
    lat: '',
    lng: '',
  },

  onLoad: function (options) {

  },

  onShow: function () {

  },
  // 选择图片
  choosePhoto: function () {
    let _this = this;
    app.chooseImg(_this);
  },
  // 预览图片
  previewPhoto:function(e){
    let _this = this;
    app.previewImg(e.target.dataset.src,_this.data.photoLists);
  },
  // 修改未拜访任务详情
  editTask: function (that, reqObj) {
    let params = {
      account_id: wx.getStorageSync('account_id'),
      task_id: taskId,
      summary: that.data.summary,
      dot_goods: that.data.dot_goods,
      lat: that.data.lat,
      lng: that.data.lng,
    };
    if (reqObj && Object.prototype.toString.call(reqObj) === '[object Object]') {
      for (let i in reqObj) {
        if(params.hasOwnProperty(i)) params[i] = reqObj[i];
      }
    }
    wxAPI.postRequest(api.task_save, params)
      .then(res => {
        if (0 === res.data.status) {
          console.log(res);
        } else {
          console.log(res.data.msg);
        }
      })
  },
  delSelfImg:function(e){
    wxAPI.showModal('', '是否删除该图片？', '删除')
      .then(res => {
        if(res.confirm){
          let photoLists = this.data.photoLists;
          photoLists.splice(e.currentTarget.dataset.index,1);
          this.setData({
            photoLists:photoLists,
          })
        }
      })
    console.log(e.currentTarget.dataset.index);

  },
  // 上传图片
  uploadPhoto: function (that, taskId, fileName) {
    let params = {
      account_id: wx.getStorageSync('account_id'),
      task_id: taskId,
      file_name: fileName,
    };
    wxAPI.postRequest(api.upload_photo, params)
      .then(res => {
        if (0 === res.data.status) {
          console.log(res);
        } else {
          console.log(res.data.msg);
        }
      })
  },
});