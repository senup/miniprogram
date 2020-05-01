var e = getApp();

Page({
    data: {
        isXYHidden: !0
    },
    showXY: function() {
        this.setData({
            isXYHidden: !1
        });
    },
    hiddenXY: function() {
        this.setData({
            isXYHidden: !0
        });
    },
    onGotUserInfo: function(e) {
        if ("getUserInfo:fail auth deny" == e.detail.errMsg || "getPhoneNumber:fail:user deny" == e.detail.errMsg) return wx.showToast({
            title: "授权登录失败",
            icon: "none"
        }), void wx.removeStorageSync("userInfo");
        var n = e.detail.userInfo;
        wx.setStorageSync("userInfo", n), wx.navigateTo({
            url: "/pages/login/index"
        });
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShareAppMessage: function() {
        return e.shareAppMessage;
    }
});