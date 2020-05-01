function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
    };
}(), o = getApp(), n = function() {
    function n() {
        e(this, n), this.baseURL = o.globalData.baseURL;
    }
    return t(n, [ {
        key: "GET",
        value: function(e, t) {
            var o = this;
            return new Promise(function(t, n) {
                wx.request({
                    url: o.baseURL + e,
                    method: "GET",
                    header: {
                        "content-type": "application/json",
                        Authorization: wx.getStorageSync("token")
                    },
                    success: function(e) {
                        if (200 === e.statusCode) if (0 == e.data.code) t(e.data); else if (1e3 == e.data.code || 1001 == e.data.code || 1007 == e.data.code || 1010 == e.data.code) {
                            var o = getCurrentPages(), a = o[o.length - 1].route;
                            if ("pages/details/index" == a) a += "?content_id=" + o[o.length - 1].data.contentID; else if ("pages/authorization/index" == a || "pages/login/index" == a) return void n(e);
                            console.log(o[o.length - 1]), wx.setStorageSync("pageUrl", "/" + a), wx.showToast({
                                title: "请重新登陆!",
                                icon: "none",
                                duration: 2e3
                            }), setTimeout(function() {
                                wx.navigateTo({
                                    url: "/pages/authorization/index"
                                });
                            }, 1e3), n(e);
                        } else 1019 == e.data.code ? (wx.showModal({
                            title: "提示",
                            content: "由于您在24小时内因主观原因取消订单，在您取消订单24小时内不得再次接单",
                            showCancel: !1,
                            confirmColor: "#FFD034",
                            confirmText: "确认",
                            success: function(e) {}
                        }), n(e)) : (wx.showToast({
                            title: e.data.errorMsg,
                            icon: "none"
                        }), n(e)); else wx.showToast({
                            title: "请求服务器失败",
                            icon: "none",
                            duration: 2e3
                        }), n(e);
                    },
                    fail: function(e) {
                        n(e);
                    }
                });
            });
        }
    }, {
        key: "POST",
        value: function(e, t) {
            var o = this;
            return new Promise(function(n, a) {
                wx.request({
                    url: o.baseURL + e,
                    method: "POST",
                    data: t || "",
                    header: {
                        "content-type": "application/json",
                        Authorization: wx.getStorageSync("token")
                    },
                    success: function(e) {
                        if (200 === e.statusCode) if (0 == e.data.code) n(e.data); else if (1e3 == e.data.code || 1001 == e.data.code || 1007 == e.data.code || 1010 == e.data.code) {
                            var t = getCurrentPages(), o = t[t.length - 1].route;
                            if ("pages/details/index" == o) o += "?content_id=" + t[t.length - 1].data.contentID; else if ("pages/authorization/index" == o || "pages/login/index" == o) return void a(e);
                            console.log(t[t.length - 1]), wx.setStorageSync("pageUrl", "/" + o), wx.showToast({
                                title: "请重新登陆!",
                                icon: "none",
                                duration: 2e3
                            }), setTimeout(function() {
                                wx.navigateTo({
                                    url: "/pages/authorization/index"
                                });
                            }, 1e3), a(e);
                        } else 1019 == e.data.code ? (wx.showModal({
                            title: "提示",
                            content: "由于您在24小时内因主观原因取消订单，在您取消订单24小时内不得再次接单",
                            showCancel: !1,
                            confirmColor: "#FFD034",
                            confirmText: "确认",
                            success: function(e) {}
                        }), a(e)) : (wx.showToast({
                            title: e.data.errorMsg,
                            icon: "none",
                            duration: 2e3
                        }), a(e)); else wx.showToast({
                            title: "请求服务器失败",
                            icon: "none",
                            duration: 2e3
                        }), a(e);
                    },
                    fail: function(e) {
                        a(e);
                    }
                });
            });
        }
    }, {
        key: "DELETE",
        value: function(e) {
            var t = this;
            return new Promise(function(o, n) {
                wx.request({
                    url: t.baseURL + e,
                    method: "DELETE",
                    header: {
                        "content-type": "application/json",
                        Authorization: wx.getStorageSync("token")
                    },
                    success: function(e) {
                        if (200 === e.statusCode) if (0 == e.data.code) o(e.data); else if (1e3 == e.data.code || 1001 == e.data.code || 1007 == e.data.code || 1010 == e.data.code) {
                            var t = getCurrentPages(), a = t[t.length - 1].route;
                            if ("pages/details/index" == a) a += "?content_id=" + t[t.length - 1].data.contentID; else if ("pages/authorization/index" == a || "pages/login/index" == a) return void n(e);
                            console.log(t[t.length - 1]), wx.setStorageSync("pageUrl", "/" + a), wx.showToast({
                                title: "请重新登陆!",
                                icon: "none",
                                duration: 2e3
                            }), setTimeout(function() {
                                wx.navigateTo({
                                    url: "/pages/authorization/index"
                                });
                            }, 1e3), n(e);
                        } else 1019 == e.data.code ? (wx.showModal({
                            title: "提示",
                            content: "由于您在24小时内因主观原因取消订单，在您取消订单24小时内不得再次接单",
                            showCancel: !1,
                            confirmColor: "#FFD034",
                            confirmText: "确认",
                            success: function(e) {}
                        }), n(e)) : (wx.showToast({
                            title: e.data.errorMsg,
                            icon: "none",
                            duration: 2e3
                        }), n(e)); else wx.showToast({
                            title: "请求服务器失败",
                            icon: "none",
                            duration: 2e3
                        }), n(e);
                    },
                    fail: function(e) {
                        n(e);
                    }
                });
            });
        }
    }, {
        key: "UploadFile",
        value: function(e, t, o) {
            var n = this;
            return new Promise(function(a, i) {
                wx.uploadFile({
                    url: n.baseURL + e,
                    filePath: t,
                    name: o,
                    header: {
                        "Content-Type": "multipart/form-data",
                        Authorization: wx.getStorageSync("token")
                    },
                    success: function(e) {
                        200 === e.statusCode ? a(e.data) : i(e);
                    },
                    fail: function(e) {
                        i(e);
                    }
                });
            });
        }
    }, {
        key: "NoToken",
        value: function(e, t) {
            var o = this;
            return new Promise(function(n, a) {
                wx.request({
                    url: o.baseURL + e,
                    method: "POST",
                    data: t || "",
                    header: {
                        "content-type": "application/json"
                    },
                    success: function(e) {
                        200 === e.statusCode ? 0 == e.data.code ? n(e.data) : (wx.showToast({
                            title: e.data.errorMsg,
                            icon: "none",
                            duration: 2e3
                        }), a(e)) : (wx.showToast({
                            title: "请求服务器失败",
                            icon: "none",
                            duration: 2e3
                        }), a(e));
                    },
                    fail: function(e) {
                        a(e);
                    }
                });
            });
        }
    } ]), n;
}();

exports.default = n;