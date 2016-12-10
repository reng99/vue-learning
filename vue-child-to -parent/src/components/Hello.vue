<template>
  <div class="hello">
    <input v-model = "msg"/>
    <button type="button" name="button" @click="notify">dispatch event</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg:"hello reng"
    }
  },
  methods:{
    notify:function(){
      this.$emit("toParent",this.msg);
      this.msg=""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;

}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
