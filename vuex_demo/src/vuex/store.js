// 这里是存储的仓库和各种的具体的动作
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state={
  username:"reng"
}

const mutations = {
  UPDATE_USERNAME(){
    if(state.username=="reng"){
      state.username="jia"
    }else{
      state.username="reng"
    }
    console.log("this is content of update your name")
  }
}
// 将其数据和变化进行存储后输出
export default new Vuex.Store({
  state:state,
  mutations:mutations
})
