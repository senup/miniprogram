function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../../utils/axios.js")), a = t(require("../../../utils/util.js")), o = new e.default();

Component({
    properties: {
        files: Array,
        content: String,
        template: Array
    },
    options: {
        addGlobalClass: !0
    },
    data: {
        loading: !1,
        allCount: 0
    },
    observers: {
        allCount: function(t) {
            this.data.allCount == this.data.files.length && (wx.showToast({
                title: "发布成功",
                icon: "success"
            }), setTimeout(function() {
                wx.reLaunch({
                    url: "/pages/index/index"
                });
            }, 2e3));
        }
    },
    methods: {
        postFeed: function(t) {
            var e = this, a = {
                content: e.data.content.trim(),
                type: t
            };
            o.POST("feed", a).then(function(a) {
                if (console.log(a.data), "post" == t) wx.showToast({
                    title: "发布成功",
                    icon: "success"
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "/pages/index/index"
                    });
                }, 2e3); else if ("post_image" == t) for (var o = e.data.files, s = 0; s < o.length; s++) e.postImage(a.data, o, s);
            });
        },
        postImage: function(t, e, a) {
            var s = this, i = "feed/image_upload?id=" + t + "&type=feed";
            o.UploadFile(i, e[a], a.toString()).then(function(t) {
                s.setData({
                    allCount: s.data.allCount + 1
                }), console.log("第", a, "张图片已完成上传");
            }).catch(function(o) {
                console.log("fail", a), s.postImage(t, e, a);
            });
        },
        onPublish: function(t) {
            a.default.showSubscribeMessage(this.data.template, function() {
                if (0 != this.data.files.length || "" != this.data.content.trim()) {
                    if (!this.data.loading) {
                        this.setData({
                            loading: !0
                        });
                        var t = "post";
                        0 != this.data.files.length && (t = "post_image"), this.postFeed(t), console.log(this.data.files), 
                        console.log(this.data.content);
                    }
                } else wx.showToast({
                    title: "发布内容不可为空",
                    icon: "none",
                    duration: 2e3
                });
            }.bind(this));
        }
    }
});