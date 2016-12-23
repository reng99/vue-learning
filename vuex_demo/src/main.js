// 这里存放总的
import Vue from "vue"

import store from "./vuex/store.js"

import Main from "./components/Main.vue"

let App = new Vue({
  store,
  el:"body",
  components:{
    Main
  }
})
