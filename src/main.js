import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import "./index.css";
import Uploadimage from "./components/Uploadimage.vue";
import SendName from "./components/SendName.vue";
import Home from "./components/Home.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/uploadimage",
      component: Uploadimage,
    },
    {
      path: "/sendname",
      component: SendName,
    },
  ],
});

export default {
  components: {},
};

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
