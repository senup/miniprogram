//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

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
    defaultBanners: [
      { imgUrl: "/images/index/welcome.png" }, 
      { imgUrl: "/images/index/read.png" }, 
      { imgUrl: "/images/index/photo.png" }
    ],
// ----------------------
    cardList:[{
      type:11,
      images: [],
      content: "在綫求幫助！！！",
      likeCount: 6,
      commentCount: 8,
      nickname:"高等遊民",
      official:true,
      sex:0,
      datatime:"2020-20-20",
      college:"韓山師範學院",
      grade:"2017",
      userInfo:{
        avatarUrl:"https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg",
        idauth: true,
        content: "在綫求幫助！！！",
        likeCount: 6,
        commentCount: 8,
        nickname: "高等遊民",
        official: false,
        sex: 0,
        datatime: "2020-20-20",
        college: "韓山師範學院",
        grade: "2017"}
    },
      {
        type: 11,
        images: ["https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg",
          "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg",
          "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg",
          "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg"],
        content: "在綫求幫助！！！",
        likeCount: 6,
        commentCount: 8,
        nickname: "高等遊民",
        official: true,
        sex: 0,
        datatime: "2020-20-20",
        college: "韓山師範學院",
        grade: "2017",
        userInfo: {
          avatarUrl: "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg",
          idauth: true,
          content: "在綫求幫助！！！",
          likeCount: 6,
          commentCount: 8,
          nickname: "高等遊民",
          official: false,
          sex: 0,
          datatime: "2020-20-20",
          college: "韓山師範學院",
          grade: "2017"
        }
      }
    ],
    loading:true,
    isNoMore: true,


  },
  //function
  swiperchange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    });
  },
  goTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
    }) ;
  }

})
