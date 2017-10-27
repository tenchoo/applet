import {api} from '../../config/api';
const wxAPI = require('../../common/js/wxAPI');

Page({

  data: {
    departmentList:[],
  },
  onLoad:function(e){
    let hospital = e.hospital.split(',');
    this.setData({
      hospitalId:hospital[0],
      hospitalName:hospital[1],
    });
  },
  onShow:function(){
    this.getThirdHospitalDetail(this);
  },
  checkboxChange:function(e){
    let value = e.detail.value;

  },
  // 获得第三方科室
  getThirdHospitalDetail:function(that){
    wxAPI.postRequest(api.third_hospital_detail,{
      hospital_id:that.data.hospitalId
    })
      .then(res=>{
        if(0 === res.data.status){
          let data = res.data.data;
          that.setData({
            departmentList:data.departmentList,
          });
        }
      })
  },

});