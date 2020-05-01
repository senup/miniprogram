var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/axios.js")), a = getApp(), e = new t.default();

Page({
    data: {
        statusList: [ {
            value: "accepted",
            name: "已接单"
        }, {
            value: "waiting_settle",
            name: "待结算"
        }, {
            value: "settled",
            name: "已结算"
        }, {
            value: "canceled",
            name: "已取消"
        } ],
        pageCurrent: 1,
        statusCurrent: "accepted",
        cardList: [],
        loading: !1,
        isNoMore: !1,
        floorstatus: !1
    },
    navbarClick: function(t) {
        var a = t.currentTarget.dataset.value;
        this.data.statusCurrent != a && (this.setData({
            statusCurrent: a
        }), this.getMyTasks(!0));
    },
    getMyTasks: function(t) {
        var a = this;
        if (1 != this.data.isNoMore || t) {
            t && a.setData({
                isNoMore: !1,
                pageCurrent: 1
            }), a.setData({
                loading: !0
            });
            var s = "user/task?page=" + this.data.pageCurrent + "&status=" + this.data.statusCurrent;
            return e.GET(s).then(function(e) {
                a.setData({
                    loading: !1
                }), e.data.length < 10 && a.setData({
                    isNoMore: !0
                });
                var s = e.data.map(function(t) {
                    return t.userInfo = {}, t.userInfo.avatarUrl = t.avatarUrl, t.userInfo.idauth = t.idauth, 
                    t.userInfo.nickname = t.nickname, t.userInfo.sex = t.sex, t.userInfo.datetime = t.datetime, 
                    t.userInfo.college = t.college, t.userInfo.grade = t.grade, t.userInfo.official = t.official, 
                    t;
                }), n = void 0;
                n = t ? s : a.data.cardList.concat(s), a.setData({
                    cardList: n
                });
            }).catch(function(t) {
                a.setData({
                    loading: !1
                });
            });
        }
    },
    onLoad: function(t) {
        console.log(t.status), t.status && this.setData({
            statusCurrent: t.status
        });
    },
    onShow: function() {
        this.getMyTasks(!0);
    },
    onPageScroll: function(t) {
        t.scrollTop > 200 ? this.setData({
            floorstatus: !0
        }) : this.setData({
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
    onPullDownRefresh: function() {
        this.getMyTasks(!0).then(wx.stopPullDownRefresh());
    },
    onReachBottom: function() {
        this.setData({
            pageCurrent: this.data.pageCurrent + 1
        }), this.getMyTasks(!1);
    },
    onShareAppMessage: function() {
        return a.shareAppMessage;
    }
});