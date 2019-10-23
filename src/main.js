//入口文件

import 'babel-polyfill';
import app from "./app.vue";
import Vue from "vue";

import VueRouter from "vue-router"
import routerobj from "./router"
Vue.use(VueRouter);

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css";
import "./lib/mui/css/suoluetu.css"

// import { Header, Swipe, SwipeItem, button, Lazyload } from 'mint-ui';按需导入
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(button.name, button);
// Vue.use(Lazyload);
import 'mint-ui/lib/style.css'
import MintUi from "mint-ui"
Vue.use(MintUi);

import VuePreview from 'vue-preview'
Vue.use(VuePreview)


import storeObj from "./store"




Vue.axios.defaults.baseURL = "http://www.liulongbin.top:3005";

Vue.filter("dateformat", function (orgin) {
    var d = new Date(orgin);
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var dt = d.getDate();
    var h = d.getHours();
    var me = d.getMinutes().toString().padStart(2, "0");
    var s = d.getSeconds().toString().padStart(2, "0");
    return `${y}-${m}-${dt}  ${h}:${me}:${s}`;
})

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router: routerobj,
    store: storeObj
})
