const app=getApp();

Page({
    data: {
        nickname: "",
        intro: "",
        type: "nickname"
    },

    inputNickname: function(e) {
        this.setData({
            nickname: e.detail.value        
        });
    },

    inputIntro: function(e) {
        this.setData({
            intro: e.detail.value
        });
    },

    saveNickname: function() {
      var me = this;
      var name = this.data.nickname.trim();
      var user = app.getGlobalUserInfo();
      var serverUrl = app.serverUrl;
      if ("" == name){
        wx.showToast({
          title: "内容不可为空",
          icon: "none"
        })
      }else{
        wx.request({
          url: serverUrl +'/user/updateNickName?id='+user.id+'&nickName='+name,
          method:"POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'userId': user.id,
            'userToken': user.userToken
          },
          success:function(res){
            if(res.data.status==200){
              wx.showToast({
                title: '修改成功~',
                icon: 'success',
              }),
              setTimeout(function () {
                  //要延时执行的代码
                wx.navigateBack({
                  delta: 1
                });
                }, 2000) //延迟时间

            }
          }
        })
      }
    },

    saveIntro: function() {
      var me = this;
      var rawIntro = this.data.intro.trim();
      var user = app.getGlobalUserInfo();
      var serverUrl = app.serverUrl;
      // if(rawIntro==''||rawIntro==null||rawIntro==undefined){
      //   rawIntro="";
      // }
        wx.request({
          url: serverUrl + '/user/updateIntro',
          method: "POST",
          data:{
            id:user.id,
            intro: rawIntro
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
            'userId': user.id,
            'userToken': user.userToken
          },
          success: function (res) {
            if (res.data.status == 200) {
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
              }),
                setTimeout(function () {
                  //要延时执行的代码
                  wx.navigateBack({
                    delta: 1
                  });
                }, 2000) //延迟时间

            }
          }
        })
      
    },

    postUserInfo: function(e, a) {
        var i = t({}, e, a);
        o.POST("user", i).then(function(i) {
            wx.showToast({
                title: "修改成功"
            });
            var o = getCurrentPages();
            o[o.length - 2].setData(t({}, "userInfo." + e, a)), n.default.getUserCompleteInfo(), 
            setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 2e3);
        });
    },
  //页面加载时
  onLoad: function (options) {
    var me = this;
    if(options.nickname==null || options.nickname==''||options.nickname==undefined){
      me.setData({
        intro: options.intro,
        type: options.type
      })
    }else{
      me.setData({
        nickname: options.nickname,
        type: options.type
      })
    }

  },
    onShareAppMessage: function() {
        return app.shareAppMessage;
    }
});