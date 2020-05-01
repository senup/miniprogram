function t(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = n, t;
}

var e = getApp();

Page({
    data: {
        content: [ {
            id: "01",
            title: "如何接单？",
            contents: "答: 提交实名认证后，客服将通过您授权的手机号添加您的微信，确认是本人提交后即可通过审核，随时接单，如您的手机号无法搜索到您的微信，请主动联系我们处理。",
            shows: !1
        }, {
            id: "02",
            title: "如何加急实名认证？",
            contents: "答: 提交实名审核后，工作人员会第一时间添加您的微信，如需加急审核，请主动添加客服微信：HeyU_Campus。",
            shows: !1
        }, {
            id: "03",
            title: "如何取消任务？",
            contents: "答: 进入我的发布页面，点击进入对应任务详情页面后，在右上方选择“取消发布”（若订单已被接，取消订单请先与接单者沟通）；如已完成的任务，无法主动取消，请与接单者友好协商，如遇协商过程中意见不一，请主动联系客服处理。",
            shows: !1
        }, {
            id: "04",
            title: "订单退款多久到账？",
            contents: "答: 如您使用微信余额支付，退款申请成功后您支付的金额将立刻返还至您的微信钱包内；如您使用银行卡支付，将根据各银行处理时间不同，24小时之内支付的金额将直接返回您的银行卡账户内。",
            shows: !1
        }, {
            id: "05",
            title: "任务如何结算？",
            contents: "答: 接单者和发单者双方均确认完成后，直接结算；如发单者未确认完成，系统将在接单者点击完成开始的24小时后，自动结算此任务。（金额结算至HeyU钱包）",
            shows: !1
        }, {
            id: "06",
            title: "提现多久到账？",
            contents: "答: 您发起提现申请之后，金额将实时到达您的微信钱包账户。",
            shows: !1
        } ]
    },
    showHide: function(e) {
        var n = this.data.content, s = e.currentTarget.dataset.changeid, o = "content[" + s + "].shows";
        this.setData(t({}, o, !n[s].shows));
    },
    onLoad: function(t) {},
    onShareAppMessage: function() {
        return e.shareAppMessage;
    }
});