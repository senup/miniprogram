var e = getApp();

Page({
    data: {
        baseImageUrl: e.globalData.baseImageURL
    },
    onLoad: function(e) {
        e.id && this.setData({
            feedId: e.id
        });
    },
    goDetail: function() {
        var e = this;
        wx.reLaunch({
            url: "/pages/index/index",
            success: function() {
                wx.navigateTo({
                    url: "/pages/details/index?content_id=" + e.data.feedId
                });
            }
        });
    },
    rePublish: function() {
        wx.reLaunch({
            url: "/pages/index/index",
            success: function() {
                wx.navigateTo({
                    url: "/pages/publish-task/index"
                });
            }
        });
    },
    onShareAppMessage: function() {
        return {
            title: "我发布了新任务,快来帮助我吧",
            path: "/pages/details/index?content_id=" + this.data.feedId,
            success: function(e) {
                console.log("转发成功"), wx.showToast({
                    title: "转发成功"
                });
            },
            fail: function(e) {
                console.log("转发失败");
            }
        };
    }
});