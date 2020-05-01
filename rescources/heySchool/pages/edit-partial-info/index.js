function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n, e;
}

var n = e(require("../../api/public.js")), a = e(require("../../utils/axios.js")), i = getApp(), o = new a.default();

Page({
    data: {
        nickname: "",
        intro: "",
        type: "nickname"
    },
    inputNickname: function(e) {
        this.setData({
            nickname: e.detail.value
        });
    },
    inputIntro: function(e) {
        this.setData({
            intro: e.detail.value
        });
    },
    saveNickname: function() {
        var e = this.data.nickname.trim();
        "" == e ? wx.showToast({
            title: "内容不可为空",
            icon: "none"
        }) : this.postUserInfo("nickname", e);
    },
    saveIntro: function() {
        var e = this.data.intro.trim();
        this.postUserInfo("intro", e);
    },
    postUserInfo: function(e, a) {
        var i = t({}, e, a);
        o.POST("user", i).then(function(i) {
            wx.showToast({
                title: "修改成功"
            });
            var o = getCurrentPages();
            o[o.length - 2].setData(t({}, "userInfo." + e, a)), n.default.getUserCompleteInfo(), 
            setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 2e3);
        });
    },
    onLoad: function(e) {
        var t = wx.getStorageSync("userCompleteInfo");
        e.type && this.setData({
            type: e.type,
            nickname: t.nickname,
            intro: t.intro
        });
    },
    onShareAppMessage: function() {
        return i.shareAppMessage;
    }
});