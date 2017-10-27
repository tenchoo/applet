// 小程序方法封装
const Promise = require('../../lib/promise/es6-promise.min.js');

function wxPromise(fun) {
  return (obj = {}) => {
    return new Promise((resolve, reject) => {
      obj.success = function (req) {
        resolve(req);
      };
      obj.fail = function (req) {
        reject(req);
      };
      fun(obj);
    })
  }
}


function wxPromiseObj(fun,obj={}) {
    return new Promise((resolve, reject) => {
      obj.success = function (req) {
        resolve(req);
      };
      obj.fail = function (req) {
        reject(req);
      };
      fun(obj);
    })
}


// 始终会执行，类似于wx.request中的complete
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};

// wx.request方法封装
// post请求
function postRequest(url, data,head='application/x-www-form-urlencoded') {
  return wxPromise(wx.request)({
    method: 'POST',
    url: url,
    header:{'content-type': head},
    data: data
  })
}

// get请求
function getRequest(url, data) {
  return wxPromise(wx.request)({
    method: 'GET',
    url: url,
    data: data
  })
}

// 获取当前的地理位置、速度
function getLocation(type='wgs84') {
  return wxPromise(wx.getLocation)({
    type: type
  })
}

// 登陆
function login() {
  return wxPromise(wx.login)()
}

// 获取用户信息
function getUserInfo(withCredentials = false, lang = 'zh_CN') {
  return wxPromise(wx.getUserInfo)({
    withCredentials: withCredentials,
    lang: lang
  })
}
// 查询授权
function getSetting(scope){
  return wxPromise(wx.getSetting)()
    .then((res)=>{
     return !!res.authSetting[scope];
    })
}
// 获取授权
function authorize(scope) {
  return wxPromise(wx.authorize)({
    scope: scope
  })
}

// showModal
function showModal(tit,cont,confirmTxt='确定'){
  return wxPromise(wx.showModal)({
    title:tit,
    content:cont,
    confirmColor:'#50a0ff',
    confirmText:confirmTxt,
  })
}
// 导出
module.exports = {
  // promise
  wxPromise: wxPromise,
  wxPromiseObj:wxPromiseObj,
  // get请求
  getRequest: getRequest,
  // post请求
  postRequest: postRequest,
  // 获取当前的地理位置、速度
  getLocation: getLocation,
  // 登陆
  login: login,
  // 获取用户信息
  getUserInfo: getUserInfo,
  // 查询授权
  getSetting:getSetting,
  // 获取
  authorize: authorize,
  // 模态框
  showModal:showModal,
};