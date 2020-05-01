Component({
    options: {
        addGlobalClass: !0
    },
    properties: {
        show: Boolean,
        coupon: Object
    },
    data: {},
    methods: {
        goCouponList: function() {
            wx.navigateTo({
                url: "/pages/my-wallet/index"
            });
        },
        closeModal: function() {
            this.setData({
                show: !1
            });
        }
    }
});