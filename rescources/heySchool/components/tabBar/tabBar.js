var e = getApp();

Component({
    properties: {
        selected: Number,
        isMore: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        baseURL: e.globalData.baseURL,
        color: "#999999",
        selectedColor: "#333333",
        list: [ {
            pagePath: "/pages/index/index",
            iconPath: "/images/tabBar/tab_home.png",
            selectedIconPath: "/images/tabBar/tab_home2.png",
            text: "首页"
        }, {
            pagePath: "/pages/my/index",
            iconPath: "/images/tabBar/tab_mine.png",
            selectedIconPath: "/images/tabBar/tab_mine2.png",
            text: "我的"
        } ],
        listMore: [ {
            pagePath: "/pages/publish-dynamic/index",
            iconPath: "/images/tabBar/icon_dt.png",
            text: "动态"
        }, {
            pagePath: "/pages/publish-task/index",
            iconPath: "/images/tabBar/icon_rw.png",
            text: "任务"
        } ]
    },
    methods: {
        openMore: function() {
            wx.getStorageSync("token") ? this.setData({
                isMore: !0
            }) : wx.showToast({
                title: "要注册/登陆后，才能发送动态和任务哦！",
                icon: "none"
            });
        },
        closeMore: function() {
            this.setData({
                isMore: !1
            });
        },
        switchTab: function(e) {
            var t = e.currentTarget.dataset.path;
            wx.redirectTo({
                url: t
            });
        },
        switchMore: function(e) {
            var t = e.currentTarget.dataset.path;
            wx.navigateTo({
                url: t
            });
        }
    }
});