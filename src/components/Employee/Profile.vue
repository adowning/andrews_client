<template>
<div class="name-card">
  <v-card :color="color" ref="card" :dark="dark" :img="cardBgImage">
    <v-card-media v-if="showTopNav">
      <v-layout row justify-space-between class="ma-0">
        <v-flex xs2>
          <v-icon color="pink">favorite</v-icon>
        </v-flex>
        <v-flex xs2 class="text-sm-right">
          <v-icon>more_vert</v-icon>
        </v-flex>
      </v-layout>
    </v-card-media>    
    <v-card-text>
      <div class="layout ma-0 align-center" :class="computeCardLayout">
        <v-avatar :size="computeAvatarSize" color="primary">
          <img v-bind:src="employee.attributes.picture._url" v-bind:alt="employee.name" v-if="showAvatar">
          <span v-else class="white--text headline">{{ name.charAt(0) }}</span>
        </v-avatar>
        <div class="flex" :class="computeTextAlgin">
          <div class="heading">{{employee.attributes.name}}</div>
          <span class="caption">{{employee.attributes.title}}</span>
        </div>
      </div>
    </v-card-text>
     <v-list two-line class="pa-0">
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">phone</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{employee.attributes.phone}}</v-list-tile-title>
          <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider inset></v-divider> 
      <v-list-tile href="#">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{employee.attributes.email}}</v-list-tile-title>
          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{employee.attributes.address.street}}</v-list-tile-title>
          <v-list-tile-sub-title> {{employee.attributes.address.city}} {{employee.attributes.address.state}} {{employee.attributes.address.zip}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
  <v-bottom-nav :value="true" :height="64" v-if="showBottomNav">
      <v-btn block color="#41B883" dark>Block Button</v-btn>

  <!-- <v-btn flat color="teal" value="recent">
      <span>Recent</span>
      <v-icon>history</v-icon>
    </v-btn>
    <v-btn flat color="teal" value="favorites">
      <span>Favorites</span>
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn flat color="teal" value="nearby">
      <span>Nearby</span>
      <v-icon>place</v-icon>
    </v-btn>-->
  </v-bottom-nav>   
  <v-btn v-if="employee.clockStatus == 'in'" @click.native="clockOut()" block color="warning" dark>Clock Out</v-btn>
  <v-btn v-if="employee.clockStatus == 'in'" @click.native="setMyDevice()" block color="primary" dark>Make this my Device</v-btn>
  <v-btn v-if="employee.clockStatus == 'out'"  @click.native="clockIn()" block color="success" dark>Clock In</v-btn>
</div>
</template>

<script>
import Parse from "parse"
import { gebHandler } from "vue-geb"

export default {
  props: {
    employee: {
      type: Object
    },
    name: {
      type: String,
      default: "John  Doe"
    },
    // avatar: {
    //   type: Object,
    //   default: null
    // },
    jobTitle: {
      type: String,
      default: "Carpet Technician"
    },
    cardBgImage: {
      type: String
    },
    color: {
      type: String,
      default: ""
    },
    dark: {
      type: Boolean,
      default: false
    },
    bottomNav: {
      type: Boolean,
      default: true
    },
    topNav: {
      type: Boolean,
      default: false
    },
    mini: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    return() {}
  }),
  methods: {
   async updateEmployee(empId, clockedIn) {
     var self = this
      var Employee = Parse.Object.extend("Employee")
      var query = new Parse.Query(Employee)
        query.equalTo("humanityId", empId)
        var object = await query.first()
          if (clockedIn) {
          object.set("clockStatus", "in")
            object.set("currentDevice", self.$deviceInfo.uuid)
          } else {
          object.set("clockStatus", "out")
            object.set("currentDevice", null)
          }
          object.save().then(()=>{
           this.$router.push("/")
          })
    },
    handleResult(result){
      var self = this
      console.log(result)
      if(result.status == 13){
     gebHandler.emit({
        data: {
          color: "red",
          text: "user already signed in"
        },
        type: "alert"
      })
      }
      if (result.status == 1) {
        console.log("employee is checked out")
        self.updateEmployee(self.employee.attributes.humanityId, false)
      }
       if (result.status == 3) {
            gebHandler.emit({
        data: {
          color: "red",
          text: "employee is checked out"
        },
        type: "alert"
      })
      }
      if (result.status == 200 && result.data.status == 1) {
        console.log("employee is checked in")
        self.updateEmployee(self.employee.attributes.humanityId, true)
      }
    },
    async clockOut() {
      var emp = this.employee
      const result = await this.$humanityClockOut(emp.attributes.humanityId)

      this.handleResult(result)
    },
    async clockIn() {
      var emp = this.employee
      const result = await this.$humanityClockIn(emp.attributes.humanityId)
    this.handleResult(result)
    }
  },

  computed: {
    computeCardLayout() {
      return this.mini ? "row" : "column"
    },
    computeTextAlgin() {
      return this.mini ? "text-sm-right" : "text-sm-center"
    },
    computeAvatarSize() {
      return this.mini ? "48" : "96"
    },
    showAvatar() {
      return this.employee.avatar !== null //&& this.employee.avatar.src;
    },

    showBottomNav() {
      // return this.mini === false && this.bottomNav
      return true
    },

    showTopNav() {
      return this.mini === false && this.topNav
    }
  },
  created() {
    console.log('created profile')
    var self = this
      // this.sub = this.$geb.getBus().subscribe(message => {
      // console.log(message)
      // if(message.type == 'deviceInfoSet'){
      // console.log(message)

      //    if(message.deviceInfo.updatedEmployee.id == self.employee.id){
      //   self.employee = message.deviceInfo.updatedEmployee
      // }
      // }
      // })
  }
}
</script>

<style lang="stylus" scoped>
  .caption, .subheading {
    font-weight:200;  
  }
</style>
