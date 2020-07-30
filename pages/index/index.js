
//获取应用实例
const app = getApp();

Page({
  data: {
    banner: ["../../static/images/滚动1.jpg","../../static/images/滚动2.jpg","../../static/images/滚动3.jpg"],
  },

  onShareAppMessage: function() {
    return {
    }
  },

  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
  },

  onLoad: function(options) {

  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  startCamera:function(){
    wx.navigateTo({
      url: '/pages/camera/camera',
    })
  }

})