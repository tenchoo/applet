const wxAPI = require('../../common/js/wxAPI');
const app = getApp();
import {api} from '../../config/api';

Page({

  data: {
    screenData: ['地区筛选', '是否连锁', '是否医保'],
    // 药店列表
    pharmacyPage: [],
  },
  onLoad: function (e) {
    this.setData({
      clientId: e.client_id
    })
  },
  onShow: function () {
    this.getThirdDrugstore(this);
  },
  getThirdDrugstore: function (that, reqObj) {
    let params = {
      account_id: wx.getStorageSync('account_id'),
      page: '1',
      search_text: '',
      province_id: '',
      city_id: '',
      area_id: '',
      brand: '',
      is_exploited: '',
    };

    if (reqObj && Object.prototype.toString.call(reqObj) === '[object Object]') {
      for (let i in reqObj) {
        if (params.hasOwnProperty(i)) params[i] = reqObj[i];
      }
    }

    wxAPI.postRequest(api.third_pharmacy, params)
      .then(res => {
        if (0 === res.data.status) {
          let data = res.data.data;
          if ('1' === params.page) {
            that.setData({
              dataCount: data.dataCount,
              currentPage: data.currentPage,
              pageCount: data.pageCount,
              pharmacyPage: data.pharmacyPage
            })
          } else {
            that.setData({
              currentPage: data.currentPage,
              pharmacyPage: this.data.pharmacyPage.concat(data.pharmacyPage)
            });
          }
        } else {
          console.log(res.data.msg);
        }
      })
  },

  onReachBottom: function () {
    // console.log(this.data.currentPage + this.data.pageCount);
    // 下拉加载更多药店列表
    let currentPage = this.data.currentPage;
    let pageCount = this.data.pageCount;
    if(currentPage<pageCount){
      console.log('aa');
    }else{
      console.log(currentPage);
      console.log(pageCount);
      console.log('bb');
    }
    if (this.data.currentPage < this.data.pageCount) {
      console.log('s');
      this.getThirdDrugstore(this, {
        page: parseInt(this.data.currentPage) + 1 + '',
      });
    }
  },

});