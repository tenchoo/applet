// 成就分享-小蜜蜂动画
let achievementShareBeeShow = wx.createAnimation({
  timingFunction: 'ease',
  duration: '1000',
  delay: '500'
});
achievementShareBeeShow.translateX(-62).step();

let achievementShareBeeHide = wx.createAnimation({
  timingFunction: 'step-start',
  duration: '1',
  delay: '0'
});
achievementShareBeeHide.translateX(62).step();

let achievementShareBtnShow = wx.createAnimation({
  timingFunction: 'ease',
  duration: '1000',
  delay: '1000'
});
achievementShareBtnShow.opacity(1).step();

let achievementShareBtnHide = wx.createAnimation({
  timingFunction: 'step-start',
  duration: '1',
  delay: '0'
});
achievementShareBtnHide.opacity(0).step();

let achievementShareHeartShow = wx.createAnimation({
  timingFunction: 'ease',
  duration: '1000',
  delay: '1200'
});
achievementShareHeartShow.opacity(1).step();


module.exports = {
  achievementShareBeeShow: achievementShareBeeShow.export(),
  achievementShareBeeHide: achievementShareBeeHide.export(),
  achievementShareBtnShow: achievementShareBtnShow.export(),
  achievementShareBtnHide: achievementShareBtnHide.export(),
  achievementShareHeartShow: achievementShareHeartShow.export(),
};