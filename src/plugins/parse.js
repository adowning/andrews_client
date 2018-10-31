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

const ParsePlugin = {
  async install(Vue, options) {
    Parse.initialize("myAppId", "myJavascriptKey")
    Parse.serverURL = "http://192.168.1.10:1337/parse"
    var _uuid = null;
    if (device.platform == "browser") {
      _uuid = "development";
    } else {
      _uuid = device.uuid;
    }
    // window.localStorage.setItem("deviceId", _uuid);

    // const status = await Parse.Cloud.run("test", testParams)
    // console.log(status)
    // var currentOwner = Parse.User.current()
    // if (!currentOwner) {
    //   //   // Vue.prototype.$currentDevice = currentDevice;

    //   //   const status = await Parse.Cloud.run("test", testParams)
    //   //   console.log(status);
    //   //   if (status.status == 1) {
    //   //     this.updateEmployee(emp, true);
    //   //   }
    //   // } else {
    //   var thisDevice = new Parse.User()
    //   thisDevice.set("username", _uuid)
    //   thisDevice.set("password", _uuid)

    //   thisDevice.logIn({
    //     success: function(currentDevice) {
    //       Vue.prototype.$currentDevice = currentDevice
    //     },
    //     error: function(user, error) {
    //       console.log(
    //         "login errors: " +
    //           JSON.stringify(error) +
    //           "for user: " +
    //           JSON.stringify(user)
    //       )
    //       // state.loginErrors = error    Vue.prototype.$Parse = Parse
    //     }
    //   })
    //   const status = await Parse.Cloud.run("test", testParams);
    //   console.log(status)

    //   if (status.status == 1) {
    //     this.updateEmployee(emp, true)
    //   }
    // }
    // }
    // Vue.prototype.$getAvatar = async function(empId) {
    //   var size = 0;
    //   return minioClient.getObject("photos", empId + ".png", function(
    //     err,
    //     dataStream
    //   ) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //     dataStream.on("data", function(chunk) {
    //       size += chunk.length;
    //     });
    //     dataStream.on("end", function() {
    //       console.log("End. Total size = " + size);
    //     });
    //     dataStream.on("error", function(err) {
    //       console.log(err);
    //     });
    //   });
    // }
    async function setOnlineEmployees() {
      const Employee = Parse.Object.extend("Employee")
      const query = new Parse.Query(Employee)
      var employeeList = await query.find();
      var currentOwner = null;
      for (var e of employeeList) {
        if (e.isClockedIn && e.currentDevice == uuid) {
          count++;
          if (e.isCurrentOwner) {
            currentOwner = e;
          }
        }
      }
      var deviceInfo = {
        currentOwner: currentOwner,
        employeeList: employeeList,
        uuid: _uuid
      };
      Vue.prototype.$deviceInfo = deviceInfo;
      gebHandler.emit({
        deviceInfo: deviceInfo,
        // needsOwner: needsOwner,
        type: "deviceInfoSet"
      })
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
      console.log("object opened ", object)
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
      console.log("object updated ", object)
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
