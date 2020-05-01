function e(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

var t = getApp(), o = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    formatTime: function(e) {
        var t = e.getFullYear(), n = e.getMonth() + 1, a = e.getDate(), c = e.getHours(), s = e.getMinutes(), i = e.getSeconds();
        return [ t, n, a ].map(o).join("/") + " " + [ c, s, i ].map(o).join(":");
    },
    formatNumber: o,
    trimTime: function(e) {
        return e.length > 16 ? e.substring(5, 16) : e;
    },
    showModal: function(e, t) {
        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "确认";
        wx.showModal({
            title: "提示",
            content: e,
            cancelColor: "#CCCCCC",
            confirmColor: "#FFD034",
            confirmText: o,
            success: function(e) {
                e.confirm && t();
            }
        });
    },
    getTemplateDetailList: function(o, n, a) {
        var c = "?query=" + o.data[n].join(",");
        wx.request({
            url: t.globalData.baseURL + "wxapp_msg/templatemap" + c,
            method: "GET",
            header: {
                "content-type": "application/json",
                Authorization: wx.getStorageSync("token")
            },
            success: function(t) {
                200 === t.statusCode && 0 == t.data.code ? o.setData(e({}, a, t.data.data)) : console.log("获取模板失败");
            },
            fail: function(e) {
                console.log("获取模板失败,连接服务器异常");
            }
        });
    },
    showSubscribeMessage: function(e, o) {
        wx.openBluetoothAdapter ? wx.requestSubscribeMessage({
            tmplIds: e.map(function(e) {
                return e.id;
            }),
            success: function(o) {
                console.log(o);
                for (var n = {}, a = 0; a < e.length; a++) switch (console.log(o[e[a]]), o[e[a].id]) {
                  case "accept":
                    n[e[a].name] = 1;
                    break;

                  case "reject":
                  case "ban":
                    n[e[a].name] = 0;
                }
                console.log(n), wx.request({
                    url: t.globalData.baseURL + "wxapp_msg/subscribe_result",
                    method: "POST",
                    data: {
                        subscribeResult: n
                    },
                    header: {
                        "content-type": "application/json",
                        Authorization: wx.getStorageSync("token")
                    },
                    success: function(e) {
                        200 === e.statusCode && 0 == e.data.code ? console.log("提交模板成功") : console.log("提交模板失败");
                    },
                    fail: function(e) {
                        console.log("提交模板失败,连接服务器异常");
                    }
                });
            },
            complete: function() {
                "function" == typeof o && o();
            }
        }) : (wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使消息提醒功能，请升级到最新微信版本后重试。"
        }), "function" == typeof o && o());
    }
};