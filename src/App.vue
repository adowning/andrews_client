<template>
  <v-app>
    <v-content>
      <!-- <Employee v-if="employeeList.length > 0"/> -->
      <Location/>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Location from "./components/Location"
import Employee from "./views/Employee"
// import { sync } from "vuex-pathify"

export default {
  name: "App",
  components: {
    Location,
    Employee
  },
  data() {
    return {
      employeeList: []
    }
  },
  computed: {
    // sync helper, uses wildcard to sync ALL state + getters on root
    // ...sync('*')
  },
  created() {
    if (this.employeeList.length < 1) {
      this.$router.push("employee")
    }
    this.sub = this.$geb.getBus().subscribe(message => {
      if (message.type == "employeeListUpdated") {
        // console.log("sending to employee ....");
        if (message.needsOwner) {
          this.$router.push("employee")
        }
      }
    })
  }
}
</script>
