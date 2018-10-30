<template>
  <v-container grid-list>
    <v-layout align-center justify-center column/>
      <v-flex>
       <qrcode-reader v-if="!scan && !paused && startScan"  @init="onInit" @decode="onDecode" :paused="paused">
        </qrcode-reader>
      </v-flex>
      <v-flex>
       <v-btn v-if="!startScan" block color="blue-grey" class="white--text" @click.native="scan()">
          Scan ID Badge
        </v-btn>
      </v-flex>
       <v-flex>
         <v-btn  block color="green" class="white--text" @click.native="updateScanedEmployee('qQxa9tZOsr')">
          fakeScan
        </v-btn>
       <v-btn  block color="red" class="white--text" @click.native="goHome()">
          Cancel
        </v-btn>
      </v-flex>
  </v-container>
</template>
      
<script>
// import axios from 'axios'
import Parse from "parse";
import { gebHandler } from "vue-geb";

// var Parse = require("parse");

export default {
  page: {
    title: "Log in"
  },
  // props: ['_setEmployee'],
  // components: { QrcodeReader },
  data() {
    return {
      startScan: false
    };
  },

  methods: {
    async updateScanedEmployee(_id) {
      var self = this;
      // var me = {}
      // var token = await window.localStorage.getItem("humanityToken")
      var elist = await JSON.parse(window.localStorage.getItem("employeeList"));
      for (var e of elist) {
        console.log(e)
        if (e.objectId == _id) {
          console.log(e.humanityId);
          var status = await self.$getClockStatus(e.humanityId)
          gebHandler.emit({
            data: e,
            clockStatus: status.data.data,
            type: "employeeScanSuccess"
          })
          // console.log(self.$getClockStatus(e.humanityId));
        }
      }

      //    var Employee = Parse.Object.extend("Employee")
      // var employee = new Parse.Query(Employee)
      // employee.get(_id)
      // .then((_employee) => {
      //       console.log(_employee)

      //   gebHandler.emit({
      //         data: _employee,
      //         type: 'employeeScanSuccess'
      //       })

      // }, (error) => {
      //  console.log(error)
      // })

      // this.$router.push("employee/profile:"+id)
    },
    scan() {
      var self = this;
      // var cordova = cordova
      /* eslint-disable-next-line */
      cordova.plugins.barcodeScanner.scan(
        function(result) {
          console.log(
            "We got a barcode\n" +
              "Result: " +
              result.text +
              "\n" +
              "Format: " +
              result.format +
              "\n" +
              "Cancelled: " +
              result.cancelled
          );
          self.updateScanedEmployee(result.text);
        },

        function(error) {
          alert("Scanning failed: " + error);
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: true, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: "Place ID badge inside the scan area", // Android
          resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats:
            "DATA_MATRIX,UPC_A,UPC_E,EAN_8,EAN_13,CODE_39,CODE_93,CODE_128,CODABAR,ITF,RSS14,PDF_417,RSS_EXPANDED,MSI,AZTEC", // default: all but PDF_417 and RSS_EXPANDED
          orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
          // disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      );
    },
    async setUser() {
      // var result = JSON.parse(_result)
      // console.log(result)
      // result.deviceId = this.info.uuid
      // try {
      //   let response = await axios.post(
      //     ' http://groupandrews.com:1880/api/timeclocks/status/',
      //     result
      //   )
      //   this.user = response.data
      //   this.clockStatus = response.data.data
      //   this.deviceOwner = response.data.deviceOwner
      //   console.log(response)
      // } catch (err) {
      //   console.log(err)
      // }
    },
    tryToLogIn(content) {
      this.authError = null;
      // let content = {};
      console.log(content);
      content.username = "asdf";
      content.password = "asdfasdf";
      console.log(content);
      var self = this;
      return self
        .mL({
          username: content.username,
          password: content.password
        })
        .then(token => {
          console.log("back", token);

          self.tryingToLogIn = false;
          // Redirect to the originally requested page, or to the home page
          self.$router.push(this.$route.query.redirectFrom || { name: "home" });
        })
        .catch(error => {
          console.log(error);
          self.tryingToLogIn = false;
          self.authError = error;
          var message = "fix me up and i cant log in";
          self.event.$emit("alert", message);
        });
    },

    onDecode(decodedString) {
      console.log("ds ", decodedString);
    },
    async onInit(promise) {
      // show loading indicator
      console.log("promise");
      var errorText = "";
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          errorText = "user denied camera access permisson";
        } else if (error.name === "NotFoundError") {
          errorText = "no suitable camera device installed";
        } else if (error.name === "NotSupportedError") {
          errorText = " page is not served over HTTPS (or localhost)";
        } else if (error.name === "NotReadableError") {
          errorText = " maybe camera is already in use";
        } else if (error.name === "OverconstrainedError") {
          errorText = " passed constraints dont match any camera.";
          // Did you requested the front camera although there is none?
        } else {
          errorText = " browser might be lacking features (WebRTC, ...)";
        }
      } finally {
        // hide loading indicator
        this.loading = false;
      }
      if (errorText.length > 1) {
        var message = {
          color: "red",
          text: errorText
        };
        this.event.$emit("alert", message);
      }
    },
    onDestroy() {
      console.log("destroying");
      this.user = null;
    }
  }
};
</script>
