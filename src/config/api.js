const rootUrl = 'http://xsj.jooyum.com.cn/src/phone/';

const api = {
  // 图片
  img: 'http://xsj.jooyum.com.cn/resource/',
  // 检测绑定
  check_bind: rootUrl + 'account/check-bind',
  // 注册
  register: rootUrl + 'account/register',
  // 获取验证码
  send_captcha: rootUrl + 'common/send-captcha',
  // 今日任务/行程
  today: rootUrl + 'task/today',
  // 创建药店/医院
  add: rootUrl + 'client/add',
  // 清除拜访记录
  clean: rootUrl + 'task/clean',
  // 销毁数据
  data_destroy: rootUrl + 'task/data-destroy',
  // 我的客户  医生列表
  doctor_page: rootUrl + 'client/doctor-page',
  // 星标客户
  star_doctor_list: rootUrl + 'client/star-doctor-list',
  // 星标药店
  star_pharmacy_list: rootUrl + 'client/star-pharmacy-list',
  // 医生详情
  doctor_detail: rootUrl + 'client/doctor-detail',
  // 第三方医生详情
  third_doctor_detail: rootUrl + 'thirdparty/doctor-detail',
  // 拜访记录 任务列表
  page: rootUrl + 'task/page',
  // 创建医生
  add_doctor: rootUrl + 'client/add-doctor',
  // 删除医生
  doctor_delete: rootUrl + 'client/doctor-delete',
  // 删除终端
  client_delete: rootUrl + 'client/delete',
  // 医生设置星标
  doctor_star_mark: rootUrl + 'client/doctor-star-mark',
  // 药店列表
  pharmacy_page: rootUrl + 'client/pharmacy-page',
  // 第三方医院列表  云医生
  third_hospital_page: rootUrl + 'thirdparty/hospital-page',
  // 第三方医院详情
  third_hospital_detail: rootUrl + 'thirdparty/hospital-detail',
  // 第三方药店 云药店
  third_pharmacy: rootUrl + 'thirdparty/pharmacy-page',
  // 行程 我的拜访
  journey: rootUrl + 'task/journey',
  // 任务详情 我的拜访拜访详情
  task_detail: rootUrl + 'task/detail',
  // 拜访任务修改
  task_save: rootUrl + 'task/save',
  // 上传图片
  upload_photo: rootUrl + 'task/upload-photo',
  // 新建任务 新建拜访
  task_add: rootUrl + 'task/add',
  // 产品列表
  goods_list: rootUrl + 'goods/list',
  // 删除产品
  goods_del: rootUrl + 'goods/delete',
  // 附近医院
  nearby_hospital_page: rootUrl + 'thirdparty/nearby-hospital-page',
  // 终端详情
  client_detail: rootUrl + 'client/detail',
  // 药店设置星标
  client_star_mark: rootUrl + 'client/client-star-mark',
  // 获取省
  province: rootUrl + 'common/province',
};


module.exports = {
  api: api
};
