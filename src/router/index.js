import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("../views/index"),
      meta: {
        title: "游戏大厅",
        titleColor: "#272121", // 标题文字颜色
        titleBgColor: "#FFFFFF", // 标题栏背景色
        arrowColor: "white", // 箭头颜色
        titleModel: "none", // 透明模式 always 一直透明 / auto 滑动自适应 / none 不透明
        borderBottom: "true",
        rightBtn: [
          {
            btnType: "close",
          },
        ],
      },
    },
  ],
});
