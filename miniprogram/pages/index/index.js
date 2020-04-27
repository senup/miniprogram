//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    serverUrl: "",
    typeList: [{
      id: 0,
      name: "全部"
    }, {
      id: 2,
      name: "动态"
    }, {
      id: 1,
      name: "任务"
    }],

    swiper: {
      indicatorDots: true,
      autoplay: true,
      interval: 3e3,
      duration: 1e3
    },

    swiperCurrent: 0,
    loading: false,
    registerShow: false,
    couponShow: false,
    tabBarMore: false,
    floorstatus: false,
    defaultBanners: [{
        imgUrl: "/images/index/welcome.png"
      },
      {
        imgUrl: "/images/index/read.png"
      },
      {
        imgUrl: "/images/index/photo.png"
      }
    ],
    // ----------------------
    cardList: [],
    loading: true,
    isNoMore: true,


  },
  //function
  onLoad: function() {
    // 调用后端
    var me = this;
    var user = app.getGlobalUserInfo();
    var serverUrl = app.serverUrl;
    wx.request({
      url: serverUrl + '/post/postDetail',
      method: "GET",
      header: {
        'content-type': 'application/json', // 默认值
        'userId': user.id,
        'userToken': user.userToken
      },
      success: function(res) {
        console.log(res);
        var results = res.data.data;
        console.log(results);
        me.setData({
          cardList: results,
          serverUrl:serverUrl
        })
      },
    })
  },
  swiperchange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current
    });
  },
  goTop: function() {
    wx.pageScrollTo({
      scrollTop: 0
    });
  }

})