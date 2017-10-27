const common = require('../../common/js/common');
const wxAPI = require('../../common/js/wxAPI');
const app = getApp();
import {api} from '../../config/api';

Page({
  data: {
    tabs: ['基本信息', '拜访记录', '相关资讯'],
    activeIndex: 1,
    doctorId: '',
    // 医生信息
    doctorInfo: {},
    defaultBool: true,
    defaultThirdDoctor:true
  },
  onLoad: function (e) {
    this.setData({
      doctorId: e.doctor_id
    })
  },
  onShow: function () {
    app.getDoctorDetail(this, this.data.doctorId);
    app.getTaskPage(this, this.data.doctorId, '2', '1');
  },

  // tab栏点击
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
    if ('0' === e.currentTarget.id) {
      app.getDoctorDetail(this, this.data.doctorId);
    }

    if ('2' === e.currentTarget.id) {
      app.getThirdDoctorDetail(this, this.data.third_party_id);
    }
  },
  toggleStar: function () {
    app.toggleStar(this, api.doctor_star_mark, this.data.doctorId);
  },
  onReachBottom: function () {
    if (this.data.currentPage < this.data.pageCount) {
      app.getTaskPage(this, this.data.doctorId, '2', parseInt(this.data.currentPage) + 1 + '');
    }
  }


});