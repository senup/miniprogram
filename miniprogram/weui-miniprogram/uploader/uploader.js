var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

module.exports = function(t) {
    function r(e) {
        if (a[e]) return a[e].exports;
        var n = a[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
    }
    var a = {};
    return r.m = t, r.c = a, r.d = function(e, t, a) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: a
        });
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, r.t = function(t, a) {
        if (1 & a && (t = r(t)), 8 & a) return t;
        if (4 & a && "object" === (void 0 === t ? "undefined" : e(t)) && t && t.__esModule) return t;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: t
        }), 2 & a && "string" != typeof t) for (var i in t) r.d(n, i, function(e) {
            return t[e];
        }.bind(null, i));
        return n;
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return r.d(t, "a", t), t;
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 22);
}({
    22: function(e, t, r) {
        Component({
            options: {
                addGlobalClass: !0
            },
            properties: {
                title: {
                    type: String,
                    value: "图片上传"
                },
                sizeType: {
                    type: Array,
                    value: [ "original", "compressed" ]
                },
                sourceType: {
                    type: Array,
                    value: [ "album", "camera" ]
                },
                maxSize: {
                    type: Number,
                    value: 5242880
                },
                maxCount: {
                    type: Number,
                    value: 1
                },
                files: {
                    type: Array,
                    value: [],
                    observer: function(e, t, r) {
                        this.setData({
                            currentFiles: e
                        });
                    }
                },
                select: {
                    type: Function,
                    value: function() {}
                },
                upload: {
                    type: Function,
                    value: null
                },
                tips: {
                    type: String,
                    value: ""
                },
                extClass: {
                    type: String,
                    value: ""
                },
                showDelete: {
                    type: Boolean,
                    value: !0
                }
            },
            data: {
                currentFiles: [],
                showPreview: !1,
                previewImageUrls: []
            },
            ready: function() {},
            methods: {
                previewImage: function(e) {
                    var t = e.currentTarget.dataset.index, r = [];
                    this.data.files.map(function(e) {
                        r.push(e.url);
                    }), this.setData({
                        previewImageUrls: r,
                        previewCurrent: t,
                        showPreview: !0
                    });
                },
                chooseImage: function(e) {
                    var t = this;
                    this.uploading || wx.chooseImage({
                        count: this.data.maxCount - this.data.files.length,
                        success: function(e) {
                            var r = -1;
                            if (e.tempFiles.forEach(function(e, a) {
                                e.size > t.data.maxSize && (r = a);
                            }), "function" != typeof t.data.select || !1 !== t.data.select(e)) if (r >= 0) t.triggerEvent("fail", {
                                type: 1,
                                errMsg: "chooseImage:fail size exceed " + t.data.maxSize,
                                total: e.tempFilePaths.length,
                                index: r
                            }, {}); else {
                                var a = wx.getFileSystemManager(), n = e.tempFilePaths.map(function(e) {
                                    return a.readFileSync(e);
                                }), i = {
                                    tempFilePaths: e.tempFilePaths,
                                    tempFiles: e.tempFiles,
                                    contents: n
                                };
                                t.triggerEvent("select", i, {});
                                var o = e.tempFilePaths.map(function(e, t) {
                                    return {
                                        loading: !0,
                                        url: "data:image/jpg;base64," + wx.arrayBufferToBase64(n[t])
                                    };
                                });
                                if (o && o.length && "function" == typeof t.data.upload) {
                                    var l = t.data.files.length, u = t.data.files.concat(o);
                                    t.setData({
                                        files: u,
                                        currentFiles: u
                                    }), t.loading = !0, t.data.upload(i).then(function(e) {
                                        if (t.loading = !1, e.urls) {
                                            var r = t.data.files;
                                            e.urls.forEach(function(e, t) {
                                                r[l + t].url = e, r[l + t].loading = !1;
                                            }), t.setData({
                                                files: r,
                                                currentFiles: u
                                            }), t.triggerEvent("success", e, {});
                                        } else t.triggerEvent("fail", {
                                            type: 3,
                                            errMsg: "upload file fail, urls not found"
                                        }, {});
                                    }).catch(function(r) {
                                        t.loading = !1;
                                        var a = t.data.files;
                                        e.tempFilePaths.map(function(e, t) {
                                            a[l + t].error = !0, a[l + t].loading = !1;
                                        }), t.setData({
                                            files: a,
                                            currentFiles: u
                                        }), t.triggerEvent("fail", {
                                            type: 3,
                                            errMsg: "upload file fail",
                                            error: r
                                        }, {});
                                    });
                                }
                            }
                        },
                        fail: function(e) {
                            e.errMsg.indexOf("chooseImage:fail cancel") >= 0 ? t.triggerEvent("cancel", {}, {}) : (e.type = 2, 
                            t.triggerEvent("fail", e, {}));
                        }
                    });
                },
                deletePic: function(e) {
                    var t = e.detail.index, r = this.data.files, a = r.splice(t, 1);
                    this.setData({
                        files: r,
                        currentFiles: r
                    }), this.triggerEvent("delete", {
                        index: t,
                        item: a[0]
                    });
                }
            }
        });
    }
});