import Parse from "parse"
import { gebHandler } from "vue-geb"
var Minio = require("minio")

var minioClient = new Minio.Client({
  endPoint: "groupandrews.com",
  port: 9010,
  useSSL: false,
  accessKey: "asdfasdf",
  secretKey: "asdfasdf"
});

// import { sync } from 'vuex-pathify'

const ParsePlugin = {
  install(Vue) {
    Parse.initialize("myAppId", "myJavascriptKey")
    Parse.serverURL = "http://192.168.1.10:1337/parse"
    Parse.Config.get().then(
      function(config) {
        var humanityToken = config.get("humanityKey");
        Vue.prototype.$humanityToken = humanityToken
        gebHandler.emit({
          token: humanityToken,
          type: "setToken"
        })
      },
      function(error) {
        console.log(error);
      }
    );

    var currentDevice = Parse.User.current()
    if (currentDevice) {
      Vue.prototype.$currentDevice = currentDevice
    } else {
      console.log(window.device.uuid)
      var device = new Parse.User()
      if (device.isVirtual) {
        device.set("username", "development")
        device.set("password", "development")
      } else {
        device.set("username", window.device.uuid)
        device.set("password", window.device.uuid)
      }
      device.logIn({
        success: function(currentDevice) {
          Vue.prototype.$currentDevice = currentDevice
        },
        error: function(user, error) {
          console.log(
            "login errors: " +
              JSON.stringify(error) +
              "for user: " +
              JSON.stringify(user)
          )
          // state.loginErrors = error    Vue.prototype.$Parse = Parse
        }
      })
    }
    Vue.prototype.$getAvatar = async function(empId) {
      var size = 0
      return minioClient.getObject("photos", empId + ".png", function(
        err,
        dataStream
      ) {
        if (err) {
          return console.log(err)
        }
        dataStream.on("data", function(chunk) {
          size += chunk.length
        })
        dataStream.on("end", function() {
          console.log("End. Total size = " + size)
        })
        dataStream.on("error", function(err) {
          console.log(err)
        })
      })
    };
    async function setOnlineEmployees() {
      const Employee = Parse.Object.extend("Employee")
      const query = new Parse.Query(Employee)
      // query.equalTo("clockedIn", true);
      var employeeList = await query.find();
      var count = 0;

      for (var e of employeeList) {
        if (e.isClockedIn && e.currentDevice == window.device.uuid) {
          count++;
        }
      }
      Vue.prototype.$employeeList = employeeList;
      window.localStorage.setItem("employeeList", JSON.stringify(employeeList));
      var needsOwner = true;
      if (count >= 1) {
        needsOwner = false;
      }
      sendEmployeeListUpdatedMessage(employeeList, needsOwner)
    }
    let query = new Parse.Query("Employee")
    let subscription = query.subscribe()

    function sendEmployeeListUpdatedMessage(object, needsOwner) {
      gebHandler.emit({
        data: object,
        needsOwner: needsOwner,
        type: "employeeListUpdated"
      })
    }
    subscription.on("open", object => {
      // console.log("object opened ", object);
      setOnlineEmployees();
    })
    subscription.on("create", object => {
      sendEmployeeListUpdatedMessage(object)

      console.log("object created ", object)
    })
    subscription.on("enter", object => {
      console.log("object entered ", object)
    })
    subscription.on("leave", object => {
      console.log("object left ", object)
    })
    subscription.on("close", object => {
      console.log("object closed ", object)
    })

    subscription.on("update", object => {
      // console.log("object updated ", object);
      setOnlineEmployees();

      // gebHandler.emit({ object });
    })

    // Vue.prototype.$parseClient = client
    // Vue.mixin({
    //   created: function() {
    //     var parseState = this.$options.parseState
    //     if (parseState) {
    //       console.log(parseState)
    //     }
    //   }
    // })
  }
}
// }

export default ParsePlugin

// const ParsePlugin = {
//     install(Vue, options) {
//         Parse.initialize("myAppId", "myJavascriptKey");
//         Parse.serverURL = "http://192.168.1.10:1337/parse";
//         Vue.mixin({
//         // Anything added to a mixin will be injected into all components.
//         // In this case, the mounted() method runs when the component is added to the DOM.
//         created(){
//             this.Parse = Parse
//         }
//         // mounted() {
//         //   console.log('Mounted!');
//         // }
//       });
//     }
//   };

// export default ParsePlugin;
/* eslint-disable-next-line */

// async function init() {
//   console.log(device.uuid);
//   const user = await Vue.prototype.Parse.User.logIn(deviceId, deviceId);
//   console.log(user);
// }

// document.addEventListener("deviceready", init(), false);
