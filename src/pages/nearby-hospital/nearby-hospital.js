const wxAPI = require('../../common/js/wxAPI');
import {api} from '../../config/api';

const app = getApp();

Page({
  data: {
    hospitalPage: [],
  },

  onLoad: function (e) {


  }
  ,

  onReady: function () {

  },

  onShow: function () {
    wxAPI.getSetting('scope.userLocation')
      .then(res => {
        if (!res) {
          wxAPI.authorize('scope.userLocation')
            .then(() => {
              wxAPI.getSetting('scope.userLocation')
                .then(res => {
                  if(res){
                    app.getNearbyHospital(this, '1');
                  }
                })
            })
        } else {
          app.getNearbyHospital(this, '1');
        }
      });
  },


  onReachBottom: function () {
    // 下拉加载更多药店列表
    if (this.data.currentPage < this.data.pageCount) {
      app.getNearbyHospital(this, parseInt(this.data.currentPage) + 1 + '');
    }
  },
})