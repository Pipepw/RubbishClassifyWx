// pages/virtualCamera/virtualCamera.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputHidden:true,
    modalHidden: true,
    rubbishLabel:null,
    showModalStatus: false,
    canIUseCamera: wx.canIUse('camera'),
    hasCameraScope: true,
    cameraType: "normal", //'normal' or 'square'
    isNormal: true,
    isSquare: false,
    isBack: true,
    imageurl:null,
    album: [],
    switchingData: {},
    cameraShotingData: {},
    albumShotingData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 如果微信版本过低不支持相机组件，则提示后返回上一页
     */
    if(!this.data.canIUseCamera) {
      wx.showModal({
        title: '提示',
        content: '您的微信版本过低，无法使用相机拍照，请升级微信版本',
        showCancel: false,
        confirmColor: '#e31d1a',
        success: function(res) {
          if (res.confirm) {
            wx.navigateBack();
          }
        }
      });
    }

    /**
     * 检查是否获取了相机权限
     */
    wx.getSetting({
      success: res => {
        if(typeof res.authSetting['scope.camera'] === 'undefined' || res.authSetting['scope.camera']) {
          this.setData({
            hasCameraScope: true
          });
        } else {
          this.setData({
            hasCameraScope: false
          });
        }
      }
    });

    /**
     * 切换显示拍照类型时的动画位移需要根据设备计算位移量
     */
    this.rpx = wx.getSystemInfoSync().windowWidth / 750;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得popup组件
    this.popup = this.selectComponent("#popup");
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

  /**
   * 点击切换拍照类型
   */
  switchType: function(e) {
    //创建动画实例
    var typeSwitching = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 500,
      timingFunction: "ease",
      delay: 0
    });
    var cameraSwitching = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 500,
      timingFunction: "ease",
      delay: 0
    });

    //根据点击类型计算动画移动位置
    var cameraType = e.currentTarget.dataset.cameraType;
    var translateX, height, isNormal, isSquare;
    switch (cameraType) {
      case 'normal': 
        isNormal = true;
        isSquare = false;
        translateX = 0;
        height = 920;
        break;
      case 'square': 
        isNormal = false;
        isSquare = true;
        translateX = 250;
        height = 750;
        break;
      default: break;
    }
    typeSwitching.translateX(translateX * this.rpx).step();
    cameraSwitching.height(height * this.rpx).translateY( (920 - height) / 2 * this.rpx).step();

    //更新数据和视图
    this.setData({
      typeSwitchingData: typeSwitching.export(),
      cameraShotingData: cameraSwitching.export(),
      isNormal: isNormal,
      isSquare: isSquare,
      cameraType: cameraType
    });
  },

  /**
   * 点击拍照
   */
  shotPhoto: function() {
    var thispage=this;
    //创建动画实例
    console.log(thispage.data.modalHidden)
    var cameraShoting = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 500,
      timingFunction: "ease",
      delay: 0
    });
    var height, cameraType = this.data.cameraType;
    switch(cameraType) {
      case 'normal': 
        height = 920;
        break;
      case 'square':
        height = 750;
        break;
      default: break;
    }
    cameraShoting.opacity(0.1).translateY( (920 - height) / 2 * this.rpx).step();
    cameraShoting.opacity(1).step();

    var albumShoting = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 100,
      timingFunction: "ease-in-out",
      delay: 0
    });
    albumShoting.opacity(0.1).scale(0.1).step();
    albumShoting.opacity(1).scale(1).step();
    //获取照片
    const ctx = wx.createCameraContext();
		ctx.takePhoto({
			quality: 'high',
			success: (res) => {
        //获取图片路径
        var imgUrl = res.tempImagePath;
        //获取图片信息
        wx.getImageInfo({
          src: imgUrl,
          success: function (res) {
            console.log("图片大小" + res.width+"*"+res.height)
          }
      })
      // wx.compressImage({
      //   src: imgUrl,
      //   quality:60,
      //   success:function(res){
      //     imgUrl:res
      //   }
      // })
        //上传图片
        wx.uploadFile({
          //服务器ip:106.13.235.119
          url: 'http://106.13.235.119:8080/model/TargetDetectionServlet', //这里写自己的域名
          filePath: imgUrl,
          name: 'file',
          success: function (result) {
            // thispage.popup.showPopup();
            console.log("返回路径：" + result.data)
            thispage.setData({
              rubbishLabel:result.data,
              imageurl:result.data
            })
            thispage.setData({
              modalHidden:false
            })
          },
          fail:function(result){
            wx.showToast({
              title: '上传服务器失败',
            })
            console.log(imgUrl)
          }
        })
        var album = [].concat(this.data.album);
        album.push(imgUrl);
        // upload(this, imgUrl);

        this.setData({
          album: album,
          cameraShotingData: cameraShoting.export(),
          albumShotingData: albumShoting.export()
        });
      }
    })
    //this.popup.showPopup();
  },

  /**
   * 点击显示已拍照片
   */
  showAlbum: function() {
    var album = this.data.album;
    wx.previewImage({
      current: album[album.length > 0 ? album.length -1 : 0],
      urls: album
    });
  },

  /**
   * 点击切换前置/后置摄像头
   */
   reverseCamera: function() {
     var isBack = !(this.data.isBack);
     this.setData({
       isBack: isBack
     });
   },

   /**
    * 取消相机授权
    */
   cancelCameraScope: function() {
     wx.navigateBack();
   },

   /**
    * 前往设置打开相机授权
    */
   confirmCameraScope: function(res) {
     if(res.detail.authSetting['scope.camera']) {
        this.setData({
          hasCameraScope: true
        });
     }
   },


   showPopup() {
    this.popup.showPopup();
  },


  /**
   * 点击取消
   */
  modalCandel: function() {
    // do something
    this.setData({
      inputHidden:false
    })
    console.log("你点击了取消")
  },

  /**
   *  点击确认
   */
  modalConfirm: function() {
    // do something
    this.setData({
      modalHidden: true,
      inputHidden:true
    })
    console.log("你点击了确定")
  },
  click_error:function(){
    this.setData({
      inputHidden:true
    })
  }
  

})


   

