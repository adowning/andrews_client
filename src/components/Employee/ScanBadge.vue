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
         <v-btn  block color="green" class="white--text" @click.native="updateScanedEmployee('1444044')">
          fakeScan
        </v-btn>
       <v-btn  block color="red" class="white--text" @click.native="goHome()">
          Cancel
        </v-btn>
      </v-flex>
  </v-container>
</template>
      
<script>
import { gebHandler } from "vue-geb"

export default {
  page: {
    title: "Log in"
  },
  data() {
    return {
      startScan: false
    }
  },

  methods: {
    async updateScanedEmployee(_id) {
      // var list = await this.$getHumanityEmployeeList()
      // console.log(list.data)
      // console.log(list.data.data)
      // var list = await this.$deviceInfo.getHumanityEmployeeList();
      // var list = this.$deviceInfo.employeeList;
      // var status = await this.$getHumanityClockStatus(_id)
      for (var e of this.$deviceInfo.employeeList) {
        if (e.attributes.humanityId === _id) {
          console.log("found employee")
          var status = await self.$getHumanityClockStatus(_id);
          gebHandler.emit({
            data: e,
            humanityClockStatus: status.data.data,
            type: "employeeScanSuccess"
          });
          console.log(self.$getClockStatus(e.humanityId));
        }
      }
    },
    scan() {
      var self = this
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
          )
          self.updateScanedEmployee(result.text)
        },

        function(error) {
          alert("Scanning failed: " + error)
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
      )
    },
    onDestroy() {
      console.log("destroying")
      this.user = null
    }
  }
}
</script>
