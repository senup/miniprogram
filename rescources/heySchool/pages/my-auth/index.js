var a = getApp();

Page({
    data: {
        baseImageUrl: a.globalData.baseImageURL,
        state: 1
    },
    goSubmitInfo: function() {
        wx.navigateTo({
            url: "/pages/my-auth-upload/index"
        });
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {
        wx.getStorageSync("userCompleteInfo").uploadIdauth ? this.setData({
            state: 2
        }) : this.setData({
            state: 1
        });
    },
    onShareAppMessage: function() {
        return a.shareAppMessage;
    }
});