const app = getApp();

Page({
    data: {
        isLogin: false,
        avatarUrl: "",
        nickname: "",
        sex: 0,
        college: "韩山师范学院",
        grade: "",
        idauth: false,
        cellList: [ {
            value: "个人中心",
            image: "/images/my/mine_grzy.png",
            navigateUrl: "/pages/personal-center/index",
            isNavigate: false,
            show: true,
            isNew: true
        }, {
            value: "消息",
            image: "/images/my/msg.png",
            navigateUrl: "/pages/my-message/index",
            isNavigate: false,
            show: true
        }, {
            value: "帮助与反馈",
            image: "/images/my/bangzhu.png",
            navigateUrl: "/pages/my-help/index",
            isNavigate: false,
            show: true
        } ],
        tabBarMore: false
        // taskPublish: 0,
        // taskAccepted: 0,
        // taskWaiting: 0
    },
    previewAvatar: function (e) {
      var a = e.currentTarget.dataset.url;
      wx.previewImage({
        urls: [a]
      });
    },
    goToAuthorization:function(){
      wx.redirectTo({
        url: '/pages/login/index'
      })
    },
    //页面加载时
    onShow:function(){
      var me=this;
      var user = app.getGlobalUserInfo();
      var serverUrl = app.serverUrl;
      if(user.id=="" || user.id == null || user.id==undefined){
        return;
      }else{
        // 调用后端
        wx.request({
          url: serverUrl + '/user/queryUserInfo?userId=' + user.id,
          method: "GET",
          header: {
            'content-type': 'application/json', // 默认值
            'userId': user.id,
            'userToken': user.userToken
          },
          success: function (res) {
            var result = res.data.data;
            if (res.data.status == 200) {
              me.setData({
                isLogin: true,
                avatarUrl: result.avatarUrl,
                nickname: result.nickName,
                sex: result.gender,
                grade: result.grade + "级"
              })
            }
          },
        })
      }
    },

    onClickCell: function (e) {
      var columnIndex = e.currentTarget.dataset.index; 
      var columnList = this.data.cellList[columnIndex];
      var user = app.getGlobalUserInfo();
      if(user.id==null || user.id=='' || user.id==undefined){
        setTimeout(function(){
          wx.showToast({
            title: '用户未登录~即将进行登录~',
            icon:"none"
          }),1500
        }),
          wx.navigateTo({
            url: '/pages/login/index'
          });
      }else{
        wx.navigateTo({
          url: columnList.navigateUrl
        });
      }
    },


    //

  onShareAppMessage: function () {
    return app.shareAppMessage;
  },
  logout: function () {
    // var user = app.userInfo;
    var user = app.getGlobalUserInfo();

    var serverUrl = app.serverUrl;
    wx.showLoading({
      title: '请等待...',
    });
    // 调用后端
    wx.request({
      url: serverUrl + '/logout?userId=' + user.id,
      method: "POST",
      header: {
        'content-type': 'application/json', // 默认值
        'userId': user.id,
        'userToken': user.userToken
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data.status == 200) {
          // 登录成功跳转 
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 2000
          });
          // app.userInfo = null;
          // 注销以后，清空缓存
          wx.removeStorageSync("userInfo")
          // 页面跳转
          wx.redirectTo({
            url: '/pages/my/index',
          })
        }
      }
    })
  }

});