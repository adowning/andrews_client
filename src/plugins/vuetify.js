import Vue from "vue";
import Vuetify from "vuetify/lib";
// import 'vuetify/src/stylus/app.styl'
import "font-awesome/css/font-awesome.css";
import "../theme/default.styl";

Vue.use(Vuetify, {
  theme: {
    primary: "#41B883", // #E53935
    secondary: "#34495E", // #FFCDD2
    accent: "#3F51B5" // #3F51B5
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
});
