<template>
  <div id="app">
    <!-- <indexRecharge></indexRecharge> -->
    <!-- this is the father -->
    <h1>this is the father</h1>
    <hello v-on:toParent="doSomething"></hello>

    <p>Message {{messages}}</p>
  </div>
</template>

<script>
import Hello from './components/Hello'
// import indexRecharge from './components/index-rechange-human-page'

export default {
  data(){
    return {
      messages:[]
    }
  },
  methods:{
    doSomething:function(msg){
      this.messages.push(msg);
    }
  },
  name: 'app',
  components: {
    // indexRecharge
    Hello
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
