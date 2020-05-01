var e = new (function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/axios.js")).default)();

Component({
    properties: {
        arrow: Array,
        isLoading: Boolean,
        isNoMore: Boolean
    },
    data: {},
    options: {
        addGlobalClass: !0
    },
    methods: {
        onClickGood: function(t) {
            var a = this;
            console.log("onClickGood", t);
            var o = t.target.dataset.like, n = t.target.dataset.id, r = t.target.dataset.index;
            if (o) {
                var i = "?id=" + n + "&type=feed";
                e.DELETE("feed/like" + i).then(function(e) {
                    var t = a.data.arrow;
                    t[r].like = !1, t[r].likeCount = t[r].likeCount - 1, a.setData({
                        arrow: t
                    });
                });
            } else {
                var d = {
                    type: "feed",
                    contentId: n
                };
                e.POST("feed/like", d).then(function(e) {
                    var t = a.data.arrow;
                    t[r].like = e.data.like, t[r].likeCount = e.data.likeCount, a.setData({
                        arrow: t
                    });
                });
            }
        },
        goDetail: function(e) {
            var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.comment;
            console.log(t, a), a ? wx.navigateTo({
                url: "/pages/details/index?content_id=" + t + "&comment=1"
            }) : wx.navigateTo({
                url: "/pages/details/index?content_id=" + t
            });
        },
        goPersonalCenter: function(e) {
            var t = e.currentTarget.dataset.uid;
            t && wx.navigateTo({
                url: "/pages/personal-center/index?uid=" + t
            });
        }
    }
});