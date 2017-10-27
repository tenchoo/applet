const wxAPI = require('../../common/js/wxAPI');
const animation = require('../../common/js/animation');
const app = getApp();
import {api} from '../../config/api';

Page({
  data: {
    province:'北京',
    // 今日行程
    todayTripData:[],
    // 小蜜蜂分享动画
    achievementShareBee: {},
    achievementShareBtn: {},
    achievementShareHeart: {},
    // 公告板动画
    noticeBoard: {},
    noticeBoardPadding: '20rpx 26rpx 20rpx 16rpx',
    // banner内容
    bannerUrl: [{
        imgUrl: '../../img/img_banner_home.png',
        navUrl: ''
      },
      {
        imgUrl: '../../img/img_banner_home.png',
        navUrl: ''
      },
      {
        imgUrl: '../../img/img_banner_home.png',
        navUrl: ''
      }
    ],
    // 公告内容
    noticeContent: [{
      url: '',
      content: '拜访记录只保留近3个月的数据，您可以通过积分延长数据保留时间。（可在我的积分中查看延长规则）'
    }]
  },


  onLoad: function() {
    setTimeout(function() {
      this.setData({
        noticeBoardPadding: 0
      })
    }.bind(this), 1200);
  },
  onShow: function() {

    wxAPI.getSetting('scope.userLocation')
      .then(res => {
        if (!res) {
          wxAPI.authorize('scope.userLocation')
            .then(() => {
              wxAPI.getSetting('scope.userLocation')
                .then(res => {
                  // app.getNearbyHospital(this, '1');
                })
            })
        } else {
          // app.getNearbyHospital(this, '1');
        }
      });

    this.setData({
      achievementShareBee: animation.achievementShareBeeShow,
      achievementShareBtn: animation.achievementShareBtnShow,
      achievementShareHeart: animation.achievementShareHeartShow,
      noticeBoard: animation.noticeBoardHide
    });
    this.getTodayTrip();
  },

  onHide: function() {
    this.setData({
      achievementShareBee: animation.achievementShareBeeHide,
      achievementShareBtn: animation.achievementShareBtnHide,
      achievementShareHeart: animation.achievementShareBtnHide,
    });
  },
  // 登陆


  // 成就分享
  shareAchievementUrl: function() {
    let achievementUrlObj = {
      url: '../achievement/achievement'
    };
    wxAPI.wxPromiseObj(wx.navigateTo, achievementUrlObj)
      .then((res) => {
        console.log('成就页面跳转成功');
      })
  },
  // 今日行程
  getTodayTrip: function() {
    let _this = this;
    wxAPI.postRequest(api.today, {
        account_id: wx.getStorageSync('account_id')
      })
      .then((res) => {
        if (0 === res.data.status) {
          console.log(res);
          _this.setData({
            todayTripData:res.data.data.taskList
          })
        }else{
          _this.setData({
            todayTripData:[]
          })
        }
      })
  },
  // 清空数据
  clearData: function() {
    let clearDataObj = {
      title: '',
      content: '您的拜访记录将被清空,清空后无法恢复，请确认是否继续？',
      confirmText: '继续',
      confirmColor: '#50a0ff',
      cancelColor: '#a6a8b6'
    };
    wxAPI.wxPromiseObj(wx.showModal, clearDataObj)
      .then((res) => {
        if (!res.cancel) {
          wxAPI.postRequest(api.clean, {
              account_id: wx.getStorageSync('account_id')
            })
            .then((res) => {
              if (0 === res.data.status) {
                wx.showToast({
                  title: '清除成功',
                  icon: 'success'
                })
              } else {
                console.log(res.data.msg);
              }
            })
        }
      })
  },
  // 更多功能
  floatBtnTap: function () {
    let floatBtn = !this.data.floatBtnTapData;
    this.setData({
      floatBtnTapData: floatBtn
    })

  },
});
