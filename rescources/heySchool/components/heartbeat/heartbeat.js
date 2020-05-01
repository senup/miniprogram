function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../utils/axios.js")), e = t(require("../../utils/util.js")), n = getApp(), o = new a.default();

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        heartbeatState: Number,
        toUserId: Number,
        template: Array
    },
    data: {
        baseImageUrl: n.globalData.baseImageURL,
        windowOpen: !1,
        whatOpen: !1
    },
    methods: {
        openWindows: function(t) {
            console.log(t), this.setData({
                windowOpen: !0
            });
        },
        closeWindows: function() {
            0 == this.data.whatOpen && this.setData({
                windowOpen: !1
            });
        },
        openWindowWhat: function() {
            this.setData({
                whatOpen: !0
            });
        },
        closeWindowWhat: function() {
            this.setData({
                whatOpen: !1
            });
        },
        addHeartbeatState: function(t) {
            e.default.showSubscribeMessage(this.data.template, function() {
                var t = this;
                if (0 == t.data.heartbeatState) {
                    var a = {
                        toUserId: t.data.toUserId
                    };
                    wx.showLoading({
                        title: "提交中...",
                        mask: !0
                    }), o.POST("user/like", a).then(function(a) {
                        wx.hideLoading(), t.setData({
                            heartbeatState: a.data
                        }), console.log("心动", a.data);
                    }).catch(function(t) {
                        wx.hideLoading();
                    });
                }
            }.bind(this));
        }
    }
});