import Parse from "parse"
import axios from 'axios'

export async function setFunctions(Vue, token) {

  Vue.prototype.$getHumanityEmployeeList = async function() {
      return await axios.get(`/api/v2/employees/?access_token=` + token)
    }


    Vue.prototype.$getHumanityClockStatus = async function(empId) {
      console.log('getting humanity status')
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
    return axios.post(`/api/v2/employees/${empId}/clockin?access_token=` + token, {"access_token": token})
    // try {
    //   const result = await axios.post(`/api/v2/employees/${empId}/clockin?access_token=` + token, {"access_token": token})
    //   if(result.data.status == 13){
    //     return "13"
    //     }else{
    //       return result.data
    //     }
     
    // } catch (e) {
    //   return e
    //   // response.send(e)
    // }
  }
}
