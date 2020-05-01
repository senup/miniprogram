function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a = e(require("../../utils/axios.js")), s = e(require("../../utils/util.js")), n = getApp(), i = new a.default();

Page({
    data: {
        tabList: [ "取快递", "其他任务" ],
        tabCurrent: 0,
        name: wx.getStorageSync("userPublishName"),
        phoneNumber: wx.getStorageSync("userCompleteInfo").phonenumber,
        recentAddress: [],
        info: [],
        describe: "",
        bounty: "",
        submitFlag: !1,
        imageList: [],
        showPreview: !1,
        templateNameList: [ "feed-comment-reply" ],
        templateDetailList: []
    },
    onLoad: function(e) {
        this.getRecentAddress(), console.log("userCompleteInfo", wx.getStorageSync("userCompleteInfo")), 
        e.coupon && this.setData({
            couponJson: e.coupon
        }), s.default.getTemplateDetailList(this, "templateNameList", "templateDetailList");
    },
    tabClick: function(e) {
        var t = e.currentTarget.id;
        t != this.data.tabCurrent && this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            tabCurrent: t
        });
    },
    getRecentAddress: function() {
        var e = this;
        i.GET("user/recent_address").then(function(t) {
            var a = e.data.info, s = {
                startAddress: "",
                endAddress: "",
                message: ""
            };
            s.recentAddress = t.data, a.push(s), e.setData({
                info: a,
                recentAddress: t.data
            }), console.log(e.data.recentAddress);
        });
    },
    inputName: function(e) {
        var t = e.detail.value;
        this.setData({
            name: t
        });
    },
    inputPhone: function(e) {
        var t = e.detail.value;
        this.setData({
            phoneNumber: t
        });
    },
    insertDelivery: function() {
        var e = this.data.info, t = {
            startAddress: "",
            endAddress: "",
            message: ""
        };
        t.recentAddress = this.data.recentAddress, e.push(t), this.setData({
            info: e
        }), console.log(this.data.info);
    },
    deleteDelivery: function(e) {
        console.log("index", e.currentTarget.dataset.index);
        var t = this.data.info, a = e.currentTarget.dataset.index;
        1 != t.length && (t.splice(a, 1), this.setData({
            info: t
        }), console.log("info", t));
    },
    setPickUplocation: function(e) {
        var a = e.target.dataset.index, s = e.detail.value;
        this.setData(t({}, "info[" + a + "].startAddress", s));
    },
    setDeliveryLocation: function(e) {
        var a = e.target.dataset.index, s = e.detail.value;
        this.setData(t({}, "info[" + a + "].endAddress", s));
    },
    setDeliveryDetail: function(e) {
        var a = e.target.dataset.index, s = e.detail.value;
        this.setData(t({}, "info[" + a + "].message", s));
    },
    setPickUpLocationPicker: function(e) {
        var a = e.target.dataset.index, s = e.detail.value;
        this.setData(t({}, "info[" + a + "].startAddress", this.data.recentAddress[s]));
    },
    setDeliveryLocationPicker: function(e) {
        var a = e.target.dataset.index, s = e.detail.value;
        this.setData(t({}, "info[" + a + "].endAddress", this.data.recentAddress[s]));
    },
    setDescribe: function(e) {
        var t = e.detail.value;
        this.setData({
            describe: t
        });
    },
    inputBounty: function(e) {
        var t, a = this, s = e.detail.value;
        t = /^(\d?)+(\.\d{0,2})?$/.test(e.detail.value) ? e.detail.value : e.detail.value.substring(0, e.detail.value.length - 1), 
        s >= 3 ? a.setData({
            submitFlag: !0,
            bounty: t
        }) : (wx.showToast({
            title: "赏金最低三元起",
            icon: "none"
        }), a.setData({
            submitFlag: !1,
            bounty: t
        }));
    },
    onClickSubmit: function() {
        s.default.showSubscribeMessage(this.data.templateDetailList, function() {
            var e = this;
            e.setData({
                name: e.data.name.trim(),
                phoneNumber: e.data.phoneNumber.trim()
            }), "" != e.data.name ? /^1\d{10}$/.test(e.data.phoneNumber) ? 0 == e.data.tabCurrent ? e.chackExpressageTask() : e.chackOtherTask() : wx.showToast({
                title: "请填写正确的手机号码",
                icon: "none"
            }) : wx.showToast({
                title: "请输入姓名",
                icon: "none"
            });
        }.bind(this));
    },
    chackExpressageTask: function() {
        for (var e = this, t = [], a = 0; a < e.data.info.length; a++) {
            var s = {
                startAddress: e.data.info[a].startAddress.trim(),
                endAddress: e.data.info[a].endAddress.trim(),
                message: e.data.info[a].message.trim()
            };
            t.push(s);
        }
        e.setData({
            info: t
        });
        for (var n = 0; n < e.data.info.length; n++) if ("" == e.data.info[n].startAddress || "" == e.data.info[n].endAddress || "" == e.data.info[n].message) return void wx.showToast({
            title: "取件内容不可为空",
            icon: "none"
        });
        var i = {
            name: e.data.name,
            phoneNumber: e.data.phoneNumber,
            bounty: e.data.bounty,
            expresses: e.data.info
        };
        console.log(i);
        var r = "/pages/publish-confirm/index?";
        r += "type=0&requestData=" + JSON.stringify(i), e.data.couponJson && (r += "&coupon=" + e.data.couponJson), 
        wx.navigateTo({
            url: r
        });
    },
    chackOtherTask: function() {
        var e = this;
        if (e.setData({
            describe: e.data.describe.trim()
        }), "" != e.data.describe) {
            var t = {
                name: e.data.name,
                phoneNumber: e.data.phoneNumber,
                bounty: e.data.bounty,
                content: e.data.describe,
                imageList: e.data.imageList
            };
            console.log(t);
            var a = "/pages/publish-confirm/index?";
            a += "type=1&requestData=" + JSON.stringify(t), e.data.couponJson && (a += "&coupon=" + e.data.couponJson), 
            wx.navigateTo({
                url: a
            });
        } else wx.showToast({
            title: "请输入任务描述",
            icon: "none"
        });
    },
    updataImageList: function(e) {
        this.setData({
            imageList: e.detail
        });
    },
    getShowPreview: function(e) {
        this.setData({
            showPreview: e.detail
        });
    },
    onShareAppMessage: function() {
        return n.shareAppMessage;
    }
});