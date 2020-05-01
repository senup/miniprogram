function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../api/public.js")), a = new (e(require("../../utils/axios.js")).default)(), n = getApp();

Page({
    data: {
        nickName: "",
        college: "",
        collegeId: Number,
        enrollYear: "",
        sex: ""
    },
    inputNickName: function(e) {
        this.setData({
            nickName: e.detail.value
        });
    },
    toSelectSchool: function() {
        wx.navigateTo({
            url: "/pages/select-school/index?noAll=1"
        });
    },
    bindDateChange: function(e) {
        this.setData({
            enrollYear: e.detail.value
        });
    },
    selectFemale: function(e) {
        var t = e.currentTarget.dataset.sex;
        t != this.data.sex && this.setData({
            sex: t
        });
    },
    submitForm: function() {
        var e = {
            nickName: this.data.nickName.trim(),
            collegeId: this.data.collegeId,
            enrollYear: this.data.enrollYear,
            sex: this.data.sex
        };
        "" != e.nickName ? a.POST("auth/complete_info", e).then(function(e) {
            t.default.getUserCompleteInfo(), wx.setStorageSync("registryStatus", 2);
            var a = wx.getStorageSync("pageUrl");
            wx.removeStorageSync("pageUrl"), console.log("redirectTo", a);
            var n = e.data.coupon, i = "/pages/index/index";
            n && (i = i + "?coupon=" + JSON.stringify(n)), wx.reLaunch({
                url: i,
                success: function() {
                    getCurrentPages();
                    if (a) {
                        if ("pages/my/index" == a) return void wx.redirectTo({
                            url: a
                        });
                        if ("pages/index/index" == a) return;
                        wx.navigateTo({
                            url: a
                        });
                    }
                }
            });
        }) : wx.showToast({
            title: "昵称不可为空",
            icon: "none"
        });
    },
    onLoad: function(e) {
        2 === wx.setStorageSync("registryStatus") && wx.reLaunch({
            url: "/pages/index/index"
        });
        var t = wx.getStorageSync("userInfo");
        t.nickName.length > 10 && (t.nickName = t.nickName.substr(0, 10)), this.setData({
            nickName: t.nickName
        });
    },
    onShareAppMessage: function() {
        return n.shareAppMessage;
    }
});