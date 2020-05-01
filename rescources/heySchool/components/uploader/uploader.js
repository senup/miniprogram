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
        showPreview: !1,
        previewImageUrls: []
    },
    methods: {
        previewImage: function(e) {
            var t = e.currentTarget.dataset.index;
            this.setData({
                previewImageUrls: this.data.currentFiles,
                previewCurrent: t,
                showPreview: !0
            });
        },
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
                showPreview: !1
            });
        }
    }
});