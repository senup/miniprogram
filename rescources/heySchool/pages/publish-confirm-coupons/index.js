function n(n, e, t) {
    return e in n ? Object.defineProperty(n, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : n[e] = t, n;
}

var e = function(n) {
    return n && n.__esModule ? n : {
        default: n
    };
}(require("../../utils/axios.js")), t = getApp(), o = new e.default();

Page({
    data: {
        couponList: [],
        couponIndexCurrent: ""
    },
    getCoupons: function() {
        var n = this, e = o.GET("user/coupon");
        return e.then(function(e) {
            n.setData({
                couponList: e.data
            });
        }), e;
    },
    checkboxChange: function(e) {
        var t = e.detail.value;
        if (1 == t.length) {
            var o;
            this.setData((o = {}, n(o, "couponList[" + t[0] + "].checked", !0), n(o, "couponIndexCurrent", t[0]), 
            o));
        } else if (2 == t.length) {
            var a;
            this.setData((a = {}, n(a, "couponList[" + t[0] + "].checked", !1), n(a, "couponList[" + t[1] + "].checked", !0), 
            n(a, "couponIndexCurrent", t[1]), a));
        } else {
            var u;
            this.setData((u = {}, n(u, "couponList[" + this.data.couponIndexCurrent + "].checked", !1), 
            n(u, "couponIndexCurrent", ""), u));
        }
        console.log(this.data.couponList);
    },
    submitChange: function() {
        this.data._oldCouponId;
        if ("" == this.data.couponIndexCurrent) {
            console.log("不选择");
            var n = getCurrentPages();
            n[n.length - 2].setData({
                coupon: null
            }), wx.navigateBack({
                delta: 1
            });
        } else {
            var e = this.data.couponList[this.data.couponIndexCurrent], t = getCurrentPages();
            t[t.length - 2].setData({
                coupon: e
            }), wx.navigateBack({
                delta: 1
            });
        }
    },
    onLoad: function(e) {
        var t = this;
        t.getCoupons().then(function(o) {
            var a = t.data.couponList;
            if (e.couponid) for (var u = 0; u < a.length; u++) if (e.couponid == a[u].couponId) {
                var c;
                console.log(u), t.setData((c = {}, n(c, "couponList[" + u + "].checked", !0), n(c, "couponIndexCurrent", u), 
                c));
                break;
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return t.shareAppMessage;
    }
});