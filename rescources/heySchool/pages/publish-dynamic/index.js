function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../utils/axios.js")), a = e(require("../../utils/util.js")), i = getApp();

new t.default();

Page({
    data: {
        files: [],
        showPreview: !1,
        content: "",
        templateNameList: [ "feed-comment-reply" ],
        templateDetailList: []
    },
    onLoad: function(e) {
        a.default.getTemplateDetailList(this, "templateNameList", "templateDetailList");
    },
    updataFiles: function(e) {
        this.setData({
            files: e.detail
        });
    },
    getShowPreview: function(e) {
        this.setData({
            showPreview: e.detail
        });
    },
    getContent: function(e) {
        this.setData({
            content: e.detail.value
        });
    },
    onShareAppMessage: function() {
        return i.shareAppMessage;
    }
});