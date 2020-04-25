Component({
    properties: {
        maxCount: {
            type: Number,
            value: 1
        }
    },
    observers: {
        currentFiles: function(e) {
            this.triggerEvent("updata", e);
        },
        showPreview: function(e) {
            this.triggerEvent("ispreview", e);
        }
    },
    data: {
        currentFiles: [],
        showPreview: false,
        previewImageUrls: []
    },
    methods: {
      //预览图片：获取当前点击的图片的下标，获取当前所有图片文件、当前文件，预览设置为true
        previewImage: function(e) {
            var t = e.currentTarget.dataset.index;
            this.setData({
                previewImageUrls: this.data.currentFiles,
                previewCurrent: t,
                showPreview: true
            });
        },
        //选择图片：计算还可以上传的图片数，限制用户上传数量，成功之后当前文件里面包含该链接
        chooseImage: function(e) {
            var t = this;
            this.uploading || wx.chooseImage({
                count: this.data.maxCount - this.data.currentFiles.length,
                success: function(e) {
                    var i = t.data.currentFiles.concat(e.tempFilePaths);
                    t.setData({
                        currentFiles: i
                    });
                }
            });
        },
        deletePic: function(e) {
            var t = e.detail.index, i = this.data.currentFiles;
            i.splice(t, 1);
            this.setData({
                currentFiles: i
            });
        },
        hidePreview: function() {
            this.setData({
                showPreview: false
            });
        }
    }
});