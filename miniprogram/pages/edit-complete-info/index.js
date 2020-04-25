const app = getApp();

Page({
    data: {
        userId: "",
        avatarUrl: "",
        nickname: "",
        intro: "",
        sex: 0,
        college: "",
        grade: ""
    },
    goChangeNickname: function() {
        var name = this.data.nickname;      
        wx.navigateTo({
            url: "/pages/edit-partial-info/index?type=nickname&nickname="+name
        });
    },
    goChangeIntro: function() {
      var intro = this.data.intro;      
        wx.navigateTo({
            url: "/pages/edit-partial-info/index?type=intro&intro="+intro
        });
    },
    previewAvatar: function(e) {
        var a = e.currentTarget.dataset.url;
        wx.previewImage({
            urls: [ a ]
        });
    },
  //页面加载时
  onShow: function (options) {
    var me = this;
    var user = app.getGlobalUserInfo();
    var serverUrl = app.serverUrl;
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
            // type: me.options.type,
            userId: result.id,
            avatarUrl: result.avatarUrl,
            nickname: result.nickName,
            intro: result.intro,
            sex: result.gender,
            college: "",
            grade: result.grade
          })
        }
      },
      fail: function () {
        console.log("获取用户信息失败~~")
      }
    })
  },

    onShareAppMessage: function() {
        return app.shareAppMessage;
    },
    //更换头像
  changeAvatar: function () {
    var me = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths);
        wx.showLoading({
          title: '上传中...',
        })
        var serverUrl = app.serverUrl;
        // fixme 修改原有的全局对象为本地缓存
        var userInfo = app.getGlobalUserInfo();

        wx.uploadFile({
          url: serverUrl + '/user/uploadFace?userId=' + userInfo.id,  //app.userInfo.id,
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            'content-type': 'application/json', // 默认值
            'userId': userInfo.id,
            'userToken': userInfo.userToken
          },
          success: function (res) {
            var data = JSON.parse(res.data);
            console.log(data);
            wx.hideLoading();
            if (data.status == 200) {
              wx.showToast({
                title: '上传成功!~~',
                icon: "success"
              });

              var imageUrl = data.data;
              me.setData({
                avatarUrl: imageUrl
              });

            } else if (data.status == 500) {
              wx.showToast({
                title: data.msg
              });
            } else if (res.data.status == 502) {
              wx.showToast({
                title: res.data.msg,
                duration: 2000,
                icon: "none",
                success: function () {
                  wx.redirectTo({
                    url: '/pages/login/index',
                  })
                }
              });

            }

          }
        })


      }
    })
  }
});