var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/axios.js")), s = getApp();

new e.default();

Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        toUserInfo: Object,
        feedId: Number,
        impressionToMe: Array,
        impressionToOther: Array
    },
    data: {
        baseImageUrl: s.globalData.baseImageURL
    },
    methods: {
        goAddImpression: function() {
            wx.navigateTo({
                url: "/pages/impression-add/index?feedid=" + this.data.feedId + "&userinfo=" + JSON.stringify(this.data.toUserInfo)
            });
        },
        goPersonalCenter: function() {
            wx.navigateTo({
                url: "/pages/personal-center/index?uid=" + this.data.toUserInfo.userId
            });
        }
    }
});