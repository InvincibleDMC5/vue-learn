
import VueRouter from "vue-router";
import home from "./components/tabbar/home.vue";
import member from "./components/tabbar/member.vue";
import shopcar from "./components/tabbar/shopcar.vue";
import search from "./components/tabbar/search.vue";
import newlist from "./components/news/newlist.vue";
import newsinfo from "./components/news/newsinfo.vue";
import photolist from "./components/photos/photolist.vue";
import photoinfo from "./components/photos/photoinfo.vue";
import goodslist from "./components/goods/goodslist.vue";
import goodsinfo from "./components/goods/goodsinfo.vue";
import gooddesc from "./components/goods/gooddesc.vue";
import goodcomment from "./components/goods/goodcomment.vue";
import login from "./components/subcomponent/login.vue";


var outerObj = new VueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: home },
    { path: "/member", component: member },
    { path: "/shopcar", component: shopcar },
    { path: "/search", component: search },
    { path: "/home/newlist", component: newlist },
    { path: "/home/newsinfo/:id", component: newsinfo },
    { path: "/home/photolist", component: photolist },
    { path: "/home/photoinfo/:id", component: photoinfo },
    { path: "/home/goodlist", component: goodslist },
    { path: "/home/goodsinfo/:id", component: goodsinfo },
    { path: "/home/gooddesc/:id", component: gooddesc, name: "gooddesc" },
    { path: "/home/goodcomment/:id", component: goodcomment, name: "goodcomment" },
    {path:"/home/login",component:login}
  ],
  linkActiveClass: "mui-active",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

outerObj.beforeEach((to,from,next) => {
  console.log(`你从${from.path}来到${to.path}`);
  next();
})

export default outerObj