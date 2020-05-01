function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../utils/axios.js")), a = t(require("../../utils/util.js")), n = getApp(), o = new e.default();

Page({
    data: {
        type: 0,
        name: "",
        phoneNumber: "",
        bounty: 0,
        expresses: [],
        note: "",
        content: "",
        imageList: [],
        feedId: "",
        templateNameList: [ "task-accepted", "task-confirm-by-acceptor", "task-cancel-by-acceptor" ],
        templateDetailList: []
    },
    onLoad: function(t) {
        var e = this;
        if (t.type && t.requestData) {
            var n = t.type, o = JSON.parse(t.requestData);
            0 == n ? e.setData({
                type: 0,
                name: o.name,
                phoneNumber: o.phoneNumber,
                bounty: o.bounty,
                expresses: o.expresses
            }) : (n = 1) && e.setData({
                type: 1,
                name: o.name,
                phoneNumber: o.phoneNumber,
                bounty: o.bounty,
                content: o.content,
                imageList: o.imageList
            });
        }
        t.coupon ? e.setData({
            coupon: JSON.parse(t.coupon)
        }) : e.getCoupons(), a.default.getTemplateDetailList(this, "templateNameList", "templateDetailList");
    },
    onShow: function() {
        this.getPreferential();
    },
    getPreferential: function() {
        var t = this;
        if (console.log(t.data.coupon), t.data.coupon) {
            var e = t.data.coupon;
            if (1 == e.type) {
                var a = (t.data.bounty - e.discountAmount).toFixed(2);
                t.setData({
                    discountAmount: e.discountAmount.toFixed(2),
                    amount: a
                });
            }
            if (2 == e.type) {
                var n = t.data.bounty, o = parseFloat(n * e.discountPrecent * .01).toFixed(2), s = (t.data.bounty - o).toFixed(2);
                t.setData({
                    discountAmount: s,
                    amount: o
                });
            }
        } else t.setData({
            amount: t.data.bounty,
            discountAmount: 0
        });
        console.log(t.data.discountAmount);
    },
    clickPay: function(t) {
        "" == this.data.feedId ? this.postFeed() : this.postPay();
    },
    postPay: function() {
        var t = this, e = this.data.feedId, n = {
            id: e
        };
        this.data.coupon && (n.couponId = this.data.coupon.couponId), o.POST("wechatpay/order", n).then(function(n) {
            wx.requestPayment({
                nonceStr: n.data.nonceStr,
                package: n.data.prepay,
                signType: n.data.signType,
                paySign: n.data.paySign,
                timeStamp: n.data.timeStamp,
                success: function(n) {
                    a.default.showSubscribeMessage(t.data.templateDetailList, function() {
                        wx.reLaunch({
                            url: "/pages/index/index",
                            success: function() {
                                wx.navigateTo({
                                    url: "/pages/publish-success/index?id=" + e
                                });
                            }
                        });
                    });
                },
                fail: function() {
                    wx.showToast({
                        title: "支付失败，请重新发起支付",
                        icon: "none"
                    });
                }
            });
        }).catch(function(t) {
            console.log("fail");
        });
    },
    postFeed: function() {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        });
        var t = this, e = "task", a = {
            type: "task",
            name: t.data.name,
            phonenumber: t.data.phoneNumber,
            amount: t.data.bounty
        };
        0 == t.data.type ? (a.expresses = t.data.expresses, a.note = t.data.note) : 1 == t.data.type && (a.content = t.data.content, 
        t.data.imageList && (e = "task_image", a.type = "task_image")), o.POST("feed", a).then(function(n) {
            if (console.log(n.data), wx.hideLoading(), t.setData({
                feedId: n.data
            }), t.postPay(), wx.setStorageSync("userPublishName", a.name), "task_image" == e) for (var o = t.data.imageList, s = 0; s < o.length; s++) t.postImage(n.data, o, s);
        }).catch(function(t) {
            wx.hideLoading(), console.log("fail");
        });
    },
    postImage: function(t, e, a) {
        var n = this, s = "feed/image_upload?id=" + t + "&type=feed";
        o.UploadFile(s, e[a], a.toString()).then(function(t) {
            n.setData({
                allCount: n.data.allCount + 1
            }), console.log("第", a, "张图片已完成上传");
        }).catch(function(o) {
            console.log("fail", a), n.postImage(t, e, a);
        });
    },
    goCoupons: function() {
        if (0 != this.data.couponList.length) {
            var t = "/pages/publish-confirm-coupons/index";
            this.data.coupon && (t += "?couponid=" + this.data.coupon.couponId), wx.navigateTo({
                url: t
            });
        }
    },
    getCoupons: function() {
        var t = this, e = o.GET("user/coupon");
        return e.then(function(e) {
            t.setData({
                couponList: e.data
            });
        }), e;
    },
    onShareAppMessage: function() {
        return n.shareAppMessage;
    }
});