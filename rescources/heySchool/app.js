App({
    onLaunch: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(a) {
                console.log(a.model), -1 != a.model.search("iPhone X") ? e.globalData.isIpx = !0 : e.globalData.isIpx = !1;
            }
        });
    },
    globalData: {
        isIpx: !1,
        baseURL: "https://www.myheyu.cn/api/",
        baseImageURL: "https://www.myheyu.cn/"
    },
    shareAppMessage: {
        title: "HeyU校园",
        path: "/pages/index/index"
    }
});