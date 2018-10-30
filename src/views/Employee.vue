
<template>
 <v-container>
    <scan-badge v-if="!employee" @set-employee="setEmployee" />
     <Profile v-if="employee" :employee="employee"/>
 </v-container>
   
</template>
<script>
import ScanBadge from "../components/Employee/ScanBadge"
import Profile from "../components/Employee/Profile"

// var Parse = require("parse");

export default {
  page: {
    title: "Log in"
  },
  components: { ScanBadge, Profile },
  data() {
    return {
      employee: null
    }
  },
  mounted() {
    var self = this
    this.sub = this.$geb.getBus().subscribe(message => {
      if (message.type == "employeeScanSuccess") {
        console.log("setting emp")
        console.log(message.data) // this.$router.push("employee/profile")
        self.employee = message.data
        self.employee.clockStatus = message.clockStatus
      }
    })
  },
  methods: {
    setEmployee(_employee) {
      this.employee = _employee
    }
  }
}
</script>
