import Parse from "parse"
import { gebHandler } from "vue-geb"
import {setFunctions} from './humanity_funcs'

// var Minio = require("minio")

// var minioClient = new Minio.Client({
//   endPoint: "groupandrews.com",
//   port: 9010,
//   useSSL: false,
//   accessKey: "asdfasdf",
//   secretKey: "asdfasdf"
// })

const ParsePlugin = {
  async install(Vue, options) {
    Parse.initialize("myAppId", "myJavascriptKey")
    Parse.serverURL = "http://192.168.1.10:1337/parse"
    var _uuid = null
    if (device.platform == "browser") {
      _uuid = "development"
    } else {
      _uuid = device.uuid
    }
    Parse.Config.get().then(
      function(config) {
        var token = config.get("humanityToken")
        setFunctions(Vue, token)
      },
      function(error) {
        console.log(error)
        token = window.localStorage.getItem("humanityToken")
      }
    )
    async function setOnlineEmployees(object) {
      const Employee = Parse.Object.extend("Employee")
      const query = new Parse.Query(Employee)
      var employeeList = await query.find()
      var deviceEmployeeList = []
      var currentOwner = null
      for (var e of employeeList) {
      // console.log(e)
   

        if (e.attributes.clockStatus == 'in' && e.attributes.currentDevice == _uuid) {
   
          deviceEmployeeList.push(e)
          if (e.attributes.isCurrentOwner) {
            currentOwner = e
          }
        }
      }
      if(deviceEmployeeList.length > 0 && !currentOwner){
            currentOwner = deviceEmployeeList[0]
      }
      var deviceInfo = {
        currentOwner: currentOwner,
        employeeList: deviceEmployeeList,
        allEmployees: employeeList,
        updatedEmployee: object,
        uuid: _uuid
      }
      Vue.prototype.$deviceInfo = deviceInfo
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
       setOnlineEmployees(null)
    })
    subscription.on("create", object => {
      console.log("object created ", object)

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
      setOnlineEmployees(object)

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
