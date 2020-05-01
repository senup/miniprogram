Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        show: Boolean
    },
    data: {},
    methods: {
        goAuthorization: function() {
            wx.navigateTo({
                url: "/pages/authorization/index"
            });
        },
        closeModal: function() {
            this.setData({
                show: !1
            });
        }
    }
});