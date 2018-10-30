import Vue from "vue"
import "./plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ParsePlugin from "./plugins/parse"
import HumanityPlugin from "./plugins/humanity"
import devtools from "@vue/devtools"
import geb from "vue-geb"
Vue.config.productionTip = false

if (process.env.NODE_ENV === "development") {
  devtools.connect("http://192.168.1.10:8098")
}

Vue.use(geb)
Vue.use(ParsePlugin)
Vue.use(HumanityPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
