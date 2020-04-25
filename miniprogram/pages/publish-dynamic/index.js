const app = getApp();

Page({
    data: {
        count:9,
        files: [],
        showPreview: false,
        content: "",
        // templateNameList: [ "feed-comment-reply" ],
        // templateDetailList: [],
        loading: false,
        allCount: 0
    },
    onLoad: function(e) {
        // a.default.getTemplateDetailList(this, "templateNameList", "templateDetailList");
    },
    updataFiles: function(e) {
      console.log(e.detail)
        this.setData({
            files: e.detail
        });
    },
    getShowPreview: function(e) {
        this.setData({
            showPreview: e.detail
        });
    },
    getContent: function(e) {
      // console.log(e.detail.value)
        this.setData({
            content: e.detail.value
        });
    },
    onShareAppMessage: function() {
        return app.shareAppMessage;
    },


    //上传帖子
  onPublish: function () {
    var me = this;
    var serverUrl = app.serverUrl;
    var user = app.getGlobalUserInfo();
    console.log(user);

    console.log(me.data.files);
    console.log(me.data.content);
    wx.request({
      url: serverUrl+'/post/doPost',
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' ,
        'userId': user.id,
        'userToken': user.userToken
      },
      data:{
        userId:user.id,
        content: me.data.content,
      },
      
      success: function(res){
        if(res.data.status==200){
          // 上传多张（遍历数组，一次传一张）
          for (var index in me.data.files) {
            me.upload_file(serverUrl + '/img/uploadPic', me.data.files[index],res.data.data)
          }
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }else if(res.data.status==502){
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          });
        }
      },
      fail:function(res){
        console.log("-----------fail-------------------------------")
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        });
      }
    })
  },

  upload_file: function (url, filePath,post_id){
    console.log("url:"+url+" filePath:"+filePath+" post_id:"+post_id)
    var me = this;
    var user = app.getGlobalUserInfo();
    wx.uploadFile({
      url: url,
      formData: {
        userId: user.id,
        postId:post_id  
      },
      filePath: filePath,
      name: 'file',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8' ,
        'userId': user.id,
        'userToken': user.userToken
      },
      success: function (res) {
        if (res.data.status == 200) {
          console.log(res.data)

        } 


      }
    })
}



});