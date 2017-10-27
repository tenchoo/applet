import {api} from 'config/api';
const wxAPI = require('common/js/wxAPI');

App({
  onLaunch: function () {
    // wx.reLaunch({
    //   url: 'pages/welcome/welcome'
    // })
  },

  globalData: {
    userInfo: {}
  },
  onShow: function () {

  },

  // 获取医生详情列表
  getDoctorDetail: function (that, doctorId) {
    wxAPI.postRequest(api.doctor_detail, {
      doctor_id: doctorId
    })
      .then((res) => {
        if (0 === res.data.status) {
          that.setData(res.data.data.doctorRow);
        }
      })
  },
  // 设置星标用户
  toggleStar: function (that, url, id,isClient) {
    let star = that.data.star_mark === '0' ? '1' : '0';
    let params={};
    if(isClient){
      params = {
        account_id: wx.getStorageSync('account_id'),
        client_id: id,
        star_mark: star
      };
    }else{
      params = {
        account_id: wx.getStorageSync('account_id'),
        doctor_id: id,
        star_mark: star
      };
    }

    wxAPI.postRequest(url, params)
      .then(res => {
        if (0 === res.data.status) {
          that.setData({
            star_mark: star
          })
        }
      })
  },
  // 拜访记录
  getTaskPage: function (that, id, cla, page) {
    that.setData({
      defaultBool:true
    });
    let params = {
      account_id: wx.getStorageSync('account_id'),
      visit_target_id: id,
      class: cla,
      page: page
    };
    wxAPI.postRequest(api.page, params)
      .then((res) => {
        if (0 === res.data.status) {
          let data = res.data.data;
          if ('1' === page) {
            that.setData({
              dataCount: data.dataCount,
              currentPage: data.currentPage,
              pageCount: data.pageCount,
              taskPage: data.page,
              defaultBool:false
            })
          } else {
            that.setData({
              defaultBool:false,
              currentPage: data.currentPage,
              taskPage: this.data.taskPage.concat(data.page)
            })
          }
        }else{
          that.setData({
            dataCount: '',
            currentPage: '',
            pageCount: '',
            taskPage: [],
            defaultBool:true
          })
        }
      })
  },
  // 第三方医生详情 id:third_party_id
  getThirdDoctorDetail: function (that, id) {
    that.setData({
      defaultThirdDoctor:true
    });
    wxAPI.postRequest(api.third_doctor_detail, {
      doctor_id: id
    })
      .then((res) => {
        if (0 === res.data.status) {
          let data = res.data.data;
          that.setData(data.docotrRow);
          that.setData(data.workTimeRow);
          that.setData(data.linkedDoctorList);
          that.setData({
            defaultThirdDoctor:false
          })
        }else{
          that.setData({
            defaultThirdDoctor:true
          })
        }
      })
  },
  // 第三方医院列表 云医生
  getHospitalPage: function (that, reqObj) {
    let params = {
      page: '1',
      search_text: '',
      level: '',
      dot_province_id: '',
      dot_city_id: '',
      is_exploited: ''
    };
    if (reqObj && Object.prototype.toString.call(reqObj) === '[object Object]') {
      for (let i in reqObj) {
        if (params.hasOwnProperty(i)) params[i] = reqObj[i];
      }
    }
    wxAPI.postRequest(api.third_hospital_page, params)
      .then(res => {
        if (0 === res.data.status) {
          let data = res.data.data;
          if ('1' === params.page) {
            that.setData({
              updateTime: data.updateTime,
              dataCount: data.dataCount,
              pageCount: data.pageCount,
              currentPage: data.currentPage,
              hospitalPage: data.hospitalPage,
            })
          } else {
            that.setData({
              updateTime: data.updateTime,
              currentPage: data.currentPage,
              hospitalPage: that.data.hospitalPage.concat(data.hospitalPage),
            })
          }

        } else {
          console.log(res.data.msg);
        }
      })
  },
  // 选择图片
  chooseImg: function (that) {
    if (wx.chooseImage) {
      let chooseImgObj = {
        count: 9,
      };
      if (!that.data.photoLists || !that.data.photoLists[0]) {
        that.setData({
          photoLists: [],
        });
      }
      wxAPI.wxPromiseObj(wx.chooseImage, chooseImgObj)
        .then(res => {
          let photoLists = that.data.photoLists;
          photoLists = photoLists.concat(res.tempFilePaths);
          that.setData({
            photoLists: photoLists
          })
        })
    }
  },
  // 预览图片
  previewImg: function (current, urls) {
    if (wx.previewImage) {
      wx.previewImage({
        current: current,
        urls: urls,
      })
    }
  },
  // 获取附近医院
  getNearbyHospital: function (that, page) {
    // 获取位置信息
    wxAPI.getLocation()
      .then(res => {
        let params = {
          lat: res.latitude,
          lng: res.longitude,
          page: page
        };
        wxAPI.postRequest(api.nearby_hospital_page, params)
          .then(res => {
            if (res.data.status === 0) {
              let data = res.data.data;
              let hospitalPage = data.hospitalPage;
              for (let i = 0; i < hospitalPage.length; i++) {
                let distance = hospitalPage[i].distance;
                hospitalPage[i].distance = (Math.floor(distance / 10)) / 100;
              }
              if ('1' === page) {
                that.setData({
                  dataCount: data.dataCount,
                  currentPage: data.currentPage,
                  pageCount: data.pageCount,
                  hospitalPage: hospitalPage
                })
              } else {
                that.setData({
                  currentPage: data.currentPage,
                  hospitalPage: that.data.hospitalPage.concat(hospitalPage)
                })
              }
            }
          })
      })
  },
  // 获取附近药店
  // 获取药店详情
  getClientDetail:function(that,id){
    wxAPI.postRequest(api.client_detail,{
      client_id:id
    }).then(res=>{
      if(0===res.data.status){
        let data=res.data.data;
        that.setData(data);
        that.setData({
          star_mark:data.clientRow.star_mark
        })
      }else{
        console.log(res.data.msg);
      }
    })
  },
});
