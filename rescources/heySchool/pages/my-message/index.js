var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../utils/axios.js")), a = (getApp(), new t.default());

Page({
    data: {
        loading: !1,
        pageCurrent: 1,
        msgList: [],
        isNoMore: !1
    },
    getMessage: function(t) {
        var e = this;
        e.setData({
            loading: !0
        }), t ? e.setData({
            isNoMore: !1,
            pageCurrent: 1
        }) : e.setData({
            pageCurrent: e.data.pageCurrent + 1
        });
        var n = "notification/list?page=" + e.data.pageCurrent;
        return a.GET(n).then(function(a) {
            e.setData({
                loading: !1
            }), a.data.length < 10 && e.setData({
                isNoMore: !0
            });
            var n = void 0;
            n = t ? a.data : e.data.msgList.concat(a.data), e.setData({
                msgList: n
            }), console.log(e.data.msgList);
        }).catch(function(t) {
            e.setData({
                loading: !1
            });
        });
    },
    goDetial: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/details/index?content_id=" + a
        });
    },
    onLoad: function(t) {
        this.getMessage(!0);
    },
    onReady: function() {},
    onShow: function() {},
    onPullDownRefresh: function() {
        this.data.loading || this.getMessage(!0).then(wx.stopPullDownRefresh());
    },
    onReachBottom: function() {
        this.data.loading || this.data.isNoMore || this.getMessage(!1);
    },
    onShareAppMessage: function() {}
});