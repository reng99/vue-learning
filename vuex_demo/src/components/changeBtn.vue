<template lang="html">
  <div>
    <button @click="updateUserName">set name</button>
    <h1>{{userName}}</h1>
  </div>
</template>

<script>
import {update_name,change_setting } from "../vuex/actions.js"
// 引入暴露store里面的数据
import {userName} from "../vuex/getters.js"
export default {
  data(){
    return{}
  },
  vuex:{
    actions:{
      updateUserName:update_name
    },
    getters:{
      userName:userName
    }
  }
}
</script>

<style lang="css">
</style>
