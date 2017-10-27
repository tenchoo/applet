const common = require('../../common/js/common');
const wxAPI = require('../../common/js/wxAPI');
const app = getApp();
import {api} from '../../config/api';

Page({
  data: {
    // 搜索框
    placeHolder: '请输入医生姓名',
    // 筛选
    screenItem_1: '医院等级',
    screenItem_2: '医生等级',
    screenItem_3: '筛选科室',
    // 当前页数,总页数,医生列表,医生总数
    currentPage: '1',
    pageCount: '',
    doctorPage: [],
    dataCount: '',
    floatBtnTapData: false,
    defaultBool:true,
  },

  onShow: function () {
    // 调用搜索框
    common.searchGroup.apply(this, []);
    this.getDoctorPage(this, '1');
    this.getStarDoctorList(this);
  },
  onHide:function(){
    this.setData({
      floatBtnTapData:false
    })
  },

  // 获取星标用户
  getStarDoctorList: function (that) {
    wxAPI.postRequest(api.star_doctor_list, {
      account_id: wx.getStorageSync('account_id')
    })
      .then((res) => {
        if (0 === res.data.status) {
          that.setData({
            defaultBool:false,
            starDoctorList: res.data.data.starList
          })
        }else{
          that.setData({
            starDoctorList:[]
          })
        }
      })
  },

  // 获取医生列表
  getDoctorPage: function (that, page) {
    let params = {
      account_id: wx.getStorageSync('account_id'),
      page: page
    };
    wxAPI.postRequest(api.doctor_page, params)
      .then((res) => {
        if (0 === res.data.status) {
          let data = res.data.data;
          if ('1' === page) {
            that.setData({
              dataCount: data.dataCount,
              currentPage: data.currentPage,
              pageCount: data.pageCount,
              doctorPage: data.doctorPage,
              defaultBool:false
            })
          } else {
            that.setData({
              defaultBool:false,
              currentPage: data.currentPage,
              doctorPage: this.data.doctorPage.concat(data.doctorPage)
            });
          }
        }else{
          that.setData({
            defaultBool:true,
            dataCount: '',
            currentPage: '',
            pageCount: '',
            doctorPage: [],
          })
        }
      })
  },

  onReachBottom: function () {
    // 下拉加载更多医生列表
    if (this.data.currentPage < this.data.pageCount) {
      this.getDoctorPage(this, parseInt(this.data.currentPage) + 1+'');
    }
  },
  floatBtnTap: function () {
    let floatBtn = !this.data.floatBtnTapData;
    this.setData({
      floatBtnTapData: floatBtn
    })

  },
  // 长按删除
  delSelf: function (e) {
    let id = e.currentTarget.id;
    wxAPI.showModal('', '是否删除该客户？', '删除')
      .then(res => {
        if(res.confirm){
          wxAPI.postRequest(api.doctor_delete,{
            doctor_id: id
          })
            .then(res=>{
              if(0 === res.data.status){
                let obj = {
                  title: '操作成功',
                  icon:'success',
                };
                wxAPI.wxPromiseObj(wx.showToast,obj)
                  .then(res=>{
                    wx.navigateTo({
                      url:'my-customer'
                    })
                  })
              }
            })
        }
      })
  },
});