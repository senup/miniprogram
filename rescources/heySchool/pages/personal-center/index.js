function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../utils/axios.js")), a = t(require("../../utils/util.js")), s = getApp(), n = new e.default();

Page({
    data: {
        userId: "",
        self: !1,
        userInfo: {
            avatarUrl: "",
            nickname: "",
            sex: 0,
            college: "",
            grade: "2016",
            intro: "",
            idauth: !1,
            official: !1
        },
        statistical: [ {
            count: 9,
            name: "印象"
        }, {
            count: 257,
            name: "动态"
        }, {
            count: 27,
            name: "任务"
        }, {
            count: 16,
            name: "接单"
        } ],
        impressions: [],
        tabList: [ {
            name: "动态",
            value: "post"
        }, {
            name: "任务",
            value: "task"
        } ],
        tabCurrent: "post",
        pageCurrent: 1,
        floorstatus: !1,
        loading: !1,
        isNoMore: !1,
        completeLoading: !0,
        privacySettings: {},
        noPower: !1,
        templateNameList: [ "user-like-notify" ],
        templateDetailList: []
    },
    getInfo: function(t) {
        var e = this, a = n.GET("user/info_extra?uid=" + t);
        return a.then(function(t) {
            console.log("info_extra", t);
            var a = t.data.userInfo, s = [], n = e.data.privacySettings, i = e.data.self;
            void 0 !== t.data.impression && s.push({
                count: t.data.impression,
                name: "印象"
            }), !i && n.hiddenPost || s.push({
                count: t.data.post,
                name: "动态"
            }), !i && n.hiddenTask || s.push({
                count: t.data.task,
                name: "任务"
            }), !i && n.hiddenAcceptedTask || s.push({
                count: t.data.accepted,
                name: "接单"
            }), e.setData({
                userInfo: a,
                statistical: s
            });
        }).catch(function(t) {}), a;
    },
    getPrivacySettings: function(t) {
        var e = this, a = n.GET("user/privacy_settings?uid=" + t);
        return a.then(function(t) {
            e.setData({
                privacySettings: t.data
            });
        }), a;
    },
    getImpression: function(t) {
        var e = this, a = n.GET("impression/ucpage?uid=" + t);
        return a.then(function(t) {
            console.log("impression", t), e.setData({
                impressions: t.data
            });
        }).catch(function(t) {}), a;
    },
    getHeartbeat: function(t) {
        var e = this;
        n.GET("user/like?uid=" + t).then(function(t) {
            console.log("heartbeatState", t), e.setData({
                heartbeatState: t.data
            });
        }).catch(function(t) {});
    },
    getFeed: function(t) {
        var e = this, a = this.data.tabCurrent, s = this.data.privacySettings;
        if (this.data.self || !("post" == a && s.hiddenPost || "task" == a && s.hiddenTask)) {
            if (this.setData({
                noPower: !1
            }), 1 != this.data.isNoMore || t) {
                t ? e.setData({
                    isNoMore: !1,
                    pageCurrent: 1
                }) : e.setData({
                    pageCurrent: this.data.pageCurrent + 1
                }), e.setData({
                    loading: !0
                });
                var i = "feed/index/" + this.data.pageCurrent + "?type=" + a + "&uid=" + this.data.userId;
                return n.GET(i).then(function(a) {
                    e.setData({
                        loading: !1
                    }), a.data.length < 10 && e.setData({
                        isNoMore: !0
                    });
                    var s = a.data.map(function(t) {
                        return t.userInfo = {}, t.userInfo.avatarUrl = t.avatarUrl, t.userInfo.idauth = t.idauth, 
                        t.userInfo.nickname = t.nickname, t.userInfo.sex = t.sex, t.userInfo.datetime = t.datetime, 
                        t.userInfo.college = t.college, t.userInfo.grade = t.grade, t.userInfo.official = t.official, 
                        t;
                    }), n = void 0;
                    n = t ? s : e.data.cardList.concat(s), e.setData({
                        cardList: n
                    });
                }).catch(function(t) {
                    e.setData({
                        loading: !1
                    });
                });
            }
        } else this.setData({
            cardList: [],
            noPower: !0
        });
    },
    onLoad: function(t) {
        var e = wx.getStorageSync("userCompleteInfo");
        t.uid ? (console.log("userCompleteInfo.userId", e.userId), console.log("options.uid", t.uid), 
        e.userId == parseInt(t.uid) ? this.setData({
            userId: e.userId,
            self: !0
        }) : this.setData({
            userId: t.uid,
            self: !1
        })) : this.setData({
            userId: e.userId,
            self: !0
        }), a.default.getTemplateDetailList(this, "templateNameList", "templateDetailList");
    },
    onShow: function() {
        var t = this, e = this;
        this.getPrivacySettings(this.data.userId).then(function() {
            var a = t.getInfo(t.data.userId), s = t.getImpression(t.data.userId);
            Promise.all([ a, s ]).then(function(a) {
                e.setData({
                    completeLoading: !1
                }), t.getFeed(!0);
            }).catch(function(t) {
                console.log(t);
            });
        }), console.log("is self", this.data.self), this.data.self || this.getHeartbeat(this.data.userId);
    },
    onHide: function() {},
    onPullDownRefresh: function() {
        this.data.loading || (this.getInfo(this.data.userId), this.getImpression(this.data.userId), 
        this.getFeed(!0).then(wx.stopPullDownRefresh()));
    },
    onReachBottom: function() {
        this.data.loading || this.data.isNoMore || this.getFeed(!1);
    },
    onPageScroll: function(t) {
        t.scrollTop > 200 ? 0 == this.data.floorstatus && this.setData({
            floorstatus: !0
        }) : 1 == this.data.floorstatus && this.setData({
            floorstatus: !1
        });
    },
    goTop: function(t) {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    onShareAppMessage: function() {
        return s.shareAppMessage;
    },
    changeTab: function(t) {
        var e = t.currentTarget.dataset.value;
        this.data.tabCurrent != e && (this.setData({
            tabCurrent: e
        }), this.getFeed(!0));
    },
    goEditInfo: function() {
        wx.navigateTo({
            url: "/pages/edit-complete-info/index"
        });
    },
    goChangeIntro: function() {
        wx.navigateTo({
            url: "/pages/edit-partial-info/index?type=intro"
        });
    },
    previewAvatar: function(t) {
        var e = t.currentTarget.dataset.url;
        wx.previewImage({
            urls: [ e ]
        });
    },
    goAddImpression: function() {
        wx.navigateTo({
            url: "/pages/impression-add/index?userinfo=" + JSON.stringify(this.data.userInfo)
        });
    }
});