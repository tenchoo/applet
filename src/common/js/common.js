
// 搜索
function searchGroup(){
  let _this = this;

  _this.blurSearchInput=function(e){
    _this.setData({
      searchInputValue:e.detail.value
    })
  };

  _this.search = function(){
    // wxApi.postRequest('',{})
  };
}

// 医生详情-基本信息




module.exports = {
  searchGroup:searchGroup,
};