var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../utils/axios.js")), t = getApp(), o = new e.default();

Page({
    data: {
        schoolList: [],
        searchState: !1,
        provinceList: [],
        type: "province",
        noAll: !1
    },
    getProvince: function() {
        var e = this;
        o.GET("college?type=province").then(function(t) {
            e.setData({
                provinceList: t.data
            });
        });
    },
    onClickProvince: function(e) {
        var t = this, o = e.currentTarget.dataset.value;
        this.getCollege(this.data.type, o).then(function(e) {
            t.setData({
                schoolList: e.data,
                type: "college"
            });
        });
    },
    goback: function() {
        this.setData({
            type: "province"
        });
    },
    search: function(e) {
        var t = this;
        return new Promise(function(o, n) {
            o(t.getCollege("college", e));
        });
    },
    selectResult: function(e) {
        console.log("select result", e.detail.item), this.confirmCollege(e.detail.item);
    },
    getCollege: function(e, t) {
        var n = "";
        if ("province" == e ? n = "?type=college&province=" + t : "college" == e && (n = "?type=college&query=" + t), 
        t) return o.GET("college" + n);
    },
    searchStateChange: function(e) {
        this.setData({
            searchState: e.detail
        });
    },
    selectSchool: function(e) {
        if ("0" == e.currentTarget.dataset.value) o = {
            name: "全部学校",
            province: "全部学校",
            id: 0
        }; else var t = e.target.dataset.index, o = this.data.schoolList[t];
        console.log("select result", o), this.confirmCollege(o);
    },
    onLoad: function(e) {
        e.noAll && "1" == e.noAll && this.setData({
            noAll: !0
        }), this.setData({
            search: this.search.bind(this)
        }), this.getProvince();
    },
    confirmCollege: function(e) {
        var t = getCurrentPages();
        console.log(t);
        var o = t[t.length - 2];
        o.setData({
            collegeId: e.id,
            college: e.name,
            collegeShow: e.name.substr(0, 8)
        }), console.log(o), "pages/index/index" == o.route && (wx.setStorageSync("collegeInfo", e), 
        o.getIndexFeed(!0, o.data.typeCurrent)), wx.navigateBack({
            delta: 1
        });
    },
    onShareAppMessage: function() {
        return t.shareAppMessage;
    }
});