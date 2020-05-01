function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var t = a(require("../../utils/util.js")), e = a(require("../../utils/axios.js")), n = getApp(), i = new e.default();

Page({
    data: {
        userCompleteInfo: wx.getStorageSync("userCompleteInfo"),
        amount: 0,
        withdrawal: "",
        danger: !1
    },
    getBalance: function() {
        var a = this;
        i.GET("user/wallet/balance").then(function(t) {
            a.setData({
                amount: t.data.amount
            });
        });
    },
    inputWithdrawal: function(a) {
        var t;
        t = /^(\d?)+(\.\d{0,2})?$/.test(a.detail.value) ? a.detail.value : a.detail.value.substring(0, a.detail.value.length - 1), 
        this.setData({
            withdrawal: t
        }), t > this.data.amount ? 1 != this.data.danger && this.setData({
            danger: !0
        }) : 0 != this.data.danger && this.setData({
            danger: !1
        });
    },
    withdrawalAll: function() {
        this.setData({
            withdrawal: this.data.amount
        });
    },
    postWithdrawal: function() {
        var a = this;
        if (!this.data.danger) {
            wx.showLoading({
                title: "提现中...",
                mask: !0
            });
            var e = {
                withdrawAmount: Number(this.data.withdrawal)
            };
            i.POST("wechatpay/withdraw", e).then(function(e) {
                wx.hideLoading(), t.default.showModal("提现成功,是否返回钱包页?", function() {
                    wx.navigateBack();
                }), a.getBalance();
            }).catch(function(a) {
                wx.hideLoading(), console.log("fail");
            });
        }
    },
    onLoad: function(a) {},
    onShow: function() {
        this.getBalance();
    },
    onShareAppMessage: function() {
        return n.shareAppMessage;
    }
});