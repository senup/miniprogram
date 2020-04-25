const app=getApp();
Page({
	data: {
	    agree: !0,
	    loading: !1
	},
	/**
	 * 勾选框状态改变
	 */
	checkboxChange: function(e) {
	    this.setData({
	        agree: !this.data.agree
	    });
	},
	/**
	 * 用户协议
	 */
	toAgreement: function() {
	    wx.navigateTo({
	        url: "/pages/agreement/index"
	    });
	},
	/**
	 * 登陆注册
	 */
	doLogin:function(e){
		var userInfo=e.detail.userInfo;
			wx.login({
				success:function(res){
					console.log(res)
					var code = res.code;
					var serverUrl=app.serverUrl;
					wx.request({
						url: serverUrl+"/wxLogin",
            method:"POST",
						data:{
							code:code,
              nickName:userInfo.nickName,
              avatarUrl:userInfo.avatarUrl,
              gender:userInfo.gender
						},
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8' // 默认值
            },
						success: function(result){
							console.log(result);
              // debugger;
							//保存用户信息到本地缓存
							app.setGlobalUserInfo(result.data.data);
							wx.redirectTo({
								url:"/pages/my/index"
							})
						}
					})
				}
			})
	},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
        return app.shareAppMessage;
  }
})