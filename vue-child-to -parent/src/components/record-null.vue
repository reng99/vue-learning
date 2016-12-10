<template lang="html">
  <div class="nodata-container">
		<i class="icon-null"></i>
		<p class="desc-null">{{msg}}</p>
    <img src="../assets/img/1.png"><br/>
	</div>
</template>

<script>
export default {
  name : "record-null",
  replace:true,
  data(){
    return {
      msg:"come"
    }
  }
}
</script>

<style lang="css">
.nodata-container{
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -80px;
  text-align: center;
}
.icon-null{
  display: block;
  width: 56px;
  height: 56px;
  margin: auto;
}
.desc-null{
  margin-top: 16px !important;
  font-size: 30px;
  color: "#bebebe";
}
</style>
