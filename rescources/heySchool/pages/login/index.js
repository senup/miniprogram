function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../api/public.js")), n = e(require("../../utils/axios.js")), a = getApp(), o = new n.default();

Page({
    data: {
        agree: !0,
        loading: !1
    },
    checkboxChange: function(e) {
        this.setData({
            agree: !this.data.agree
        });
    },
    toAgreement: function() {
        wx.navigateTo({
            url: "/pages/agreement/index"
        });
    },
    onGotPhoneNumber: function(e) {
        this.data.loading || ("getPhoneNumber:fail user deny" == e.detail.errMsg || "getPhoneNumber:fail:user deny" == e.detail.errMsg ? (wx.removeStorageSync("userInfo"), 
        wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "用户未授权",
            success: function(e) {
                wx.navigateBack();
            }
        })) : (this.setData({
            loading: !0
        }), this.login(e)));
    },
    login: function(e) {
        var n = this;
        wx.login({
            success: function(a) {
                var i = {
                    code: a.code,
                    shareCode: wx.getStorageSync("shareCode")
                };
                console.log("login param", i), o.NoToken("auth/wechatminiapp/login", i).then(function(a) {
                    if (console.log("axios login success", a), a.data.token) {
                        wx.removeStorageSync("shareCode"), wx.setStorageSync("token", a.data.token), wx.setStorageSync("registryStatus", a.data.initStatus);
                        var o = a.data.initStatus;
                        if (0 === o) n.buildInfo(e); else if (1 === o) n.getPhoneNumber(e), wx.redirectTo({
                            url: "/pages/edit-register/index"
                        }); else {
                            t.default.getUserCompleteInfo();
                            var i = wx.getStorageSync("pageUrl");
                            wx.removeStorageSync("pageUrl"), console.log("redirectTo", i), wx.reLaunch({
                                url: "/pages/index/index",
                                success: function() {
                                    if (console.log(i), i) {
                                        if ("pages/my/index" == i || "/pages/my/index" == i) return void wx.redirectTo({
                                            url: i
                                        });
                                        if ("pages/index/index" == i || "/pages/index/index" == i) return;
                                        wx.navigateTo({
                                            url: i
                                        });
                                    }
                                }
                            });
                        }
                    }
                }).catch(function(e) {
                    console.log("axios login error", e), n.setData({
                        loading: !1
                    });
                });
            },
            fail: function() {
                wx.showToast({
                    title: "获取信息失败"
                }), this.setData({
                    loading: !1
                });
            }
        });
    },
    getPhoneNumber: function(e) {
        var t = {
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData
        };
        o.POST("auth/wechatminiapp/phonenumber", t).then(function(e) {
            wx.setStorageSync("userPhoneNumber", e.data);
        });
    },
    buildInfo: function(e) {
        var t = wx.getStorageSync("userInfo"), n = {
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData
        }, a = Object.assign(t, n);
        o.POST("auth/wechatminiapp/info", a).then(function(e) {
            0 == e.initStatus ? (wx.setStorageSync("userPhoneNumber", e.data.phonenumber), wx.setStorageSync("registryStatus", 1), 
            wx.redirectTo({
                url: "/pages/edit-register/index"
            })) : (wx.setStorageSync("userPhoneNumber", e.data.phonenumber), wx.setStorageSync("registryStatus", 2), 
            wx.reLaunch({
                url: "/pages/index/index"
            }));
        });
    },
    onLoad: function(e) {},
    onReady: function() {},
    onShareAppMessage: function() {
        return a.shareAppMessage;
    }
});