// import Parse from "parse"
import { gebHandler } from "vue-geb"
import axios from "axios"
import Parse from "parse"
var token
async function setFunctions(Vue) {
  try {
    // Vue.prototype.$getClockStatus = async function(empId) {
    //   return await axios.get(
    //     `/api/v2/timeclocks/status/${empId}/1?access_token=` + token
    //   )
    // }
    Vue.prototype.$getHumanityEmployeeList = async function() {
      return await axios.get(`/api/v2/employees/?access_token=` + token)
    }

    Vue.prototype.$clockIn = async function(empId) {
      try {
        // const data = await axios.get(`https://www.humanity.com/api/v2/timeclocks/status/${empId}/0?access_token=` + token)

        const result = await axios.post(
          `https://www.humanity.com/api/v2/employees/${empId}/clockin?access_token=` +
            token,
          { access_token: token }
        )
        console.log(data2.data.status)
        if (result.data.status == 13) {
          return "13"
        } else {
          var res = result.data
          return res
        }
      } catch (e) {
        console.log(e)
        return "507"
      }
    }
    Vue.prototype.$getHumanityClockStatus = async function(empId) {
      return axios(
        `/api/v2/timeclocks/status/${empId}/0?access_token=` + token
      )
      //     `https://www.humanity.com/api/v2/timeclocks/status/${empId}/1?access_token=` +
      //       token
      //   );
    }
    Vue.prototype.$humanityClockOut = async function(empId) {
    try {
      const result = await axios.put(`/api/v2/employees/${empId}/clockout?access_token=` + token, {"access_token": token})
      if(result.data.status == 13){
        return "13"
        }else{
          return result.data
        }
     
    } catch (e) {
      console.log(e)
      return e
      // response.send(e)
    }
  }

  Vue.prototype.$humanityClockIn = async function(empId) {

    try {
      const result = await axios.post(`/api/v2/employees/${empId}/clockin?access_token=` + token, {"access_token": token})
      if(result.data.status == 13){
        return "13"
        }else{
          return result.data
        }
     
    } catch (e) {
      return e
      // response.send(e)
    }
  }

  }catch (e) {
    console.log(e)
    return e
    // response.send(e)
  }
}

const HumanityPlugin = {
  install(Vue) {
    Parse.Config.get().then(
      function(config) {
        token = config.get("humanityToken")
        setFunctions(Vue)
      },
      function(error) {
        console.log(error)
        token = window.localStorage.getItem("humanityToken")
      }
    )
  }
}

export default HumanityPlugin
