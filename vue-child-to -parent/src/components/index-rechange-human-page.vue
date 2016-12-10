<template lang="html">
  <div class="page">
    <div v-if="listLenth">
      <p>component 1</p>
      <!-- <recharge-list :list="list" :kind:"1" /> -->
    </div>
    <div v-else>
      <div v-if="apiFlag">
        <p>show</p>


        <record-null />

      </div>
    </div>
  </div>
</template>

<script>

// 需要导入以上两个组件
import recordNull from "./record-null.vue"
// 这添加一个
export default {
  data(){
    return {
      listLenth:false,
      apiFlag:true
    }
  },
  components:{
    'record-null':recordNull
  }

}
</script>

<style lang="css">
</style>
