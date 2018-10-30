// import Parse from "parse"
import { gebHandler } from "vue-geb";
import axios from "axios";
var token
async function setFunctions(Vue) {
  try {
    Vue.getClockStatus = async function(empId) {
      return await axios.get(
        `https://www.humanity.com/api/v2/timeclocks/status/${empId}/1?access_token=` +
          token
      );
    }
    Vue.getEmployeeList = async function() {
      return await axios.get(
        `https://www.humanity.com/api/v2/employees/?access_token=` + token
      );
    }
    // const wes = await axios("https://api.github.com/users/wesbos");
    // console.log(wes.data) // mediocre code

    // Vue.getClockStatus = async function() {
    //   axios(
    //     `https://www.humanity.com/api/v2/timeclocks/status/${empId}/1?access_token=` +
    //       token
    //   )
    // };
    // Vue.xgetClockStatus = await axios(
    //   `https://www.humanity.com/api/v2/timeclocks/status/${empId}/1?access_token=` +
    //     token
    // );
    Vue.prototype.$getClockStatus = async function(empId) {
      console.log(empId);
      return axios(
        `/api/v2/timeclocks/status/${empId}/0?access_token=` + token
      )
      //     `https://www.humanity.com/api/v2/timeclocks/status/${empId}/1?access_token=` +
      //       token
      //   );
    };

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
    console.error(e) // 💩
  }
}

const HumanityPlugin = {
  install(Vue) {
    console.log("installed")
    this.sub = gebHandler.getBus().subscribe(message => {
      if (message.type == "setToken") {
        token = message.token
        setFunctions(Vue);
      }
    })
  }
};

export default HumanityPlugin;
