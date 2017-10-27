"use strict";var _api=require("config/api"),wxAPI=require("common/js/wxAPI");App({onLaunch:function(){},globalData:{userInfo:{}},onShow:function(){},getDoctorDetail:function(t,a){wxAPI.postRequest(_api.api.doctor_detail,{doctor_id:a}).then(function(a){0===a.data.status&&t.setData(a.data.data.doctorRow)})},toggleStar:function(t,a,e,o){var i="0"===t.data.star_mark?"1":"0",n={};n=o?{account_id:wx.getStorageSync("account_id"),client_id:e,star_mark:i}:{account_id:wx.getStorageSync("account_id"),doctor_id:e,star_mark:i},wxAPI.postRequest(a,n).then(function(a){0===a.data.status&&t.setData({star_mark:i})})},getTaskPage:function(t,a,e,o){var i=this;t.setData({defaultBool:!0});var n={account_id:wx.getStorageSync("account_id"),visit_target_id:a,class:e,page:o};wxAPI.postRequest(_api.api.page,n).then(function(a){if(0===a.data.status){var e=a.data.data;"1"===o?t.setData({dataCount:e.dataCount,currentPage:e.currentPage,pageCount:e.pageCount,taskPage:e.page,defaultBool:!1}):t.setData({defaultBool:!1,currentPage:e.currentPage,taskPage:i.data.taskPage.concat(e.page)})}else t.setData({dataCount:"",currentPage:"",pageCount:"",taskPage:[],defaultBool:!0})})},getThirdDoctorDetail:function(t,a){t.setData({defaultThirdDoctor:!0}),wxAPI.postRequest(_api.api.third_doctor_detail,{doctor_id:a}).then(function(a){if(0===a.data.status){var e=a.data.data;t.setData(e.docotrRow),t.setData(e.workTimeRow),t.setData(e.linkedDoctorList),t.setData({defaultThirdDoctor:!1})}else t.setData({defaultThirdDoctor:!0})})},getHospitalPage:function(t,a){var e={page:"1",search_text:"",level:"",dot_province_id:"",dot_city_id:"",is_exploited:""};if(a&&"[object Object]"===Object.prototype.toString.call(a))for(var o in a)e.hasOwnProperty(o)&&(e[o]=a[o]);wxAPI.postRequest(_api.api.third_hospital_page,e).then(function(a){if(0===a.data.status){var o=a.data.data;"1"===e.page?t.setData({updateTime:o.updateTime,dataCount:o.dataCount,pageCount:o.pageCount,currentPage:o.currentPage,hospitalPage:o.hospitalPage}):t.setData({updateTime:o.updateTime,currentPage:o.currentPage,hospitalPage:t.data.hospitalPage.concat(o.hospitalPage)})}else console.log(a.data.msg)})},chooseImg:function(t){if(wx.chooseImage){var a={count:9};t.data.photoLists&&t.data.photoLists[0]||t.setData({photoLists:[]}),wxAPI.wxPromiseObj(wx.chooseImage,a).then(function(a){var e=t.data.photoLists;e=e.concat(a.tempFilePaths),t.setData({photoLists:e})})}},previewImg:function(t,a){wx.previewImage&&wx.previewImage({current:t,urls:a})},getNearbyHospital:function(t,a){wxAPI.getLocation().then(function(e){var o={lat:e.latitude,lng:e.longitude,page:a};wxAPI.postRequest(_api.api.nearby_hospital_page,o).then(function(e){if(0===e.data.status){for(var o=e.data.data,i=o.hospitalPage,n=0;n<i.length;n++){var s=i[n].distance;i[n].distance=Math.floor(s/10)/100}"1"===a?t.setData({dataCount:o.dataCount,currentPage:o.currentPage,pageCount:o.pageCount,hospitalPage:i}):t.setData({currentPage:o.currentPage,hospitalPage:t.data.hospitalPage.concat(i)})}})})},getClientDetail:function(t,a){wxAPI.postRequest(_api.api.client_detail,{client_id:a}).then(function(a){if(0===a.data.status){var e=a.data.data,o=e.clientRow.third_party_id,i=[{longitude:e.clientRow.lng,latitude:e.clientRow.lat,iconPath:"../../img/icon_drugstore.png",width:30,height:30}];t.setData(e),t.setData({star_mark:e.clientRow.star_mark,isMap:""!==o,markers:i})}else console.log(a.data.msg)})}});