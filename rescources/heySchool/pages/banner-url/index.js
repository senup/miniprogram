var r = getApp();

Page({
    data: {
        url: ""
    },
    onLoad: function(r) {
        var a = this;
        r.url && a.setData({
            url: r.url
        }), console.log("banner-url", r.url);
    },
    onShareAppMessage: function() {
        return r.shareAppMessage;
    }
});