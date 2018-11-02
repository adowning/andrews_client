import Vue from "vue"
import Vuetify from "vuetify/lib"
// import 'vuetify/src/stylus/app.styl'
// import "font-awesome/css/font-awesome.css"
import "../theme/default.styl"
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
  iconfont: 'mdi',

  theme: {
    // primary: "#41B883", // #E53935
    // secondary: "#34495E", // #FFCDD2
    // accent: "#3F51B5" // #3F51B5
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  options: {
    themeVariations: ["primary", "secondary", "accent"],
    extra: {
      mainToolbar: {
        color: "primary"
      },
      sideToolbar: {},
      sideNav: "primary",
      mainNav: "primary lighten-1",
      bodyBg: ""
    }
  }
})
