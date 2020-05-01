function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function a(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

var t = e(require("../../api/public.js")), n = e(require("../../utils/axios.js")), r = getApp(), i = new n.default();

Page({
    data: {
        userInfo: {
            userId: "",
            avatarUrl: "",
            nickname: "",
            intro: "",
            sex: 0,
            college: "",
            grade: ""
        }
    },
    changeAvatar: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            success: function(n) {
                i.UploadFile("user/avatar_image", n.tempFilePaths[0], "avatar").then(function(n) {
                    console.log(JSON.parse(n).data), e.setData(a({}, "userInfo.avatarUrl", JSON.parse(n).data)), 
                    t.default.getUserCompleteInfo();
                });
            }
        });
    },
    goChangeNickname: function() {
        wx.navigateTo({
            url: "/pages/edit-partial-info/index?type=nickname"
        });
    },
    goChangeIntro: function() {
        wx.navigateTo({
            url: "/pages/edit-partial-info/index?type=intro"
        });
    },
    goPrivacySettings: function() {
        wx.navigateTo({
            url: "/pages/edit-privacy-settings/index"
        });
    },
    previewAvatar: function(e) {
        var a = e.currentTarget.dataset.url;
        wx.previewImage({
            urls: [ a ]
        });
    },
    onLoad: function(e) {},
    onShow: function() {
        var e = wx.getStorageSync("userCompleteInfo");
        this.setData({
            userInfo: e
        }), console.log(e);
    },
    onShareAppMessage: function() {
        return r.shareAppMessage;
    }
});