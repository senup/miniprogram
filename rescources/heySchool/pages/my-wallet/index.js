var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/axios.js")), a = getApp(), e = new t.default();

Page({
    data: {
        baseImageUrl: a.globalData.baseImageURL,
        tabCurrent: "1",
        amount: 0,
        rewardTotal: 0,
        couponList: [],
        statementList: []
    },
    navbarClick: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.id;
        a != this.data.tabCurrent && (this.setData({
            tabCurrent: a
        }), "1" == a ? this.getCoupons() : "2" == a && this.getStatement());
    },
    getBalance: function() {
        var t = this;
        e.GET("user/wallet/balance").then(function(a) {
            t.setData({
                amount: a.data.amount,
                rewardTotal: a.data.rewardTotal
            });
        });
    },
    getCoupons: function() {
        var t = this;
        e.GET("user/coupon").then(function(a) {
            t.setData({
                couponList: a.data
            });
        });
    },
    getStatement: function() {
        var t = this;
        e.GET("user/wallet/trans_record").then(function(a) {
            t.setData({
                statementList: a.data
            });
        });
    },
    goUserCoupon: function(t) {
        var a = this.data.couponList[t.currentTarget.dataset.index], e = "/pages/publish-task/index?";
        e += "coupon=" + JSON.stringify(a), wx.navigateTo({
            url: e
        });
    },
    goWithdrawal: function(t) {
        wx.navigateTo({
            url: "/pages/my-wallet-withdrawal/index"
        });
    },
    onLoad: function(t) {},
    onShow: function() {
        this.getBalance(), this.getCoupons();
    },
    onShareAppMessage: function() {
        return a.shareAppMessage;
    }
});