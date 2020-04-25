

const app = getApp();

Page({
    data: {
        userId: "",
        self: true,
      avatarUrl: "/images/my/icon-image.png",
        nickname: "匿名用户",
        sex: 1,
        college: "韩山师范学院",
        grade: "2017",
        intro: "",
        idauth: false,
        official: false,
        statistical: [ {
            count: 0,
            name: "关注"
        }, {
            count: 0,
            name: "动态"
        }, {
            count: 0,
            name: "任务"
        }, {
            count: 0,
            name: "粉丝"
        } ],
        impressions: [],
        tabList: [ {
            name: "动态",
            value: "post"
        }, {
            name: "任务",
            value: "task"
        } ],
        tabCurrent: "post",
        pageCurrent: 1,
        floorstatus: false,
        loading: false,
        isNoMore: false,
        completeLoading: true,
        privacySettings: {},
        noPower: false,
        templateNameList: [ "user-like-notify" ],
        templateDetailList: []
    },

  //页面加载时
  onShow: function () {
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
            isLogin: true,
            avatarUrl: result.avatarUrl,
            nickname: result.nickName,
            sex: result.gender,
            grade: result.grade + "级",
            intro: result.intro
          })
        } else if (res.data.status == 502){
            wx.showToast({
              title: res.data.msg,
              duration:2000
            }),
            wx.navigateTo({
              url: '/pages/login/index',
            })
        }
      },
      fail: function(){
        console.log("获取用户信息失败~~")
      }
    })
  },
    //导航栏切换
      changeTab: function (t) {
        var e = t.currentTarget.dataset.value;
        this.setData({
          tabCurrent:e
        })
        // this.data.tabCurrent != e && (this.setData({
        //   tabCurrent: e
        // }), this.getFeed(!0));
      },
      goEditInfo: function () {
        wx.navigateTo({
          url: "/pages/edit-complete-info/index"
        });
      },
      goChangeIntro: function () {
        wx.navigateTo({
          url: "/pages/edit-partial-info/index?type=intro&intro="+this.data.intro
        });
      }
});