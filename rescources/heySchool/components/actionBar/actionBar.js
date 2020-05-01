function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../utils/axios.js")), a = t(require("../../utils/util.js")), i = new e.default();

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        type: String,
        editing: Boolean,
        template: Array,
        btnBottom: {
            type: Number,
            value: 0
        },
        like: Boolean,
        contentId: Number,
        replyId: Number,
        replyType: String,
        toUserId: Number,
        toUserName: String
    },
    data: {
        inputValue: "",
        submitLoading: !1,
        submitImageUrl: []
    },
    methods: {
        changeEditing: function() {
            this.setData({
                editing: !this.data.editing
            });
        },
        microphone: function() {
            wx.showToast({
                title: "正在开发中,敬请期待",
                icon: "none"
            });
        },
        inputComment: function(t) {
            var e = t.detail.value;
            this.setData({
                inputValue: e
            });
        },
        clickSubmit: function() {
            console.log(this.data.type);
            var t = this.data.inputValue.trim(), e = this.data.submitImageUrl;
            "" != t || 0 != e.length ? "comment" == this.data.type ? this.postNewComment() : this.postNewReply() : wx.showToast({
                title: "输入不可为空",
                icon: "none"
            });
        },
        postImage: function(t) {
            var e = this, a = this, n = this.data.submitImageUrl[0];
            i.UploadFile(t, n, "1").then(function(t) {
                a.setData({
                    submitLoading: !1,
                    inputValue: "",
                    editing: !1,
                    submitImageUrl: []
                }), e.triggerEvent("refresh"), wx.showToast({
                    title: "发布成功",
                    icon: "success",
                    duration: 1e3
                }), console.log("图片评论上传成功");
            }).catch(function(e) {
                console.log("图片评论上传失败"), a.postImage(t);
            });
        },
        postNewComment: function() {
            a.default.showSubscribeMessage(this.data.template, function() {
                var t = this, e = this, a = e.data.inputValue.trim(), n = e.data.submitImageUrl, o = {
                    content: a,
                    feedId: e.data.contentId
                };
                e.setData({
                    submitLoading: !0
                }), i.POST("feed/comment", o).then(function(a) {
                    if (0 == n.length) e.setData({
                        submitLoading: !1,
                        inputValue: "",
                        editing: !1
                    }), t.triggerEvent("refresh"), wx.showToast({
                        title: "发布成功",
                        icon: "success",
                        duration: 1e3
                    }), console.log("发布一级评论成功", a.data); else {
                        var i = "feed/image_upload?id=" + a.data.id + "&type=comment";
                        e.postImage(i);
                    }
                }).catch(function(t) {
                    e.setData({
                        submitLoading: !1
                    });
                });
            }.bind(this));
        },
        postNewReply: function(t) {
            a.default.showSubscribeMessage(this.data.template, function() {
                var t = this;
                console.log(this.data.replyId);
                var e = this, a = e.data.inputValue.trim(), n = e.data.submitImageUrl, o = {
                    content: a,
                    commentId: e.data.replyId,
                    type: e.data.replyType
                };
                "reply" == o.type && (o.toUserId = e.data.toUserId, o.toUserName = e.data.toUserName), 
                e.setData({
                    submitLoading: !0
                }), i.POST("feed/comment/reply", o).then(function(a) {
                    if (0 == n.length) e.setData({
                        submitLoading: !1,
                        inputValue: "",
                        editing: !1
                    }), t.triggerEvent("refresh"), wx.showToast({
                        title: "发布成功",
                        icon: "success",
                        duration: 1e3
                    }), console.log("发布二级评论成功", a.data); else {
                        var i = "feed/image_upload?id=" + a.data.id + "&type=reply";
                        e.postImage(i);
                    }
                }).catch(function(t) {
                    e.setData({
                        submitLoading: !1
                    });
                });
            }.bind(this));
        },
        onClickGood: function(t) {
            var e = this, a = this;
            console.log("onClickGood", t);
            var n = t.target.dataset.like, o = a.data.contentId;
            if (n) {
                var s = "?id=" + o + "&type=feed";
                i.DELETE("feed/like" + s).then(function(t) {
                    e.triggerEvent("changelike", "delete"), a.setData({
                        like: !1
                    });
                });
            } else {
                var l = {
                    type: "feed",
                    contentId: o
                };
                i.POST("feed/like", l).then(function(t) {
                    e.triggerEvent("changelike", "add"), a.setData({
                        like: !0
                    });
                });
            }
        },
        getPicture: function() {
            var t = this;
            wx.chooseImage({
                count: 1,
                sizeType: [ "original", "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(e) {
                    var a = e.tempFilePaths;
                    t.setData({
                        submitImageUrl: a
                    });
                }
            });
        },
        previewImage: function() {
            var t = this.data.submitImageUrl;
            wx.previewImage({
                urls: t
            });
        },
        cancelImage: function() {
            this.setData({
                submitImageUrl: []
            });
        }
    }
});