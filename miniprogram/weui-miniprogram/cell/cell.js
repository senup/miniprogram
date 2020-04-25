var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

module.exports = function(t) {
    function o(e) {
        if (n[e]) return n[e].exports;
        var r = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(r.exports, r, r.exports, o), r.l = !0, r.exports;
    }
    var n = {};
    return o.m = t, o.c = n, o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        });
    }, o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, o.t = function(t, n) {
        if (1 & n && (t = o(t)), 8 & n) return t;
        if (4 & n && "object" === (void 0 === t ? "undefined" : e(t)) && t && t.__esModule) return t;
        var r = Object.create(null);
        if (o.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t
        }), 2 & n && "string" != typeof t) for (var l in t) o.d(r, l, function(e) {
            return t[e];
        }.bind(null, l));
        return r;
    }, o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return o.d(t, "a", t), t;
    }, o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, o.p = "", o(o.s = 9);
}({
    9: function(e, t, o) {
        Component({
            options: {
                addGlobalClass: !0,
                multipleSlots: !0
            },
            properties: {
                hover: {
                    type: Boolean,
                    value: !1
                },
                link: {
                    type: Boolean,
                    value: !1
                },
                extClass: {
                    type: String,
                    value: ""
                },
                iconClass: {
                    type: String,
                    value: ""
                },
                bodyClass: {
                    type: String,
                    value: ""
                },
                icon: {
                    type: String,
                    value: ""
                },
                title: {
                    type: String,
                    value: ""
                },
                value: {
                    type: String,
                    value: ""
                },
                showError: {
                    type: Boolean,
                    value: !1
                },
                prop: {
                    type: String,
                    value: ""
                },
                url: {
                    type: String,
                    value: ""
                },
                footerClass: {
                    type: String,
                    value: ""
                },
                footer: {
                    type: String,
                    value: ""
                },
                inline: {
                    type: Boolean,
                    value: !0
                },
                hasHeader: {
                    type: Boolean,
                    value: !0
                },
                hasFooter: {
                    type: Boolean,
                    value: !0
                },
                hasBody: {
                    type: Boolean,
                    value: !0
                }
            },
            relations: {
                "../form/form": {
                    type: "ancestor"
                },
                "../cells/cells": {
                    type: "ancestor"
                }
            },
            data: {
                inForm: !1
            },
            methods: {
                setError: function(e) {
                    this.setData({
                        error: e || !1
                    });
                },
                setInForm: function() {
                    this.setData({
                        inForm: !0
                    });
                },
                setOuterClass: function(e) {
                    this.setData({
                        outerClass: e
                    });
                },
                navigateTo: function() {
                    var e = this, t = this.data;
                    t.url && t.link && wx.navigateTo({
                        url: t.url,
                        success: function(t) {
                            e.triggerEvent("navigatesuccess", t, {});
                        },
                        fail: function(t) {
                            e.triggerEvent("navigateerror", t, {});
                        }
                    });
                }
            }
        });
    }
});