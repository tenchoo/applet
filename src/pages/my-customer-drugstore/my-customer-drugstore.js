const common = require('../../common/js/common');
const wxAPI = require('../../common/js/wxAPI');
const app = getApp();
import {api} from '../../config/api';

Page({
  data: {
    // 搜索框
    placeHolder: '请输入药店名称',
    // 筛选
    screenItem_1: '药店等级',
    screenItem_2: '是否连锁',
    screenItem_3: '是否医保',
    // 当前页数,总页数,医生列表,医生总数
    currentPage: '1',
    pageCount: '',
    clientPage: [],
    dataCount: '',
    floatBtnTapData: false,
    defaultBool:true,
  },
  onShow:function(){
    // 调用搜索框
    common.searchGroup.apply(this, []);
    this.getClientPage(this, '1');
    this.getStarClientPage(this);
  },
  onHide:function(){
    this.setData({
      floatBtnTapData:false
    })
  },
  // 获取星标药店
  getStarClientPage:function(that){
    wxAPI.postRequest(api.star_pharmacy_list,{
      account_id:wx.getStorageSync('account_id')
    }).then(res=>{
      if(0===res.data.status){
        that.setData({
          starClientList:res.data.data.starList,
          defaultBool:false
        })
      }else{
        that.setData({
          starClientList:[],
        })
      }
    })

  },
  // 获取药店列表
  getClientPage: function (that, page) {
    let params = {
      account_id: wx.getStorageSync('account_id'),
      page: page
    };
    wxAPI.postRequest(api.pharmacy_page, params)
      .then((res) => {
        console.log(res);
        if (0 === res.data.status) {
          let data = res.data.data;
          if ('1' === page) {
            that.setData({
              dataCount: data.dataCount,
              currentPage: data.currentPage,
              pageCount: data.pageCount,
              clientPage: data. clientPage,
              defaultBool:false
            })
          } else {
            that.setData({
              currentPage: data.currentPage,
              defaultBool:false,
              clientPage: this.data.clientPage.concat(data. clientPage)
            });
          }
        }else{
          that.setData({
            defaultBool:true,
            dataCount: '',
            currentPage: '',
            pageCount: '',
            clientPage: [],
          })
        }
      })
  },

  onReachBottom: function () {
    // 下拉加载更多药店列表
    if (this.data.currentPage < this.data.pageCount) {
      this.getClientPage(this, parseInt(this.data.currentPage) + 1+'');
    }
  },


  floatBtnTap: function () {
    let floatBtn = !this.data.floatBtnTapData;
    this.setData({
      floatBtnTapData: floatBtn
    })

  },

});