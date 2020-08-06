// pages/question/question.js
//创建全局变量app
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ischecked:false,
    goal:0,
    index:0,//试题编号
    datas:[{"answer":"干垃圾","tip":"无","explain":"缝衣针看似是金属可回收物，但失去循环利用价值，缝衣针是不宜列入可回收的垃圾种类。","id":1,"type":0,"title":"缝衣针属于哪类垃圾？","optionA":"干垃圾","optionB":"湿垃圾","optionC":"可回收物","optionD":"有害垃圾","url":"无"},{"answer":"可回收物","tip":"无","explain":"一般可回收物可分为废纸张、废塑料、废玻璃制品、废金属、废织物、复合材料类及其他。空调遥控器属于复合材料类及其他，因此是可回收物。","id":2,"type":0,"title":"损坏的空调遥控器属于哪类垃圾？","optionA":"湿垃圾","optionB":"可回收物","optionC":"有害垃圾","optionD":"干垃圾","url":"无"},{"answer":"湿垃圾","tip":"无","explain":"废弃的家养植物会腐烂，是厨余垃圾，可以粉碎做成有机肥料，养护小区内的花草。","id":3,"type":0,"title":"废弃的植物哪类垃圾？","optionA":"有害垃圾","optionB":"干垃圾","optionC":"湿垃圾","optionD":"可回收物","url":"无"},{"answer":"湿垃圾","tip":"无","explain":"因为瓜子容易腐烂，易腐蚀，所以属于湿垃圾。","id":4,"type":0,"title":"瓜子壳哪类垃圾？","optionA":"可回收物","optionB":"湿垃圾","optionC":"干垃圾","optionD":"有害垃圾","url":"无"},{"answer":"干垃圾","tip":"无","explain":"蟹壳因为比较坚硬，难以腐蚀，我们要把它们放入干垃圾一类。","id":5,"type":0,"title":"蟹壳属于哪类垃圾？","optionA":"干垃圾","optionB":"湿垃圾","optionC":"可回收物","optionD":"有害垃圾","url":"无"}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //将本页面的试题存储到全局变量中
    app.globalDatas.questionDatas=this.data.datas;
    console.log(app.globalDatas.questionDatas[0].explain);
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
  //下一题按钮回调事件
  btnNextQuestiion:function(){
        //获取用户选择的选项
    var userAnswer=wx.getStorageSync('result');
    console.log(userAnswer+this.data.index);
    //将用户的选项存储到全局变量中
    app.globalDatas.questionAnswer[this.data.index].select=userAnswer;

    var currPage=this;//当前页面对象
    var currIndex=currPage.data.index+1;//下一题的题号
    if(currIndex==5){
      //跳转到答题详情
      wx.redirectTo({
        url: '/pages/result/questionresult',
      })
    }
    currPage.setData({
      index:currPage.data.index+1,
      ischecked:false
    });
    
  },
//单选按钮的回调事件
  radioChange:function(e){
    console.log("用户选择"+e.detail.value);
    //将用户选择的选项传递给btnNextQuestiion方法
    wx.setStorageSync('result', e.detail.value);//将用户选择的值异步存放到缓存

  }

})