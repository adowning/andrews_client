<template>
 <v-container grid-list>
<v-layout align-center justify-center column>
      <v-flex>
       <qrcode-reader v-if="!scan && !paused && startScan"  @init="onInit" @decode="onDecode" :paused="paused">
        </qrcode-reader>
      </v-flex>
      <v-flex>
       <v-btn v-if="!startScan" block color="blue-grey" class="white--text" @click.native="startScan = true">
          Scan ID Badge
        </v-btn>
      </v-flex>
       <v-flex>
       <v-btn  block color="red" class="white--text" @click.native="goHome()">
          Cancel
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
<v-flex v-if="startScan" class=" mt-5">
        <qrcode-reader v-if="!scan && !paused && startScan"  @init="onInit" @decode="onDecode" :paused="paused">
        </qrcode-reader>
        
</v-flex>
<v-flex class=" mt-5">

<v-btn v-if="!startScan" block color="blue-grey" class="white--text" @click.native="startScan = true">
          Scan ID Badge
        </v-btn>
        <v-btn v-if="startScan" block color="blue-grey" class="white--text" @click.native="startScan = false;">
         Stop
        </v-btn>
</v-flex>
    </v-layout>

      </v-container> -->
</template>
      <!-- <v-flex v-if=" user" class=" mt-5" xs6>

        <v-alert v-if="clockStatus == 'out' && deviceOwner == 'shop'" class="white--text text-xs-center mt-5" :value="true" type="info">
          This tablet is not checked out. Once you log in, you will be responsible for this device until you either transfer to a team member or turn it in at the office.
        </v-alert>
        <div class="text-xs-center mt-5">
          <v-btn v-if="clockStatus == 'out'" block color="blue-grey" class="white--text" @click.native="clockIn()">
            Clock In
          </v-btn>
          <v-btn v-if="clockStatus == 'in' && deviceOwner != user.employeeId" block color="blue-grey" class="white--text" @click.native="clockOut()">
            Clock Out
          </v-btn>
          <v-btn v-if="deviceOwner == user.employeeId" block color="blue-grey" class="white--text" @click.native="checkOutTab()">
            Checkin Tablet
          </v-btn>
        <v-btn v-if="tabletAvailable" block color="blue-grey" class="white--text" @click.native="checkOutTablet()">
            Checkout Tablet
          </v-btn> 
          <v-btn v-if="deviceOwner == user.employeeId" block color="blue-grey" class="white--text" @click.native="transferTab()">
            Transfer Ownership
          </v-btn>
        </div>
      </v-flex>
      <v-flex xs2>
      </v-flex>
      <v-btn block color="blue-grey" class="white--text" @click.native="mL()">
        LoginTest
      </v-btn>
    </v-layout>
    {{info}}

    <a href="/">
      <h3><span aria-hidden="true">← </span>Return to the tracker</h3>
    </a>

    <div data-show="signin" data-hide-if="signed-in">
      <form class="signup" action="signup">
        <h2>Sign up</h2>

        <p>
          <label for="input-signup-email">Email</label>
          <input id="input-signup-email" name="email" type="email" required>
          </p>

          <p>
            <label for="input-signup-password">Password</label>
            <input id="input-signup-password" name="password" type="password" required>
          </p>

            <p>
              <button id="signup" type="submit" class="primary">Sign up</button>
              <a href="#" data-action="show-signin">Log in?</a>
            </p>
      </form>

      <form class="signin" action="signin">
        <div class="signup-link">
          <h3>New account?</h3>
          <a href="#" class="btn" data-action="show-signup">
            <span class="sr-only">Need an account?</span>
            Sign up!
          </a>
        </div>

        <h2>Log in</h2>

        <p>
          <label for="input-signin-email">Email</label>
          <input id="input-signin-email" name="email" type="email" required>
          </p>

          <p>
            <label for="input-signin-password">Password</label>
            <input id="input-signin-password" name="password" type="password" required>
          </p>

            <p>
              <button type="submit" class="primary">Log in</button>
              <small>
                <a href="#" class="btn-link" data-action="show-password-reset">Forgot password?</a>
              </small>
            </p>
      </form>

      <form class="password-reset">
        <h2>Password reset</h2>

        <p>
          <label for="input-email-reset">Enter your account's email</label>
          <input id="input-email-reset" name="email" type="email" required>
          </p>

          <p>
            <button class="primary" type="submit">Send</button>
            <small>
              <a href="#" class="btn-link" data-action="show-signin">Cancel</a>
            </small>
          </p>
      </form>
    </div>

    <div data-hide-if="signed-out">
      <h3>Account settings</h3>
      <div data-show="options">
        <div class="options">
          <button class="default" data-action="show-change-email">Change email</button>
          <button class="default" data-action="show-change-password">Change password</button>
          <button class="danger" data-action="show-delete-account">Delete account</button>
        </div>

        <form class="change-email">
          <p>
            <label for="input-change-email">Change email</label>
            <input id="input-change-email" name="email" type="email" required>
            </p>

            <p>
              <button class="primary" type="submit">Save</button>
              <small>
                <a href="#" class="btn-link" data-action="show-options">Cancel</a>
              </small>
            </p>
        </form>

        <form class="change-password">
          <p>
            <label for="inpute-change-password">Set new password</label>
            <input id="inpute-change-password" name="password" type="password" required>
            </p>

            <p>
              <button class="primary" type="submit">Save</button>
              <small>
                <a href="#" class="btn-link" data-action="show-options">Cancel</a>
              </small>
            </p>
        </form>

        <div class="delete-account">
          <p>Are you sure you want to delete your account?</p>
          <button data-action="delete-account" class="danger">Delete account</button>
          <small>
            <a href="#" class="btn-link" data-action="show-options">Cancel</a>
          </small>
        </div>
      </div>

      <div class="signout-container">
        <button class="small" data-action="signout">Sign out</button>
      </div>
    </div> -->



<!-- <script>
// import { Device, Camera } from '@capacitor/core'
// import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// // import { QRScanner } from 'cordova-plugin-qrscanner'
// import axios from 'axios'
// export default {
//   page: {
//     title: 'Log in',
//   },
//   components: { QrcodeReader },
//   data () {
//     return {
//       username: '',
//       password: '',
//       authError: null,
//       tryingToLogIn: false,
//       paused: false,
//       loading: false,
//       accepted: false,
//       device: null,
//       isMenu: true,
//       isPolicy: false,
//       clockedIn: false,
//       clockingIn: false,
//       hasTablet: false,
//       tabletAvailable: true,
//       scan: false,
//       startScan: false,
//       user: null,
//       clockStatus: null,
//       deviceOwner: null,
//       info: ''
//     }
//   },
//   async mounted () {
//     const info = await Device.getInfo();
//     this.info = info
//     // const device = await axios.post(' http://groupandrews.com:1880/api/device/status/', { "deviceId": info.uuid })
//     // this.device = device.data
//     // this.deviceOwner = device.data.owner
//     //  window.QRScanner.prepare(onDone); // show the prompt
//     //  window.QRScanner.scan(displayContents);

// function onDone(err, status){
//   if (err) {
//    // here we can handle errors and clean up any loose ends.
//    console.error(err);
//   }
//   if (status.authorized) {
//     console.log('asdf1')

//     // W00t, you have camera access and the scanner is initialized.
//     // QRscanner.show() should feel very fast.
//     QRscanner.show()
//   } else if (status.denied) {
//     console.log('asdf2')

//    // The video preview will remain black, and scanning is disabled. We can
//    // try to ask the user to change their mind, but we'll have to send them
//    // to their device settings with `QRScanner.openSettings()`.
//   } else {
//     console.log('asdf')
//     // we didn't get permission, but we didn't get permanently denied. (On
//     // Android, a denial isn't permanent unless the user checks the "Don't
//     // ask again" box.) We can ask again at the next relevant opportunity.
//   }
// }
//   },
//   methods: {
// //     scan(){
// // //  this.selectedProduct = {};
// //     this.barcodeScanner.scan().then((barcodeData) => {
// //       // this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
// //       if(true) {
// //         // this.productFound = true;
// //         // console.log(this.selectedProduct);
// //         console.log('found');
// //       } else {
// //         // this.selectedProduct = {};
// //         // this.productFound = false;
// //         console.log('found')
// //         // this.toast.show('Product not found', '5000', 'center').subscribe(
// //         //   toast => {
// //         //     console.log(toast);
// //         //   }
// //         // );
// //       }
// //     }, (err) => {
// //      console.log(err)
// //      // this.toast.show(err, '5000', 'center').subscribe(
// //       //   toast => {
// //       //     console.log(toast);
// //       //   }
// //       // );
// //     });
// //   },
    
//     async setUser (_result) {
//       var result = JSON.parse(_result)
//       result.deviceId = this.info.uuid
//       try {
//         let response = await axios.post(' http://groupandrews.com:1880/api/timeclocks/status/', result)
//         this.user = response.data
//         this.clockStatus = response.data.data
//         this.deviceOwner = response.data.deviceOwner
//       } catch (err) {
//         console.log(err)
//       }
//     },
//     async   clockOut () {
//       this.loading = true;
//       var self = this
//       let data = {
//         "employeeId": this.user.employeeId,
//         "deviceId": this.info.uuid
//       }
//       try {
//         let response = await axios.post('http://groupandrews.com:1880/api/employees/clockout', data)
//         if (response.data.status == 13) {
//           console.log('error')
//         } else {
//           self.$router.push('login')
//         }
//       } catch (err) {
//         console.log(err)
//       }
//     },
//     async clockIn () {
//       var self = this
//       this.loading = true;
//       console.log(this.user.employeeData.id)
//       let data = {
//         "employeeId": this.user.employeeData.id,
//         "deviceId": this.info.uuid
//       }
//       try {
//         let response = await axios.post('http://groupandrews.com:1880/api/employees/clockin', data)
//         console.log(response)
//         if (response.data.status == 13) {
//           console.log('error')
//         } else {
//           self.$router.push('login')
//         }
//       } catch (err) {
//         console.log(err)
//       }
//     },
//     mL (qrInfo) {
//       qrInfo = {}
//       qrInfo.email = "adsf"
//       qrInfo.password = "asdfasdf"
//       console.log(this)
//       var self = this
//       AuthService.makeLogin({
//         email: qrInfo.email,
//         password: qrInfo.password
//       }).then(response => { self.error = '' })
//         .then(() => {
//           self.$store.dispatch('user/getCurrent')
//             .then(() => self.$router.push('profile'))
//             .catch(error => console.log(error))
//         })
//         .catch((error) => {
//           console.log('error', error)
//           self.error = error.status === 404 ? 'User with same email not found' : error.message
//         })
//     },
//     tryToLogIn (content) {
//       this.authError = null
//       // let content = {};
//       console.log(content)
//       content.username = 'asdf'
//       content.password = 'asdfasdf'
//       console.log(content)
//       var self = this
//       return self.mL({
//         username: content.username,
//         password: content.password
//       })
//         .then(token => {
//           self.tryingToLogIn = false
//           self.$router.push(this.$route.query.redirectFrom || { name: 'home' })
//         })
//         .catch(error => {
//           console.log(error)
//           self.tryingToLogIn = false
//           self.authError = error
//           var message = 'fix me up and i cant log in'
//           self.event.$emit('alert', message);
//         })
//     },
//     async onDetect (promise) {
//     },
//     async onDecode (decodedString) {
//       console.log(decodedString)
//       this.paused = true
//       this.setUser(decodedString)
//     },
//     async onInit (promise) {
//       var errorText = ''
//       try {
//         await promise
//       } catch (error) {
//         if (error.name === 'NotAllowedError') {
//           errorText = "user denied camera access permisson"
//         } else if (error.name === 'NotFoundError') {
//           errorText = 'no suitable camera device installed'
//         } else if (error.name === 'NotSupportedError') {
//           errorText = ' page is not served over HTTPS (or localhost)'
//         } else if (error.name === 'NotReadableError') {
//           errorText = ' maybe camera is already in use'
//         } else if (error.name === 'OverconstrainedError') {
//           errorText = ' passed constraints dont match any camera.'
//           // Did you requested the front camera although there is none?
//         } else {
//           errorText = ' browser might be lacking features (WebRTC, ...)'
//         }
//       } finally {
//         this.loading = false
//       }
//       if (errorText.length > 1) {
//         var message = {
//           color: 'red',
//           text: errorText
//         }
//         console.log(errorText)
//         // this.event.$emit('alert', message);
//       }
//     }
//   },

//   onDestroy () {
//     console.log('destroying')
//     this.user = null
//   }
  
// }
// </script>
// <template>
//   <v-container grid-list-xl>
//     <v-layout>
//       <v-flex xs2>
//       </v-flex>
//       <v-flex v-if="!scan && !user" class=" mt-5" xs6>
//         <qrcode-reader v-if="!scan && !paused && startScan" :video-constraints="{ width: { min: 360, ideal: 680, max: 1920 }, height: { min: 240, ideal: 480, max: 1080 }, facingMode: 'user', audio: false }" @detect="onDetect" @init="onInit" @decode="onDecode" :paused="paused">
//         </qrcode-reader>
//         <v-btn block color="blue-grey" class="white--text" @click.native="startScan = true">
//           Scan ID Badge
//         </v-btn>
//       </v-flex>
//       <v-flex v-if=" user" class=" mt-5" xs6>
//         <v-alert v-if="clockStatus == 'out' && deviceOwner == 'shop'" class="white--text text-xs-center mt-5" :value="true" type="info">
//           This tablet is not checked out. Once you log in, you will be responsible for this device until you either transfer to a team member or turn it in at the office.
//         </v-alert>
//         <div class="text-xs-center mt-5">
//           <v-btn v-if="clockStatus == 'out'" block color="blue-grey" class="white--text" @click.native="clockIn()">
//             Clock In
//           </v-btn>
//           <v-btn v-if="clockStatus == 'in' && deviceOwner != user.employeeId" block color="blue-grey" class="white--text" @click.native="clockOut()">
//             Clock Out
//           </v-btn>
//           <v-btn v-if="deviceOwner == user.employeeId" block color="blue-grey" class="white--text" @click.native="checkOutTab()">
//             Checkin Tablet
//           </v-btn>
//             Checkout Tablet
//           <v-btn v-if="deviceOwner == user.employeeId" block color="blue-grey" class="white--text" @click.native="transferTab()">
//             Transfer Ownership
//           </v-btn>
//         </div>
//       </v-flex>
//       <v-flex xs2>
//       </v-flex>
//       <v-btn block color="blue-grey" class="white--text" @click.native="mL()">
//         LoginTest
//       </v-btn>
//     </v-layout>
//     {{info}}
//   </v-container>
// </template>
-->



<script>


export default {
  page: {
    title: 'Log in',
  },
  components: { QrcodeReader },
  data() {
    return {
      // username: '',
      // password: '',
      // authError: null,
      // tryingToLogIn: false,
      // paused: false,
      // loading: false,
      // accepted: false,
      // device: null,
      // isMenu: true,
      // isPolicy: false,
      // paused: false,
      // clockedIn: false,
      // clockingIn: false,
      // hasTablet: false,
      // tabletAvailable: true,
      // scan: false,
      // startScan: false,
      // user: null,
      // clockStatus: null,
      // deviceOwner: null,
      // info: '',
    }
  },
  async mounted() {
    // console.log("created");
    // let query = new Parse.Query("DeviceUpdate");
    // let subscription = query.subscribe();
    // subscription.on("create", object => {
    //   console.log("object created");
    // });
    // const info = await Device.getInfo();
    // this.info = info;
    // console.log(info);
    // const device = await axios.post(
    //   " http://groupandrews.com:1880/api/device/status/",
    //   { deviceId: info.uuid }
    // );
    // this.device = device.data;
    // this.deviceOwner = device.data.owner;
  },
  // methods: {
  //   async setUser(_result) {
  //     var result = JSON.parse(_result)
  //     console.log(result)
  //     result.deviceId = this.info.uuid
  //     try {
  //       let response = await axios.post(
  //         ' http://groupandrews.com:1880/api/timeclocks/status/',
  //         result
  //       )
  //       this.user = response.data
  //       this.clockStatus = response.data.data
  //       this.deviceOwner = response.data.deviceOwner
  //       console.log(response)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   },
  //   async clockOut() {
  //     this.loading = true
  //     var self = this
  //     let data = {
  //       employeeId: this.user.employeeId,
  //       deviceId: this.info.uuid,
  //     }
  //     try {
  //       let response = await axios.post('http://groupandrews.com:1880/api/employees/clockout', data)
  //       if (response.data.status == 13) {
  //         console.log('error')
  //       } else {
  //         self.$router.push('login')
  //       }
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   },
  //   async clockIn() {
  //     var self = this
  //     this.loading = true
  //     console.log(this.user.employeeData.id)
  //     let data = {
  //       employeeId: this.user.employeeData.id,
  //       deviceId: this.info.uuid,
  //     }
  //     try {
  //       let response = await axios.post('http://groupandrews.com:1880/api/employees/clockin', data)
  //       console.log(response)
  //       if (response.data.status == 13) {
  //         console.log('error')
  //       } else {
  //         self.$router.push('login')
  //       }
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   },
  //   mL(qrInfo) {
  //     qrInfo = {}
  //     qrInfo.email = 'adsf'
  //     qrInfo.password = 'asdfasdf'
  //     console.log(this)
  //     var self = this
  //     AuthService.makeLogin({
  //       email: qrInfo.email,
  //       password: qrInfo.password,
  //     })
  //       .then(response => {
  //         self.error = ''
  //       })
  //       .then(() => {
  //         self.$store
  //           .dispatch('user/getCurrent')
  //           .then(() => self.$router.push('profile'))
  //           .catch(error => console.log(error))
  //       })
  //       .catch(error => {
  //         console.log('error', error)
  //         self.error = error.status === 404 ? 'User with same email not found' : error.message
  //       })
  //   },
  //   async goHome() {
  //     this.$router.push('/')
  //   },
  //   tryToLogIn(content) {
  //     this.authError = null
  //     // let content = {};
  //     console.log(content)
  //     content.username = 'asdf'
  //     content.password = 'asdfasdf'
  //     console.log(content)
  //     var self = this
  //     return self
  //       .mL({
  //         username: content.username,
  //         password: content.password,
  //       })
  //       .then(token => {
  //         console.log('back')

  //         self.tryingToLogIn = false
  //         // Redirect to the originally requested page, or to the home page
  //         self.$router.push(this.$route.query.redirectFrom || { name: 'home' })
  //       })
  //       .catch(error => {
  //         console.log(error)
  //         self.tryingToLogIn = false
  //         self.authError = error
  //         var message = 'fix me up and i cant log in'
  //         self.event.$emit('alert', message)
  //       })
  //   },

  //   onDecode(decodedString) {
  //     console.log('ds ', decodedString)
  //     // this.paused = true;
  //     // this.setUser(decodedString);
  //   },
  //   async onInit(promise) {
  //     // show loading indicator
  //     console.log('promise')
  //     var errorText = ''
  //     try {
  //       await promise

  //       // successfully initialized
  //     } catch (error) {
  //       if (error.name === 'NotAllowedError') {
  //         errorText = 'user denied camera access permisson'
  //       } else if (error.name === 'NotFoundError') {
  //         errorText = 'no suitable camera device installed'
  //       } else if (error.name === 'NotSupportedError') {
  //         errorText = ' page is not served over HTTPS (or localhost)'
  //       } else if (error.name === 'NotReadableError') {
  //         errorText = ' maybe camera is already in use'
  //       } else if (error.name === 'OverconstrainedError') {
  //         errorText = ' passed constraints dont match any camera.'
  //         // Did you requested the front camera although there is none?
  //       } else {
  //         errorText = ' browser might be lacking features (WebRTC, ...)'
  //       }
  //     } finally {
  //       // hide loading indicator
  //       this.loading = false
  //     }
  //     if (errorText.length > 1) {
  //       var message = {
  //         color: 'red',
  //         text: errorText,
  //       }
  //       // this.event.$emit("alert", message);
  //     }
  //   },
  //   onDestroy() {
  //     console.log('destroying')
  //     this.user = null
  //   },
  // },
}
</script>
