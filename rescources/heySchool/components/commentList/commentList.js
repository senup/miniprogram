function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../utils/axios.js")), a = e(require("../../utils/util.js")), n = new t.default();

Component({
    properties: {
        commentList: Array,
        isLoading: Boolean,
        isNoMore: Boolean,
        userInfo: Object,
        template: Array,
        btnBottom: {
            type: Number,
            value: 0
        }
    },
    options: {
        addGlobalClass: !0
    },
    data: {
        commentDetail: !1,
        detailIndex: 0,
        replyList: [],
        replyPage: 1,
        isNoMoreReply: !1,
        replyId: 0,
        replyType: "comment",
        replyInputPlaceholder: "说点什么吧~",
        replyInput: "",
        replyLoading: !1
    },
    observers: {
        commentDetail: function(e) {
            this.triggerEvent("show", e);
        }
    },
    methods: {
        postLike: function(e, t) {
            var a = {
                type: t,
                contentId: e
            };
            return n.POST("feed/like", a);
        },
        deleteLike: function(e, t) {
            var a = "?id=" + e + "&type=" + t;
            return n.DELETE("feed/like" + a);
        },
        clickCommentGood: function(e) {
            var t = this, a = e.currentTarget.dataset.like, n = e.currentTarget.dataset.id, i = e.currentTarget.dataset.index;
            a ? t.deleteLike(n, "comment").then(function(e) {
                var a = t.data.commentList;
                a[i].like = !1, a[i].likeCount = a[i].likeCount - 1, t.setData({
                    commentList: a
                });
            }) : t.postLike(n, "comment").then(function(e) {
                var a = t.data.commentList;
                a[i].like = e.data.like, a[i].likeCount = e.data.likeCount, t.setData({
                    commentList: a
                });
            });
        },
        clickReplyGood: function(e) {
            var t = this, a = e.currentTarget.dataset.like, n = e.currentTarget.dataset.id, i = e.currentTarget.dataset.index;
            a ? t.deleteLike(n, "reply").then(function(e) {
                var a = t.data.replyList;
                a[i].like = !1, a[i].likeCount = a[i].likeCount - 1, t.setData({
                    replyList: a
                });
            }) : t.postLike(n, "reply").then(function(e) {
                var a = t.data.replyList;
                a[i].like = e.data.like, a[i].likeCount = e.data.likeCount, t.setData({
                    replyList: a
                });
            });
        },
        getReplyList: function(e) {
            var t = this;
            if (!t.data.isNoMoreReply) {
                t.setData({
                    loadingReply: !0
                });
                var i = t.data.commentList, r = t.data.detailIndex;
                return n.GET("feed/comment/" + i[r].id + "/reply/" + e).then(function(n) {
                    n.data.length < 10 && t.setData({
                        isNoMoreReply: !0
                    });
                    var i = n.data.map(function(e) {
                        return e.userInfo = {}, e.userInfo.userId = e.userId, e.userInfo.avatarUrl = e.avatarUrl, 
                        e.userInfo.idauth = e.idauth, e.userInfo.nickname = e.nickname, e.userInfo.sex = e.sex, 
                        e.userInfo.datetime = a.default.trimTime(e.datetime), e.userInfo.college = e.collegeName, 
                        e.userInfo.grade = e.enrollYear, e.userInfo.official = e.official, e;
                    }), r = [];
                    r = 1 == e ? i : t.data.replyList.concat(i), t.setData({
                        replyList: r,
                        loadingReply: !1
                    });
                }).catch(function(e) {
                    t.setData({
                        loadingReply: !1
                    });
                });
            }
        },
        getNextPageReply: function() {
            var e = this;
            e.setData({
                replyPage: e.data.replyPage + 1
            }), e.getReplyList(e.data.replyPage);
        },
        clickMoreReply: function(e) {
            var t = e.currentTarget.dataset.index;
            this.openCommentDetail(t);
        },
        openCommentDetail: function(e) {
            this.setData({
                detailIndex: e,
                commentDetail: !0,
                isNoMoreReply: !1,
                replyPage: 1
            }), this.getReplyList(this.data.replyPage), this.backStandardReply();
        },
        closeCommentDetail: function() {
            this.setData({
                commentDetail: !1
            });
        },
        clickCommentShowActionSheet: function(e) {
            var t = this, a = e.currentTarget.dataset.userId, n = e.currentTarget.dataset.index, i = t.data.commentList[n].id, r = [];
            console.log(e), null != a && (r = a == t.data.userInfo.userId ? [ "回复", "删除" ] : [ "回复" ], 
            wx.showActionSheet({
                itemList: r,
                success: function(e) {
                    switch (r[e.tapIndex]) {
                      case "回复":
                        t.setData({
                            isFocus: !0
                        }), t.openCommentDetail(n);
                        break;

                      case "删除":
                        t.deleteComment(i, n);
                    }
                }
            }));
        },
        clickReplyShowActionSheet: function(e) {
            var t = this, a = e.currentTarget.dataset.userId, n = e.currentTarget.dataset.index, i = t.data.replyList[n].id, r = [];
            r = a == t.data.userInfo.userId ? [ "回复", "删除" ] : [ "回复" ], wx.showActionSheet({
                itemList: r,
                success: function(e) {
                    switch (r[e.tapIndex]) {
                      case "回复":
                        console.log("id", i);
                        var a = "回复：" + t.data.replyList[n].nickname;
                        t.setData({
                            isFocus: !0,
                            replyId: i,
                            replyType: "reply",
                            replyInputPlaceholder: a,
                            toUserId: t.data.replyList[n].userId,
                            toUserName: t.data.replyList[n].nickname
                        });
                        break;

                      case "删除":
                        t.deleteReply(i, n);
                    }
                }
            });
        },
        deleteComment: function(e, t) {
            var i = this;
            a.default.showModal("确认要删除该条信息吗?", function() {
                wx.showLoading({
                    title: "删除中",
                    mask: !0
                }), n.DELETE("feed/comment/" + e).then(function(e) {
                    wx.hideLoading();
                    var a = i.data.commentList;
                    a.splice(t, 1), i.setData({
                        commentList: a
                    }), wx.showToast({
                        title: "删除成功",
                        icon: "success",
                        duration: 1e3
                    }), i.triggerEvent("change", a);
                }).catch(function(e) {
                    wx.hideLoading();
                });
            });
        },
        deleteReply: function(e, t) {
            var i = this;
            a.default.showModal("确认要删除该条信息吗?", function() {
                wx.showLoading({
                    title: "删除中",
                    mask: !0
                }), n.DELETE("feed/comment/reply/" + e).then(function(e) {
                    wx.hideLoading();
                    var a = i.data.replyList;
                    a.splice(t, 1);
                    var n = i.data.commentList;
                    n[i.data.detailIndex].replyCount--, i.setData({
                        replyList: a,
                        commentList: n
                    }), wx.showToast({
                        title: "删除成功",
                        icon: "success",
                        duration: 1e3
                    });
                }).catch(function(e) {
                    wx.hideLoading();
                });
            });
        },
        refresh: function() {
            this.setData({
                isNoMoreReply: !1,
                replyPage: 1
            }), this.getReplyList(this.data.replyPage), this.triggerEvent("refresh");
        },
        backStandardReply: function() {
            var e = this.data.detailIndex;
            this.setData({
                replyId: this.data.commentList[e].id,
                replyType: "comment",
                replyInputPlaceholder: "说点什么吧~",
                toUserId: "",
                toUserName: ""
            });
        },
        goPersonalCenter: function(e) {
            var t = e.currentTarget.dataset.uid;
            t && wx.navigateTo({
                url: "/pages/personal-center/index?uid=" + t
            });
        },
        previewImage: function(e) {
            console.log(e);
            var t = [ e.currentTarget.dataset.url ];
            wx.previewImage({
                urls: t
            });
        }
    }
});