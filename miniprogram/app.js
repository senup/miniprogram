//app.js
App({
	
  serverUrl: "http://localhost:8080",
  userInfo: null,

  setGlobalUserInfo: function (user) {
	wx.setStorageSync("userInfo", user);
  },

  getGlobalUserInfo: function () {
	return wx.getStorageSync("userInfo");
  },


  shareAppMessage: {
    title: "小韩帮帮忙",
    path: "/pages/index/index"
  }
})