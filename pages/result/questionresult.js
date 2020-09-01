// pages/result/questionresult.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goal:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var thispage=this;
    thispage.setData({
      goal:app.globalDatas.goal
    })
    console.log(this.data.goal)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //查看考试详情
  queryResult:function(){
    //计算总成绩
    app.globalDatas.goal=0;
    //将成绩上传服务器

    //页面的跳转
    wx.redirectTo({
      url: '/pages/questiondetail/questiondetail',
    })
  },
  exit:function(){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  }
})