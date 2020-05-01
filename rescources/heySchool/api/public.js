var e = new (function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../utils/axios.js")).default)();

module.exports = {
    getUserCompleteInfo: function() {
        var t = e.GET("user/info");
        return t.then(function(e) {
            wx.setStorageSync("userCompleteInfo", e.data), wx.setStorageSync("userCompleteInfoTimeOut", Date.now() + 216e5), 
            wx.setStorageSync("userPhoneNumber", e.data.phonenumber);
        }), console.log("userCompleteInfo", wx.getStorageSync("userCompleteInfo")), t;
    }
};