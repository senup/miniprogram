function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var a = e(require("../../api/public.js")), t = e(require("../../utils/axios.js")), i = getApp(), n = new t.default();

Page({
    data: {
        baseImageUrl: i.globalData.baseImageURL,
        isLogin: !1,
        userInfo: {
            avatarUrl: "",
            nickname: "",
            sex: 0,
            college: "",
            grade: "",
            idauth: !1
        },
        cellList: [ {
            value: "个人中心",
            image: "/images/my/mine_grzy.png",
            navigateUrl: "/pages/personal-center/index",
            isNavigate: !0,
            show: !0,
            isNew: !0
        }, {
            value: "成为认证用户",
            image: "/images/my/renzhen.png",
            navigateUrl: "/pages/my-auth/index",
            isNavigate: !0,
            show: !0
        }, {
            value: "我的接单",
            image: "/images/my/renzhen.png",
            navigateUrl: "/pages/my-accept/index",
            isNavigate: !0,
            show: !1
        }, {
            value: "消息",
            image: "/images/my/msg.png",
            navigateUrl: "/pages/my-message/index",
            isNavigate: !0,
            show: !0
        }, {
            value: "钱包",
            image: "/images/my/pay.png",
            navigateUrl: "/pages/my-wallet/index",
            isNavigate: !0,
            show: !0
        }, {
            value: "帮助与反馈",
            image: "/images/my/bangzhu.png",
            navigateUrl: "/pages/my-help/index",
            isNavigate: !0,
            show: !0
        } ],
        tabBarMore: !1,
        taskPublish: 0,
        taskAccepted: 0,
        taskWaiting: 0
    },
    onClickCell: function(e) {
        var a = e.currentTarget.dataset.index, t = this.data.cellList[a];
        t.isNavigate && wx.navigateTo({
            url: t.navigateUrl
        });
    },
    goToAuthorization: function() {
        wx.navigateTo({
            url: "/pages/authorization/index"
        });
    },
    logout: function() {
        console.log("logout"), wx.removeStorageSync("userInfo"), wx.removeStorageSync("token"), 
        wx.removeStorageSync("registryStatus"), wx.removeStorageSync("userPhoneNumber"), 
        wx.removeStorageSync("userCompleteInfo"), wx.removeStorageSync("userCompleteInfoTimeOut"), 
        wx.removeStorageSync("collegeId"), wx.removeStorageSync("pageUrl"), wx.clearStorage(), 
        wx.redirectTo({
            url: "/pages/my/index"
        });
    },
    getTaskCount: function() {
        var e = this;
        n.POST("feed/task/count").then(function(a) {
            e.setData({
                taskPublish: a.data.publish ? a.data.publish : 0,
                taskAccepted: a.data.accepted ? a.data.accepted : 0,
                taskWaiting: a.data.waiting_settle ? a.data.waiting_settle : 0
            });
        });
    },
    goMyTasks: function(e) {
        var a = e.currentTarget.dataset.status;
        wx.navigateTo({
            url: "/pages/my-publish/index?status=" + a
        });
    },
    previewAvatar: function(e) {
        var a = e.currentTarget.dataset.url;
        wx.previewImage({
            urls: [ a ]
        });
    },
    onLoad: function(e) {},
    onHide: function() {
        this.setData({
            tabBarMore: !1
        });
    },
    onShow: function() {
        var e = this, t = this, i = wx.getStorageSync("token"), n = wx.getStorageSync("registryStatus");
        wx.getStorageSync("userCompleteInfo");
        i && 2 == n && (t.setData({
            isLogin: !0
        }), t.getTaskCount(), a.default.getUserCompleteInfo().then(function(a) {
            if (t.setData({
                userInfo: a.data
            }), e.data.userInfo.idauth) {
                var i = t.data.cellList;
                i[1].show = !1, i[2].show = !0, t.setData({
                    cellList: i
                });
            }
        }));
    },
    onShareAppMessage: function() {
        return i.shareAppMessage;
    }
});