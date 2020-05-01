function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

var e = a(require("../../api/public.js")), t = new (a(require("../../utils/axios.js")).default)(), i = getApp();

Page({
    data: {
        baseImageUrl: i.globalData.baseImageURL,
        idCardImage: i.globalData.baseImageURL + "static/my/id-card.png",
        idCardImageReverse: i.globalData.baseImageURL + "static/my/id-card.png",
        disabled: !0,
        loading: !1,
        uploadAuthFlag: !1,
        uploadAuthReverseFlag: !1
    },
    chooseImage: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            success: function(e) {
                a.setData({
                    idCardImage: e.tempFilePaths[0],
                    uploadAuthFlag: !0
                });
            },
            complete: function(e) {
                a.checkBtnState();
            }
        });
    },
    chooseImageReverse: function() {
        var a = this;
        wx.chooseImage({
            count: 1,
            success: function(e) {
                a.setData({
                    idCardImageReverse: e.tempFilePaths[0],
                    uploadAuthReverseFlag: !0
                });
            },
            complete: function(e) {
                a.checkBtnState();
            }
        });
    },
    checkBtnState: function() {
        this.data.uploadAuthFlag && this.data.uploadAuthReverseFlag && this.setData({
            disabled: !1
        });
    },
    postAuthImage: function() {
        var a = this;
        this.setData({
            loading: !0
        });
        var i = t.UploadFile("user/identity_image", this.data.idCardImage, "front"), n = t.UploadFile("user/identity_image", this.data.idCardImageReverse, "back");
        Promise.all([ i, n ]).then(function(t) {
            a.setData({
                loading: !1
            }), e.default.getUserCompleteInfo().then(function(a) {
                wx.showToast({
                    title: "提交成功",
                    icon: "none"
                }), wx.navigateBack({
                    delta: 1
                });
            }).catch(function(a) {});
        }).catch(function(e) {
            a.setData({
                loading: !1
            }), wx.showToast({
                title: "图片上传失败,请重新尝试",
                icon: "none"
            });
        });
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {},
    onShareAppMessage: function() {
        return i.shareAppMessage;
    }
});