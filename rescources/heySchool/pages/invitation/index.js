var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/axios.js")), t = getApp(), a = new e.default();

Page({
    data: {
        baseImageUrl: t.globalData.baseImageURL,
        imageUrl: "",
        completeLoading: !0,
        shareBtn: !0
    },
    getShareCode: function() {
        var e = this, t = {
            userId: wx.getStorageSync("userCompleteInfo").userId
        };
        return console.log("param", t), a.POST("share/share_code", t).then(function(t) {
            e.setData({
                shareCode: t.data,
                shareBtn: !1
            });
        });
    },
    getQRCodeImage: function() {
        var e = this, t = {
            userId: wx.getStorageSync("userCompleteInfo").userId
        };
        return console.log("param", t), new Promise(function(o, n) {
            a.POST("share/share_qrcode_img", t).then(function(t) {
                wx.getImageInfo({
                    src: t.data,
                    success: function(t) {
                        console.log("rqCodeURL", t), e.setData({
                            rqCodeURL: t.path
                        }), o(t);
                    }
                });
            });
        });
    },
    getBackgroundImage: function() {
        var e = this;
        return new Promise(function(t, a) {
            wx.getImageInfo({
                src: e.data.baseImageUrl + "static/invitation/img_fx.jpg",
                success: function(a) {
                    console.log("downloadImage", a), e.setData({
                        backgroundURL: a.path
                    }), console.log("backgroundURL", e.data.backgroundURL), t(a);
                }
            });
        });
    },
    drawImage: function() {
        console.log("begin drawImage");
        var e = this, t = wx.createCanvasContext("invitationImage");
        t.drawImage(e.data.backgroundURL, 0, 0, 750, 1334), t.rotate(-5 * Math.PI / 180), 
        t.drawImage(e.data.rqCodeURL, 265, 723, 164, 164), t.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: 750,
                height: 1334,
                destWidth: 750,
                destHeight: 1334,
                canvasId: "invitationImage",
                success: function(t) {
                    e.setData({
                        imageUrl: t.tempFilePath,
                        completeLoading: !1
                    });
                },
                fail: function() {
                    console.log("fail");
                }
            });
        });
    },
    saveImage: function() {
        console.log("Save", this.data.imageUrl), wx.saveImageToPhotosAlbum({
            filePath: this.data.imageUrl,
            success: function(e) {
                wx.showToast({
                    title: "保存成功",
                    icon: "success",
                    duration: 2e3
                });
            },
            fail: function(e) {
                "saveImageToPhotosAlbum:fail:auth denied" !== e.errMsg && "saveImageToPhotosAlbum:fail auth deny" !== e.errMsg || wx.showModal({
                    title: "提示",
                    content: "需要您授权保存相册",
                    showCancel: !1,
                    success: function(e) {
                        wx.openSetting({
                            success: function(e) {
                                console.log("settingdata", e), e.authSetting["scope.writePhotosAlbum"] ? wx.showModal({
                                    title: "提示",
                                    content: "获取权限成功,再次点击图片即可保存",
                                    showCancel: !1
                                }) : wx.showModal({
                                    title: "提示",
                                    content: "获取权限失败，将无法保存到相册哦~",
                                    showCancel: !1
                                });
                            },
                            fail: function(e) {
                                console.log("failData", e);
                            },
                            complete: function(e) {
                                console.log("finishData", e);
                            }
                        });
                    }
                });
            }
        });
    },
    backTo: function(e) {
        wx.navigateBack({
            delta: 1
        });
    },
    onLoad: function(e) {
        var t = wx.getStorageSync("token"), a = wx.getStorageSync("userCompleteInfo").userId;
        if (!t || !a) return wx.showToast({
            title: "未登陆!",
            icon: "none",
            duration: 2e3
        }), wx.setStorageSync("pageUrl", "/pages/invitation/index"), void setTimeout(function() {
            wx.navigateTo({
                url: "/pages/auth/index"
            });
        }, 1e3);
    },
    onShow: function() {
        var e = this;
        this.getShareCode();
        var t = this.getQRCodeImage(), a = this.getBackgroundImage();
        Promise.all([ t, a ]).then(function(t) {
            e.drawImage(), console.log("get image success");
        }).catch(function(e) {
            console.log("get image error");
        });
    },
    onHide: function() {},
    onShareAppMessage: function() {
        return {
            title: "送您一张优惠券，还有机会赢 免单哦",
            path: "/pages/index/index?sharecode=" + this.data.shareCode,
            imageUrl: this.data.baseImageUrl + "static/invitation/img_xcx.png",
            success: function(e) {
                console.log("成功", e);
            }
        };
    }
});