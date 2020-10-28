
//获取应用实例
const app = getApp();

Page({
  data: {
    banner: ["http://106.13.235.119:8080/icon/垃圾分类从我做起.png","http://106.13.235.119:8080/icon/垃圾分类.png","http://106.13.235.119:8080/icon/爱回收.jpg"],
    introduction:[{"author":"见圾行事","date":"2020-10-1","title":"可回收垃圾","article":"根据《城市生活垃圾分类及其评价标准》行业标准以及参考德国垃圾分类法，可回收物是指适宜回收循环使用和资源利用的废物。主要包括：1、纸类：未严重玷污的文字用纸、包装用纸和其他纸制品等。如报纸、各种包装纸、办公用纸、广告纸片、纸盒、复印纸等；2、塑料：废容器塑料、包装塑料等塑料制品。比如各种塑料袋、塑料瓶、泡沫塑料、一次性塑料餐盒餐具、硬塑料等；3、金属：各种类别的废金属物品。如易拉罐、铁皮罐头盒、铅皮牙膏皮等；4、玻璃：有色和无色废玻璃制品；5、织物：旧纺织衣物和纺织制品。有害垃圾是指油漆、颜料、各类清洗液、子垃圾和电池。不可回收物更准确称为剩余垃圾指除可回收垃圾之外的垃圾，常见的有在自然条件下易分解的垃圾，如：水果皮、菜叶、剩菜剩饭、花草树枝树叶以及前五类生活垃圾中互相混合污染无法分类的垃圾（不包含有害垃圾，被污染混合的有害垃圾也应当被分类为有害垃圾）。有些地区将此类垃圾中的生物质单独分类为生物质（国内有部分城市也将此分类为湿垃圾或厨余垃圾）垃圾进行回收处理。"},{"author":"见圾行事","date":"2020-10-1","title":"有害垃圾","article":"有害垃圾指对人体健康或者自然环境造成直接或者潜在危害的生活废弃物。常见的有害垃圾包括废灯管、废油漆、杀虫剂、废弃化妆品、废电池、废灯泡、废水银温度计等，有害垃圾需按照特殊正确的方法安全处理。"}]
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
  start_question:function(){
    //跳转到答题页面
    wx.redirectTo({
      url: '/pages/question/question',
    })
  },
  // orderRecycle:function(){
  //   wx.redirectTo({
  //     url: '/pages/ucenter/OrderManagementPage/OrderManagementPage'
  //   })
  // },

  showinfo:function(){
    wx.redirectTo({
      url: '/pages/utilpage/share/share?id=0',
    })
  },
  showchufang:function(){
    wx.redirectTo({
      url: '/pages/utilpage/share/share?id=2',
    })
  },
  showother:function(){
    wx.redirectTo({
      url: '/pages/utilpage/share/share?id=3',
    })
  },
  showharm:function(){
    wx.redirectTo({
      url: '/pages/utilpage/share/share?id=1',
    })
  }
})