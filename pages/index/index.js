
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
  },

  // 拍照功能
  getLocalImage: function () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      // success: function (res) {
        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来
        // app.startOperating("保存中")
        // var filePath = res.tempFilePaths[0];
        // var session_key = wx.getStorageSync('session_key');
        // 这里顺道展示一下如何将上传上来的文件返回给后端，就是调用wx.uploadFile函数
        // wx.uploadFile({
          // url: app.globalData.url + '/home/upload/uploadFile/session_key/' + session_key,
          // filePath: filePath,
          // name: 'file',
          // success: function (res) {
          //   app.stopOperating();
          //   // 下面的处理其实是跟我自己的业务逻辑有关
          //   var data = JSON.parse(res.data);
          //   if (parseInt(data.status) === 1) {
          //     app.showSuccess('文件保存成功');
          //   } else {
          //     app.showError("文件保存失败");
          //   }
          // }
        // })
      // },
      // fail: function (error) {
      //   console.error("调用本地相册文件时出错")
      //   console.warn(error)
      // },
      // complete: function () {

      // }
    })
  },
})