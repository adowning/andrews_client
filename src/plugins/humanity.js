// import Parse from "parse"
import { gebHandler } from "vue-geb"
import axios from "axios"
import Vue from "vue"
import Parse from "parse";
var token;
async function setFunctions(Vue) {
  try {
    Vue.prototype.getClockStatus = async function(empId) {
      return await axios.get(
        `/api/v2/timeclocks/status/${empId}/1?access_token=` + token
      )
    };
    Vue.prototype.$getHumanityEmployeeList = async function() {
      return await axios.get(`/api/v2/employees/?access_token=` + token)
    };

    Vue.prototype.$clockIn = async function(empId) {
      try {
        // const data = await axios.get(`https://www.humanity.com/api/v2/timeclocks/status/${empId}/0?access_token=` + token)

        const result = await axios.post(
          `https://www.humanity.com/api/v2/employees/${empId}/clockin?access_token=` +
            token,
          { access_token: token }
        );
        console.log(data2.data.status);
        if (result.data.status == 13) {
          return "13";
        } else {
          var res = result.data;
          return res;
        }
      } catch (e) {
        console.log(e);
        return "507";
      }
    };
    Vue.prototype.$getHumanityClockStatus = async function(empId) {
      console.log(empId)
      return axios(
        `/api/v2/timeclocks/status/${empId}/0?access_token=` + token
      );
      //     `https://www.humanity.com/api/v2/timeclocks/status/${empId}/1?access_token=` +
      //       token
      //   );
    }

    // const wordPromise = axios("http://www.setgetgo.com/randomword/get.php");
    // const userPromise = axios("https://randomuser.me/api/");
    // const namePromise = axios("https://uinames.com/api/");
    // // await all three promises to come back and destructure the result into their own variables
    // const [word, user, name] = await Promise.all([
    //   wordPromise,
    //   userPromise,
    //   namePromise
    // ]);
    // console.log(word.data, user.data, name.data); // cool, {...}, {....}
  } catch (e) {
    console.error(e); // 💩
  }
}

const HumanityPlugin = {
  install(Vue) {
    console.log("installed");
    Parse.Config.get().then(
      function(config) {
        token = config.get("humanityToken");
        setFunctions(Vue)
      },
      function(error) {
        console.log(error)
        token = window.localStorage.getItem("humanityToken");
      }
    )
  }
}

export default HumanityPlugin
