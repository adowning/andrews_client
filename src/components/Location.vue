
<template>
  <div class="location">
   
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
// import LocationUpdate from "../models/LocationUpdateModel.js";
// import Parse from "parse";
export default {
  name: "Location",
  props: {
    msg: String
  },
  data() {
    return {
      device: {},
      bgState: {}
    }
  },
  created() {
    if (device.platform == "android") {
      document.addEventListener(
        "deviceready",
        this.configureBackgroundGeolocation,
        false
      )
    }
  },
  methods: {
    async addLocationUpdate(location) {
      console.log(location);
      // const LocationUpdate = Parse.Object.extend("LocationUpdate");
      // const loc = new LocationUpdate();
      // loc.set("activity", location.activity);
      // loc.set("battery", location.battery);
      // loc.set("coords", location.coords);
      // loc.set("extras", location.extras);
      // loc.set("is_moving", location.is_moving);
      // loc.set("odometer", location.odometer);
      // loc.set("uuid", location.uuid);
      // loc.set("extras", location.extras);
      // try {
      //   var saved = await loc.save();
      //   //console.log(saved);
      // } catch (error) {
      //   //console.log("Error: " + error.code + " " + error.message);
      // }
    },
    async onLocation(data) {
      //console.log("onLocation", data);
      this.addLocationUpdate(data)
    },
    async onLocationError(data) {
      //console.log("onLocationError", data);
    },
    async onMotionChange(data) {
      //console.log("onMotionChange", data);
    },
    async onHeartbeat(data) {
      //console.log("onHeartbeat", data);
    },
    async onGeofence(data) {
      //console.log("onGeofence", data);
    },
    async onHttp(data) {
      //console.log("onHttp", data);
    },
    async onActivityChange(data) {
      //console.log("onActivityChange");
      //console.log(data);
      // this.addLocationUpdate(data);
    },
    async onSchedule(data) {
      //console.log("onSchedule", data);
    },
    async onProviderChange(data) {
      //console.log("onProviderChange", data);
    },
    async onHttpFailure(data) {
      //console.log("onHttpFailure", data);
    },
    async onHttpSuccess(data) {
      //console.log("onHttpSuccess", data);
    },
    async onGeofencesChange(data) {
      //console.log("onGeofencesChange", data);
    },
    async onConnectivityChange(data) {
      //console.log("onConnectivityChange", data);
      // this.addLocationUpdate(data);
    },
    async onEnabledChange(data) {
      //console.log("onEnabledChange", data);
    },
    async onPowerSaveChange(data) {
      //console.log("onPowerSaveChange", data);
    },
    async configureBackgroundGeolocation() {
      // this.device = device;
      // We don't need cordova-sqlite-storage.
      // var storage = window.localStorage;
      // We fetch put Device.uuid into localStorage to determine if this is first-boot of app.
      //  var bgGeo = this.bgService.getPlugin();
      var bgGeo = window.BackgroundGeolocation
      bgGeo.on("location", this.onLocation, this.onLocationError)
      bgGeo.on("motionchange", this.onMotionChange)
      bgGeo.on("heartbeat", this.onHeartbeat)
      bgGeo.on("geofence", this.onGeofence)
      bgGeo.on("http", this.onHttp)
      bgGeo.on("activitychange", this.onActivityChange)
      bgGeo.on("providerchange", this.onProviderChange)
      bgGeo.on("geofenceschange", this.onGeofencesChange)
      bgGeo.on("schedule", this.onSchedule)
      bgGeo.on("http", this.onHttpSuccess, this.onHttpFailure)
      bgGeo.on("powersavechange", this.onPowerSaveChange)
      bgGeo.on("connectivitychange", this.onConnectivityChange)
      bgGeo.on("enabledchange", this.onEnabledChange)

      // let username = localStorage.getItem('username');
      // With the plugin's #ready method, the supplied config object will only be applied with the first
      // boot of your application.  The plugin persists the configuration you apply to it.  Each boot thereafter,
      // the plugin will automatically apply the last known configuration.
      bgGeo
        .ready({
          reset: true,
          debug: true,
          logLevel: bgGeo.LOG_LEVEL_VERBOSE,
          distanceFilter: 0,
          stopTimeout: 1,
          autoSync: true,
          maxDaysToPersist: 14,
          stopOnTerminate: false,
          stopOnStationary: false,
          startOnBoot: true,
          foregroundService: true,
          enableHeadless: true,
          url: "  http://192.168.1.10:1337/parse/functions/updateLocation",
          params: {
            device: {
              model: this.device.model,
              platform: this.device.platform,
              uuid: window.device.uuid,
              // uuid: (this.device.model + "-" + this.device.version).replace(
              //   /[\s\.,]/g,
              //   "-"
              // ),
              version: this.device.version,
              manufacturer: this.device.manufacturer,
              framework: "Cordova"
            }
          }
        })
        .then(state => {
          // Store the plugin state onto ourself for convenience.
          console.log("- BackgroundGeolocation is ready: ", state);
          this.bgState.enabled = state.enabled
          this.bgState.schedule = state.schedule
          this.bgState.isMoving = state.isMoving
          this.bgState.geofenceProximityRadius = state.geofenceProximityRadius
          this.bgState.trackingMode =
            state.trackingMode === 1 || state.trackingMode === "location"
              ? "location"
              : "geofence"

          bgGeo.start()
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
