var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/axios.js")), t = getApp(), s = new e.default();

Page({
    data: {
        toUserInfo: {
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLXys7P2vJhMP8OBK1qNKPyrPnMicx5A5BAbSzEtaothuTaSVAz9KzibaGc0eYurumYqJ74pXR0p9Yg/132",
            college: "福建师范大学",
            collegeId: 1,
            grade: 2016,
            idauth: !0,
            intro: "",
            nickname: "rain",
            phonenumber: "18059070585",
            sex: 1,
            uploadIdauth: !0,
            userId: 14
        },
        selectedImpression: [],
        recommendImpressionList: []
    },
    onClickAddCustom: function(e) {
        this.setData({
            expandAddCustonBtn: !0
        });
    },
    onClickAddCustomSubmit: function(e) {
        var t = this, s = this.data.customTagValue.trim();
        if ("" !== s) if (s.length > 10) wx.showToast({
            title: "字数超出限制",
            icon: "none",
            duration: 1e3
        }); else {
            var n = t.data.selectedImpression, a = this.data.recommendImpressionList, i = {
                content: s,
                cls: "tag-unselected"
            };
            n.length >= 3 || (i.cls = "tag-selected", n.push(s), this.setData({
                selectedImpression: n
            })), a.push(i), this.setData({
                recommendImpressionList: a,
                expandAddCustonBtn: !1
            });
        } else this.setData({
            expandAddCustonBtn: !1
        });
    },
    onClickSubmit: function(e) {
        var t = this, n = t.data.selectedImpression;
        if (0 !== n.length) {
            var a = t.data.type, i = {
                toUserId: t.data.toUserInfo.userId,
                type: a,
                contentList: n
            };
            1 == a && (i.feedId = t.data.feedId), s.POST("impression", i).then(function(e) {
                if (1 == a) {
                    var t = getCurrentPages();
                    t[t.length - 2].getImpression();
                }
                wx.showToast({
                    title: "提交成功",
                    success: function() {
                        wx.navigateBack();
                    }
                });
            });
        }
    },
    onAddCustonTagInput: function(e) {
        this.setData({
            customTagValue: e.detail.value
        });
    },
    onItemClick: function(e) {
        var t = this, s = e.currentTarget.dataset.content, n = e.currentTarget.dataset.index, a = t.data.selectedImpression, i = t.data.recommendImpressionList, o = a.indexOf(s);
        if (-1 === o) {
            if (a.length >= 3) return;
            a.push(s), i[n].cls = "tag-selected";
        } else a.splice(o, 1), i[n].cls = "tag-unselected";
        t.setData({
            selectedImpression: a,
            recommendImpressionList: i
        });
    },
    onLoad: function(e) {
        var t = this;
        e.userinfo && t.setData({
            toUserInfo: JSON.parse(e.userinfo)
        }), e.feedid ? t.setData({
            type: 1,
            feedId: e.feedid
        }) : t.setData({
            type: 2
        }), s.GET("impression/recommend").then(function(e) {
            var s = [];
            e.data.forEach(function(e, t) {
                s.push({
                    content: e,
                    cls: "tag-unselected"
                });
            }), t.setData({
                recommendImpressionList: s
            });
        });
    },
    onShareAppMessage: function() {
        return t.shareAppMessage;
    }
});