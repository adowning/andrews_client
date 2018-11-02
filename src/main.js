import Vue from "vue"
import "./plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import store from "./store"
// import "./plugins/pouchdb"
import ParsePlugin from "./plugins/parse"
// import HumanityPlugin from "./plugins/humanity"
// import devtools from "@vue/devtools";
import geb from "vue-geb"
Vue.config.productionTip = false
// console.log(window.device.uuid)
async function onDeviceReady() {
  // console.log(window.device);

  // const _uuid = await window.localStorage.setItem("uuid", device.uuid)
  // console.log(device.platform)
  var options = {
    // uuid: _uuid
  }
  Vue.use(geb)
  Vue.use(ParsePlugin, options)
  // Vue.use(HumanityPlugin)
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount("#app")
}
document.addEventListener("deviceready", onDeviceReady, false)

// if (process.env.NODE_ENV === "development") {
//   devtools.connect("http://192.168.1.10:8098")
// }
