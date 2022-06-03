import Vue from "vue";
import App from "./App.vue";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import "./index.css";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXSRRTiIEF_zfqjc-wrD_Hg6pLKo6DxCU",
  authDomain: "uploadimage-11541.firebaseapp.com",
  projectId: "uploadimage-11541",
  storageBucket: "uploadimage-11541.appspot.com",
  messagingSenderId: "939362557510",
  appId: "1:939362557510:web:312f367ffd871f4c933447",
  measurementId: "G-HXSC5FJ62K",
};

// Initialize Firebase
/* eslint-disable */
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
