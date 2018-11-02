
<template>
 <v-container>

   <v-spacer></v-spacer>
   

   <!-- <div v-if="employee"> {{employee.attributes.address}}</div> -->
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
      // console.log(message)
      //  if(message.type == 'deviceInfoSet'){
      // console.log(message.deviceInfo)

      //    if(message.deviceInfo.updatedEmployee.id == self.employee.id){
      //   self.employee = message.deviceInfo.updatedEmployee
      // }
      // }
           if (message.type == "profileUpdated") {
        console.log(message.data) // this.$router.push("employee/profile")
        // var HumanityToken = Parse.Object.extend("HumanityToken");
        // var hut = new HumanityToken();
        // hut.get("N8ZYFRyVlq").then(
        //   hut => {
        //     hut.save().then(hut => {
        //       done();
        //     });
        //   },
        //   error => {
        //     done(new Error(error.status));
        //   }
        // );
        self.employee = message.data
      }
      if (message.type == "employeeScanSuccess") {
        console.log(message.data) // this.$router.push("employee/profile")
        // $("profileImg")[0].src = profilePhoto.url()
        self.employee = message.data
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
