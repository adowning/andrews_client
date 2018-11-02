<template>
  <v-app>
    <v-content>
      <!-- <Employee v-if="employeeList.length > 0"/> -->
      <Location/>
      <router-view></router-view>
      <snackbar></snackbar>
    </v-content>
     <v-btn
          id="fab"
          color="primary"
          dark
          fab
          fixed
          bottom
          right
        >
          <v-icon>star</v-icon>
        </v-btn>
      <Footer></Footer>
  </v-app>
</template>

<script>
import Location from "./components/Location"
import Employee from "./views/Employee"
import Snackbar from "./components/Snackbar"
import Footer from "./components/Footer"
import Parse from "parse"
// import { sync } from "vuex-pathify"
import { gebHandler } from "vue-geb"

export default {
  name: "App",
  components: {
    Location,
    Employee,
    Snackbar,
    Footer
  },
  data() {
    return {
      employeeList: [],
    
    }
  },
  computed: {
    // sync helper, uses wildcard to sync ALL state + getters on root
    // ...sync('*')
  },
  created() {
    if (this.$deviceInfo) {
        console.log('1')
    if (this.$deviceInfo.employeeList.length < 1) {
        console.log("pushirng to employee")
      this.$router.push("employee")
    }
    }
    // if (this.deviceInfo.employeeList.length < 1) {
    //   this.$router.push("employee")
    // }
    // var currentOwner = Parse.User.current()
    // if (!currentOwner) {
    //   this.$router.push("employee")
    // }
    this.sub = this.$geb.getBus().subscribe(message => {
      if (message.type == "deviceInfoSet") {
        if (!message.deviceInfo.currentOwner) {
        console.log("pushirng to employee")
          this.$router.push("employee")
        }
      }
   
    })
    
   
  }
}
</script>
