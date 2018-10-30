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
          <img v-bind:src="employee.avatar.src" v-bind:alt="employee.name" v-if="showAvatar">
          <span v-else class="white--text headline">{{ name.charAt(0) }}</span>
        </v-avatar>
        <div class="flex" :class="computeTextAlgin">
          <div class="subheading">{{employee.name}}</div>
          <span class="caption">{{employee.title}}</span>
        </div>
      </div>
    </v-card-text>
     <v-list two-line class="pa-0">
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">phone</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{employee.phone}}</v-list-tile-title>
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
          <v-list-tile-title>{{employee.email}}</v-list-tile-title>
          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{employee.address.street}}</v-list-tile-title>
          <v-list-tile-sub-title> {{employee.address.city}} {{employee.address.state}} {{employee.address.zip}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
  <v-bottom-nav :value="true" :height="64" v-if="showBottomNav">
      <v-btn block color="primary" dark>Block Button</v-btn>

  <!--  <v-btn flat color="teal" value="recent">
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
  <v-btn v-if="employee.clockStatus == 'in'" @click.native="clockOut()" block color="secondary" dark>Clock Out</v-btn>
  <v-btn v-if="employee.clockStatus == 'in'" @click.native="setMyDevice()" block color="secondary" dark>Make this my Device</v-btn>
  <v-btn v-if="employee.clockStatus == 'out'"  @click.native="clockIn()"block color="secondary" dark>Clock In</v-btn>
</div>
</template>

<script>
import Parse from "parse"
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
    updateEmployee(emp, clockedIn) {
      // Create the object.
      var Employee = Parse.Object.extend("Employee")
      var query = new Parse.Query(Employee)
      query.get(emp.objectId).then(
        employee => {
          if (clockedIn) {
            employee.set("currentDevice", window.device.uuid);
          } else {
            employee.set("currentDevice", null);
          }
          employee.set("clockedIn", clockedIn);
          return employee.save();
        },
        error => {
          console.log(error);
        }
      );
    },
    async clockOut() {
      var emp = this.employee;
      var self = this;
      const params = { empId: emp.humanityId, token: self.$humanityToken };
      console.log("running clock OUT ");
      const status = await Parse.Cloud.run("clockOut", params);
      if (status.status == 1) {
        this.updateEmployee(emp, false)
      }
    },
    async clockIn() {
      var emp = this.employee;
      var self = this;
      const params = { empId: emp.humanityId, token: self.$humanityToken };
      console.log("running clock IN ");
      const status = await Parse.Cloud.run("clockIn", params);
      if (status.status == 1) {
        this.updateEmployee(emp, true)
      }
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
      return this.employee.avatar !== null; //&& this.employee.avatar.src;
    },

    showBottomNav() {
      return this.mini === false && this.bottomNav
    },

    showTopNav() {
      return this.mini === false && this.topNav
    }
  },
  created() {
    this.avatar = this.$getAvatar
  }
}
</script>

<style lang="stylus" scoped>
  .caption, .subheading {
    font-weight:200;  
  }
</style>
