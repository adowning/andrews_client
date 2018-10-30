module.exports = {
  baseUrl: "",
  pluginOptions: {
    cordovaPath: "src-cordova"
  },
  devServer: {
    proxy: {
      "/api/v2": {
        target: "https://www.humanity.com/"
        //https://www.humanity.com/api/v2/employees?access_token=xxxxxxx
      }
    }
  }
};
