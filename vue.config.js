module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "./dist",
  assetsDir: "",
  filenameHashing: true,
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    // openPage: `${proNewName || "lucky"}.html`,
    open: true, // 项目构建成功之后，自动弹出页面
    host: "0.0.0.0", // 主机名，也可以127.0.0.0 || 做真机测试时候0.0.0.0
    port: 9096, // 端口号，默认8080
    https: false, // 协议
    hotOnly: false, // 没啥效果，热模块，webpack已经做好了
    proxy: {
      "/api": {
        target: "https://dev-gameplatform-zuul.peogoo.com",
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  
  chainWebpack: (config) => {
    // 为了补删除换行而加的配置
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      });
  },
};
