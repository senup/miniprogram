var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/axios.js")), t = (getApp(), new e.default());

Page({
    data: {
        typeList: [ {
            id: 0,
            name: "全部"
        }, {
            id: 2,
            name: "动态"
        }, {
            id: 1,
            name: "任务"
        } ],
        typeCurrent: 0,
        dynamicAll: !0,
        college: "全部学校",
        collegeShow: "全部学校",
        collegeId: 0,
        pageCurrent: 1,
        cardList: [],
        isNoMore: !1,
        banners: [],
        defaultBanners: [ {
            imgUrl: "/images/index/banner2.jpg"
        }, {
            imgUrl: "/images/index/banner4.jpg"
        } ],
        swiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 3e3,
            duration: 1e3
        },
        swiperCurrent: 0,
        loading: !1,
        registerShow: !1,
        couponShow: !1,
        tabBarMore: !1,
        floorstatus: !1
    },
    onLoad: function(e) {
        if (this.getCollegeInfo(), this.getBanners(), e.sharecode && (console.log("index have sharecode", e.sharecode), 
        wx.getStorageSync("token") || (console.log("save shareCode", e.sharecode), wx.setStorageSync("shareCode", e.sharecode), 
        this.setData({
            registerShow: !0
        }))), e.scene) {
            var t = decodeURIComponent(e.scene).split("=")[1];
            wx.getStorageSync("token") || (console.log("save shareCode", t), wx.setStorageSync("shareCode", t), 
            this.setData({
                registerShow: !0
            }));
        }
        e.coupon && this.setData({
            couponShow: !0,
            coupon: JSON.parse(e.coupon)
        });
    },
    onReady: function() {
        this.getIndexFeed(!0, this.data.typeCurrent);
    },
    onHide: function() {
        this.setData({
            tabBarMore: !1
        });
    },
    onShow: function() {
        this.getCollegeShow();
    },
    onReachBottom: function() {
        this.data.loading || this.data.isNoMore || this.getIndexFeed(!1, this.data.typeCurrent);
    },
    onPageScroll: function(e) {
        e.scrollTop > 200 ? 0 == this.data.floorstatus && this.setData({
            floorstatus: !0
        }) : 1 == this.data.floorstatus && this.setData({
            floorstatus: !1
        });
    },
    goTop: function() {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    onPullDownRefresh: function() {
        this.data.loading || this.getIndexFeed(!0, this.data.typeCurrent).then(wx.stopPullDownRefresh());
    },
    onShareAppMessage: function(e) {
        var t = this.data.cardList, a = "", o = "";
        if ("menu" == e.from) a = "HeyU校园", o = "/pages/index/index"; else if ("button" == e.from) {
            var n = e.target.dataset.id, s = e.target.dataset.index;
            a = 0 == e.target.dataset.type ? "取快递" + t[s].task.packageNumber + "件" : t[s].content, 
            o = "/pages/details/index?content_id=" + n;
        }
        return console.log("url", o), console.log("title", a), {
            title: a,
            path: o,
            success: function(e) {
                console.log("转发成功"), wx.showToast({
                    title: "转发成功"
                });
            },
            fail: function(e) {
                console.log("转发失败"), wx.showToast({
                    title: "转发失败"
                });
            }
        };
    },
    getCollegeInfo: function() {
        var e = wx.getStorageSync("collegeInfo");
        this.setData({
            college: e.name ? e.name : "全部学校",
            collegeShow: e.name ? e.name.substr(0, 8) : "全部学校",
            collegeId: e.id ? e.id : 0
        });
    },
    getBanners: function() {
        var e = this, a = "banner", o = wx.getStorageSync("userCompleteInfo");
        console.log("userCompleteInfo", o), o && (a = a + "?collegeId=" + o.collegeId), 
        t.GET(a).then(function(t) {
            e.setData({
                banners: t.data
            });
        });
    },
    onClickBanner: function(e) {
        var t = e.currentTarget.dataset.type, a = e.currentTarget.dataset.url;
        if (console.log(a), "4" == t) wx.navigateTo({
            url: a
        }); else {
            if ("3" == t) return;
            a && wx.navigateTo({
                url: "/pages/banner-url/index?url=" + a
            });
        }
    },
    navbarClick: function(e) {
        var t = e.currentTarget.dataset.id;
        t != this.data.typeCurrent && (this.setData({
            typeCurrent: t
        }), this.getIndexFeed(!0, this.data.typeCurrent));
    },
    getIndexFeed: function(e, a) {
        var o = this, n = o.data.collegeId;
        if (1 != this.data.isNoMore || e) {
            e ? o.setData({
                isNoMore: !1,
                pageCurrent: 1
            }) : o.setData({
                pageCurrent: o.data.pageCurrent + 1
            });
            var s = o.data.pageCurrent;
            o.setData({
                loading: !0
            });
            var r = "feed/index/" + s;
            return 2 == a ? (r += "?type=post", this.data.dynamicAll || (r += "&collegeId=" + wx.getStorageSync("userCompleteInfo").collegeId)) : 1 == a && 0 != n ? r += "?type=task&collegeId=" + n : 1 == a && 0 == n ? r += "?type=task" : 0 == a && 0 != n && (r += "?collegeId=" + n), 
            t.GET(r).then(function(t) {
                o.setData({
                    loading: !1
                }), t.data.length < 10 && o.setData({
                    isNoMore: !0
                });
                var a = t.data.map(function(e) {
                    return e.userInfo = {}, e.userInfo.userId = e.userId, e.userInfo.avatarUrl = e.avatarUrl, 
                    e.userInfo.idauth = e.idauth, e.userInfo.nickname = e.nickname, e.userInfo.sex = e.sex, 
                    e.userInfo.datetime = e.datetime, e.userInfo.college = e.college, e.userInfo.grade = e.grade, 
                    e.userInfo.official = e.official, e;
                }), n = void 0;
                n = e ? a : o.data.cardList.concat(a), o.setData({
                    cardList: n
                });
            }).catch(function(e) {
                o.setData({
                    loading: !1
                });
            });
        }
    },
    swiperchange: function(e) {
        this.setData({
            swiperCurrent: e.detail.current
        });
    },
    toSelectSchool: function() {
        2 != this.data.typeCurrent ? wx.navigateTo({
            url: "/pages/select-school/index"
        }) : wx.getStorageSync("userCompleteInfo") ? (this.setData({
            dynamicAll: !this.data.dynamicAll
        }), this.getIndexFeed(!0, this.data.typeCurrent)) : wx.showToast({
            title: "未登录无法切换",
            icon: "none"
        });
    },
    getCollegeShow: function() {
        clearInterval(this.data.time);
        var e = this, t = e.data.college.length;
        if (t > 8) {
            var a = 0;
            this.data.time = setInterval(function() {
                a <= t - 8 ? (e.setData({
                    collegeShow: e.data.college.substr(a, 8)
                }), a++) : (a = 0, e.setData({
                    collegeShow: e.data.college.substr(0, 8)
                }));
            }, 1e3);
        } else clearInterval(this.data.time);
    }
});