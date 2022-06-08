import Vue from "vue";
import App from "./App.vue";
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getDatabase } from "firebase/database";
import "./index.css";

Vue.config.productionTip = false;

// const firebaseConfig = {
//   apiKey: "AIzaSyDXSRRTiIEF_zfqjc-wrD_Hg6pLKo6DxCU",
//   authDomain: "uploadimage-11541.firebaseapp.com",
//   projectId: "uploadimage-11541",
//   storageBucket: "uploadimage-11541.appspot.com",
//   messagingSenderId: "939362557510",
//   appId: "1:939362557510:web:312f367ffd871f4c933447",
//   measurementId: "G-HXSC5FJ62K",
// };

// Initialize Firebase
/* eslint-disable */

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const storage = getStorage(app);
// const database = getDatabase(app);

export default {
  components: {},
  // app,
  // analytics,
  // auth,
  // storage,
  // database,
};

new Vue({
  render: (h) => h(App),
}).$mount("#app");
