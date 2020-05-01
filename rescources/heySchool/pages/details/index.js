function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../utils/axios.js")), a = e(require("../../utils/util.js")), o = getApp(), n = new t.default();

Page({
    data: {
        btnBottom: "",
        completeLoading: !0,
        haveProgress: !0,
        progressStates: [ "新发布", "被接单", "已完成", "已结算" ],
        progressCurrent: 2,
        progressTipMsg: "",
        progressMsg: "",
        contentID: "",
        contentType: 0,
        commentList: [],
        heartbeatState: 0,
        currentCommentPage: 1,
        isNoMoreComment: !1,
        loadingComment: !1,
        commentfocus: !1,
        showTextarea: !0,
        showWindow: !1,
        commentInput: "",
        commentLoading: !1,
        commentTemplateNameList: [ "feed-comment-reply" ],
        commentTemplateDetailList: [],
        accepteTemplateNameList: [ "task-cancel-by-creator" ],
        accepteTemplateDetailList: [],
        accepterConfirmTemplateNameList: [ "task-confirm-by-creator", "task-settle-success" ],
        accepterConfirmTemplateDetailList: []
    },
    getDetailInfo: function() {
        var e = this;
        return n.GET("feed/" + e.data.contentID).then(function(t) {
            console.log("获取详情", e.data.contentID);
            var o = {
                userId: t.data.userId,
                avatarUrl: t.data.avatarUrl,
                idauth: t.data.idauth,
                nickname: t.data.nickname,
                sex: t.data.sex,
                datetime: a.default.trimTime(t.data.datetime),
                college: t.data.college,
                grade: t.data.grade,
                phonenumber: t.data.task ? t.data.task.phonenumber : "",
                official: t.data.official
            }, n = {
                commentCount: t.data.commentCount,
                likeCount: t.data.likeCount
            };
            if (e.setData({
                publisherInfo: o,
                contentType: t.data.type,
                content: t.data.content,
                images: t.data.images,
                like: t.data.like,
                otherInfo: n,
                heartbeatState: t.data.userLike
            }), 0 == e.data.contentType || 1 == e.data.contentType) {
                if (e.setData({
                    task: t.data.task,
                    userLike: t.data.userLike
                }), e.data.task.acceptor) {
                    var s = e.data.task.acceptor;
                    s.datetime = a.default.trimTime(e.data.task.acceptDatetime), e.setData({
                        acceptorInfo: s
                    });
                }
                var i = 0, r = "", c = !0, d = "";
                switch (e.data.task.status) {
                  case 0:
                    r = "未支付", c = !1;
                    break;

                  case 10:
                    i = 0, c = !0;
                    break;

                  case 20:
                    i = 1, c = !0, e.data.userInfo.userId == o.userId && (d = "您的任务已被接单，请耐心等待");
                    break;

                  case 30:
                    i = 2, c = !0, e.data.userInfo.userId == s.userId && (d = "任务已完成，请等待发单同学确认即可获得赏金。若发单同学24小时内未确认，赏金将自动到账。");
                    break;

                  case 40:
                    i = 3, c = !0;
                    break;

                  case 50:
                    i = 3, c = !0, e.data.userInfo.userId == s.userId && (d = "任务已完成，赏金已到账，可前往个人钱包进行查看。");
                    break;

                  default:
                    r = "已取消", c = !1;
                }
                e.setData({
                    progressCurrent: i,
                    progressMsg: r,
                    haveProgress: c,
                    progressTipMsg: d
                });
            }
        });
    },
    getImpression: function() {
        var e = this, t = this.data.contentID, a = this.data.userInfo.userId == this.data.publisherInfo.userId ? this.data.acceptorInfo.userId : this.data.publisherInfo.userId, o = "impression?feedId=" + t + "&userId=" + a;
        n.GET(o).then(function(t) {
            console.log(t);
            var o = [], n = [], s = !0, i = !1, r = void 0;
            try {
                for (var c, d = t.data[Symbol.iterator](); !(s = (c = d.next()).done); s = !0) {
                    var u = c.value;
                    u.toUserId == a && o.push(u), u.fromUserId == a && n.push(u);
                }
            } catch (e) {
                i = !0, r = e;
            } finally {
                try {
                    !s && d.return && d.return();
                } finally {
                    if (i) throw r;
                }
            }
            e.setData({
                impressionToMe: o,
                impressionToOther: n
            });
        });
    },
    submitAcceptTask: function(e) {
        a.default.showSubscribeMessage(this.data.accepteTemplateDetailList, function() {
            var e = this;
            if (e.data.userInfo.idauth) {
                var t = "接单后若因您主观原因取消订单，则24小时内不得再次接单，若因对方原因则请对方取消订单。此订单完成后，您可赚到抽佣后的" + (.88 * e.data.task.amount).toFixed(2) + "元，是否确定接单？";
                a.default.showModal(t, function() {
                    var t = this;
                    e.setData({
                        loading: !0
                    });
                    var o = "feed/task/" + e.data.contentID + "/acceptor_accept";
                    n.POST(o, {}).then(function(o) {
                        wx.showToast({
                            title: "接单成功",
                            icon: "success",
                            duration: 1e3
                        }), e.setData({
                            loading: !1
                        }), e.getDetailInfo(), console.log("接单成功", o.data), a.default.getTemplateDetailList(t, "accepterConfirmTemplateNameList", "accepterConfirmTemplateDetailList");
                    }).catch(function(t) {
                        e.setData({
                            loading: !1
                        });
                    });
                });
            } else {
                a.default.showModal("为保障同学利益安全，需先完成实名认证才可接单哦", function() {
                    wx.navigateTo({
                        url: "/pages/my-auth/index"
                    });
                }, "去认证");
            }
        }.bind(this));
    },
    submitFinishTask: function(e) {
        a.default.showSubscribeMessage(this.data.accepterConfirmTemplateDetailList, function() {
            var e = this;
            a.default.showModal("请确认已完成任务（快递任务请确保已送到对方手中）", function() {
                e.setData({
                    loading: !0
                });
                var t = "feed/task/" + e.data.contentID + "/acceptor_confirm";
                n.POST(t, {}).then(function(t) {
                    wx.showToast({
                        title: "任务完成",
                        icon: "success",
                        duration: 1e3
                    }), e.setData({
                        loading: !1
                    }), e.getDetailInfo(), console.log("任务完成", t.data);
                }).catch(function(t) {
                    e.setData({
                        loading: !1
                    });
                });
            });
        }.bind(this));
    },
    submitConfirmFinishTask: function(e) {
        var t = this;
        a.default.showModal("确认完成后，赏金将自动转给接单同学，是否确认完成任务？", function() {
            t.setData({
                loading: !0
            });
            var e = "/feed/task/" + t.data.contentID + "/creator_confirm";
            n.POST(e, {}).then(function(e) {
                wx.showToast({
                    title: "任务完成",
                    icon: "success",
                    duration: 1e3
                }), t.setData({
                    loading: !1
                }), t.getDetailInfo(), console.log("任务完成", e.data);
            }).catch(function(e) {
                t.setData({
                    loading: !1
                });
            });
        });
    },
    clickShowActionSheet: function() {
        var e = this, t = [];
        0 == e.data.contentType || 1 == e.data.contentType ? 0 == e.data.progressCurrent ? e.data.userInfo.userId == e.data.publisherInfo.userId && (t = [ "取消订单" ]) : e.data.userInfo.userId == e.data.publisherInfo.userId ? t = [ "取消订单" ] : e.data.userInfo.userId == e.data.acceptorInfo.userId && (t = [ "电话联系", "取消接单" ]) : e.data.userInfo.userId == e.data.publisherInfo.userId && (t = [ "取消发布" ]), 
        wx.showActionSheet({
            itemList: t,
            success: function(o) {
                var s = "feed/task/" + e.data.contentID, i = "";
                switch (t[o.tapIndex]) {
                  case "取消订单":
                    console.log("取消订单"), i = "请确认是否要取消订单?", a.default.showModal(i, function() {
                        n.POST(s + "/creator_cancel").then(function(e) {
                            wx.showToast({
                                title: "操作成功",
                                icon: "success",
                                duration: 1e3
                            });
                            var t = getCurrentPages();
                            console.log(t);
                            var a = t[t.length - 2];
                            "pages/select-school/index" == a.route || "pages/index/index" == a.route ? wx.reLaunch({
                                url: "/pages/index/index"
                            }) : wx.redirectTo({
                                url: "/" + a.route
                            }), console.log("取消订单成功", e.data);
                        }).catch(function(e) {});
                    });
                    break;

                  case "取消接单":
                    console.log("取消接单"), i = "取消任务后，24小时内不可再次接单，确认取消任务吗？", a.default.showModal(i, function() {
                        n.POST(s + "/acceptor_cancel").then(function(t) {
                            wx.showToast({
                                title: "操作成功",
                                icon: "success",
                                duration: 1e3
                            }), e.getDetailInfo(), console.log("取消接单成功", t.data);
                        }).catch(function(e) {});
                    });
                    break;

                  case "取消发布":
                    console.log("取消发布"), i = "请确认是否删除该动态？", a.default.showModal(i, function() {
                        n.DELETE("feed/" + e.data.contentID).then(function(e) {
                            wx.showToast({
                                title: "操作成功",
                                icon: "success",
                                duration: 1e3
                            });
                            var t = getCurrentPages();
                            console.log(t);
                            var a = t[t.length - 2];
                            "pages/index/index" == a.route ? wx.reLaunch({
                                url: "/pages/index/index"
                            }) : wx.redirectTo({
                                url: "/" + a.route
                            }), console.log("取消发布成功", e.data);
                        }).catch(function(e) {});
                    });
                    break;

                  case "电话联系":
                    console.log("电话联系"), wx.makePhoneCall({
                        phoneNumber: e.data.publisherInfo.phonenumber
                    });
                    break;

                  case "联系客服":
                    console.log("联系客服"), e.openModal();
                }
            }
        });
    },
    getComments: function(e) {
        var t = this;
        if (!t.data.isNoMoreComment) return t.setData({
            loadingComment: !0
        }), console.log("获取一级评论: id-", t.data.contentID, "page-", e), n.GET("feed/" + t.data.contentID + "/comments/" + e).then(function(o) {
            o.data.length < 10 && t.setData({
                isNoMoreComment: !0
            });
            var n = o.data.map(function(e) {
                return e.userInfo = {}, e.userInfo.userId = e.userId, e.userInfo.avatarUrl = e.avatarUrl, 
                e.userInfo.idauth = e.idauth, e.userInfo.nickname = e.nickname, e.userInfo.sex = e.sex, 
                e.userInfo.datetime = a.default.trimTime(e.datetime), e.userInfo.college = e.collegeName, 
                e.userInfo.grade = e.enrollYear, e.userInfo.official = e.official, e;
            }), s = [];
            s = 1 == e ? n : t.data.commentList.concat(n), t.setData({
                commentList: s,
                loadingComment: !1
            });
        }).catch(function(e) {
            t.setData({
                loadingComment: !1
            });
        });
    },
    onLoad: function(e) {
        var t = this;
        o.globalData.isIpx && this.setData({
            btnBottom: 68
        }), console.log(e);
        var n = this, s = wx.getStorageSync("userCompleteInfo"), i = void 0;
        i = !!e.comment, n.setData({
            userInfo: s,
            contentID: e.content_id,
            commentfocus: i
        }), Promise.all([ n.getDetailInfo(), n.getComments(n.data.currentCommentPage) ]).then(function(e) {
            if (n.setData({
                completeLoading: !1
            }), a.default.getTemplateDetailList(t, "commentTemplateNameList", "commentTemplateDetailList"), 
            n.data.task) if (n.data.acceptorInfo) {
                var o = n.data.userInfo, s = n.data.publisherInfo, i = n.data.acceptorInfo;
                o.userId != s.userId && o.userId != i.userId || (n.getImpression(), a.default.getTemplateDetailList(t, "accepterConfirmTemplateNameList", "accepterConfirmTemplateDetailList"));
            } else a.default.getTemplateDetailList(t, "accepteTemplateNameList", "accepteTemplateDetailList");
        });
    },
    onPullDownRefresh: function() {
        if (!this.data.loading) {
            var e = this;
            e.setData({
                currentCommentPage: 1,
                isNoMoreComment: !1
            }), Promise.all([ e.getDetailInfo(), e.getComments(e.data.currentCommentPage) ]).then(function(t) {
                if (wx.stopPullDownRefresh(), e.data.task && e.data.acceptorInfo) {
                    var a = e.data.userInfo, o = e.data.publisherInfo, n = e.data.acceptorInfo;
                    a.userId != o.userId && a.userId != n.userId || e.getImpression();
                }
            });
        }
    },
    onReachBottom: function() {
        this.data.loading || this.data.isNoMoreComment || (this.setData({
            currentCommentPage: this.data.currentCommentPage + 1
        }), this.getComments(this.data.currentCommentPage));
    },
    onShareAppMessage: function(e) {
        var t = this, a = t.data.contentID, o = t.data.contentType, n = t.data.task, s = t.data.content, i = "", r = "";
        return i = 0 == o ? "取快递" + n.packageNumber + "件" : s, r = "/pages/details/index?content_id=" + a, 
        console.log("url", r), console.log("title", i), {
            title: i,
            path: r,
            success: function(e) {
                console.log("转发成功"), wx.showToast({
                    title: "转发成功"
                });
            },
            fail: function(e) {
                console.log("转发失败");
            }
        };
    },
    callPhone: function(e) {
        var t = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    copyPhone: function(e) {
        var t = e.currentTarget.dataset.phone;
        wx.setClipboardData({
            data: t,
            success: function(e) {
                wx.getClipboardData({
                    success: function(e) {
                        console.log(e.data);
                    }
                });
            }
        });
    },
    previewImage: function(e) {
        for (var t = e.currentTarget.dataset.imgs, a = e.currentTarget.dataset.uri, o = [], n = 0; n < t.length; n++) {
            var s = t[n];
            o.push(s);
        }
        wx.previewImage({
            current: a,
            urls: o,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    closeModal: function() {
        this.setData({
            customerService: !1
        });
    },
    openModal: function() {
        this.setData({
            customerService: !0
        });
    },
    changeCommentList: function(e) {
        this.setData({
            commentList: e.detail
        });
    },
    changeShowTextarea: function(e) {
        console.log("showTextarea", e.detail), this.setData({
            showTextarea: !e.detail
        });
    },
    changeLike: function(e) {
        var t = e.detail, a = this.data.otherInfo;
        "delete" == t ? a.likeCount = a.likeCount - 1 : "add" == t && (a.likeCount = a.likeCount + 1), 
        this.setData({
            otherInfo: a
        });
    },
    goPersonalCenter: function(e) {
        var t = e.currentTarget.dataset.uid;
        wx.navigateTo({
            url: "/pages/personal-center/index?uid=" + t
        });
    }
});