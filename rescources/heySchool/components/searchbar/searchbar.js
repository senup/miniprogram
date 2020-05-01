Component({
    properties: {
        type: {
            type: String,
            value: null
        },
        search: {
            type: Function,
            value: null
        }
    },
    data: {
        result: [],
        searchState: !1
    },
    observers: {
        searchState: function(t) {
            this.triggerEvent("searchstatechange", t);
        }
    },
    methods: {
        bindinput: function(t) {
            var e = this;
            this.setData({
                value: t.detail.value
            });
            var a = e.data.timer;
            clearTimeout(a), a = setTimeout(function() {
                e.data.search(t.detail.value).then(function(t) {
                    0 == t.data.length ? e.setData({
                        result: [],
                        noList: !0
                    }) : e.setData({
                        result: t.data,
                        noList: !1
                    });
                }).catch(function(t) {
                    console.log("search error", t);
                });
            }, 500), e.setData({
                timer: a
            });
        },
        showInput: function() {
            this.setData({
                focus: !0,
                searchState: !0
            });
        },
        hideInput: function() {
            this.setData({
                searchState: !1
            });
        },
        selectResult: function(t) {
            var e = t.currentTarget.dataset.index, a = this.data.result[e];
            this.triggerEvent("selectresult", {
                index: e,
                item: a
            });
        },
        clearInput: function() {
            this.setData({
                value: "",
                result: []
            });
        }
    }
});