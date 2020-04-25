// function e(e) {
//     return e && e.__esModule ? e : {
//         default: e
//     };
// }

// function t(e, t, a) {
//     return t in e ? Object.defineProperty(e, t, {
//         value: a,
//         enumerable: !0,
//         configurable: !0,
//         writable: !0
//     }) : e[t] = a, e;
// }

// e(require("../../api/public.js"));

// var a = e(require("../../utils/axios.js")), n = getApp(), i = new a.default();

Page({
    data: {
        hiddenPost: !1,
        hiddenTask: !1,
        hiddenAcceptedTask: !1
    },
    checkChange: function(e) {
        var a = e.currentTarget.dataset.name, n = !this.data[a];
        this.setData(t({}, a, n));
    },
    getPrivacySettings: function() {
        var e = this, t = wx.getStorageSync("userCompleteInfo").userId;
        i.GET("user/privacy_settings?uid=" + t).then(function(t) {
            e.setData({
                hiddenPost: t.data.hiddenPost,
                hiddenTask: t.data.hiddenTask,
                hiddenAcceptedTask: t.data.hiddenAcceptedTask
            });
        });
    },
    setPrivacySettings: function() {
        var e = {
            hiddenPost: this.data.hiddenPost,
            hiddenTask: this.data.hiddenTask,
            hiddenAcceptedTask: this.data.hiddenAcceptedTask
        };
        i.POST("user/privacy_settings", e).then(function(e) {
            wx.showToast({
                title: "修改成功"
            });
        });
    },
    onLoad: function(e) {
        this.getPrivacySettings();
    },
    onReady: function() {},
    onShareAppMessage: function() {
        return n.shareAppMessage;
    }
});