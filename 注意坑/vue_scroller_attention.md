## 关于vue_scroller的使用的坑

> 这遍文章是自己在使用 vue_scroller 进行数据的上拉刷新和下拉数据加载的一些注意的要点

参考vue_scroller的相关仓库--> [vue-scroller](https://github.com/wangdahoo/vue-scroller)

放上自己写的和接口交互的代码，是基于vue写的

```vue

<template>
  <div id="article">
    <div class="header tmt-page-header bg-main">
        <div class="row no-margin">
          <div class="col s3 no-padding">
            <a href="javascript:void(0)" @click="goBack" class="tmt-page-top-back">
              <i class="tmt-icons-arrow-leftright"></i>
            </a>
          </div>
          <div class="col s6 no-padding">
            <div class="tmt-page-top-title center">文章详情</div>
          </div>
          <div class="col s3 no-padding">
            <router-link :to="{ path: '/'}"  class="tmt-page-top-icon right" replace>
              <i class="tmt-icons-home right"></i>
            </router-link>
          </div>
        </div>
      </div>
      <!--注意⚠️ 下面scroller组件内是padding-top,不是top-->
    <scroller style="padding-top: 4.4rem;"  
    :on-refresh="refresh"
    :on-infinite="infinite"
    ref="myscroller">
      <div class="tmt-collection-main white-bg no-padding-top no-padding-bottom">
        <router-link v-for="(item,index) in pageOneDatas" :to="{path:'/articleDet',query:{id:item.id}}" :key="index"  class="tmt-collection-single-a">
          <p class="pIndex truncate left red-text" v-if="item.mark == '1'">{{item.title}}</p>
          <p class="pIndex truncate left" v-else>{{item.title}}</p>
          <span class="right">{{item.time}}</span>
        </router-link>
      </div>
    </scroller>
  </div>
</template>
<script>
  export default {
    name: 'article',
    data() {
      return {
        noData:'',
        pageOneDatas:[],
        totalPage: 1,
        currentPage: 1,
      }
    },
    created: function(){
    },
    methods: {
      goBack: function(){
        var vm = this;
        vm.$router.go(-1);
      },
      refresh: function (done) {
        var vm = this;
        setTimeout(function(){
          vm.$getDataWithUrl('/api','/notice/list/1.view',{},response => {
            vm.pageOneDatas = [];
            vm.noData = '';
            vm.totalPage = vm.currentPage-1;
            if(vm.totalPage>=2){
              vm.currentPage = 2;
            }
            vm.pageOneDatas = response.data.context.list;
          },'get')
          done();
        },1500);
      },
      infinite: function (done) {
        let vm = this;
        if(vm.noData) {
          setTimeout(()=>{
              this.$refs.myscroller.finishInfinite(1);
          })
          return;
        }
        let start = 20;
        console.log('-->'+vm.totalPage);
        vm.$getDataWithUrl('/api','/notice/list/'+vm.currentPage+'.view',{},response => {
          vm.totalPage = response.data.context.pages;
          console.log(vm.currentPage);
          vm.currentPage++;
          setTimeout(function(){
              for(let i = 0; i < response.data.context.list.length; i++) {
                  vm.pageOneDatas.push(response.data.context.list[i]);
              }
              if(vm.currentPage > vm.totalPage) {
                  vm.noData = "没有更多数据"
              }
              vm.$refs.myscroller.resize();
              done();
          }, 1500);
        },'get');
      }
    }
  }
</script>
<style scoped lang="less">

#article{
  .header {
    width:100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
  }
  .white-bg{
    background-color:#fff;
  }
}

</style>


```

重点是代码里面scroller部分

```vue

    <scroller style="top: 4.4rem;"
    :on-refresh="refresh"
    :on-infinite="infinite"
    ref="myscroller">
      <div class="tmt-collection-main white-bg no-padding-top no-padding-bottom">
        <router-link v-for="(item,index) in pageOneDatas" :to="{path:'/articleDet',query:{id:item.id}}" :key="index"  class="tmt-collection-single-a">
          <p class="pIndex truncate left red-text" v-if="item.mark == '1'">{{item.title}}</p>
          <p class="pIndex truncate left" v-else>{{item.title}}</p>
          <span class="right">{{item.time}}</span>
        </router-link>
      </div>
    </scroller>

```

还有相关的两个方法`refresh`和`infinite`,在srcoller页面加载的时候，会默认进行infinite,所以我首先在infinite这里调用接口。

> vue-scoller 在tab选项卡切换中的使用

直接放出主要的demo

```vue

<template>
  <div id="myMessageData">
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller" style="padding-top:9.4rem;">
      <li class="list-main" v-for="(item,index) in allOrder" :key="index">
        <div class="list-content truncate">{{item.subject}}</div>
        <div class="list-footer">
          {{item.ctime}}
          <div class="right">
            查看详情
            <i class="arrow-right"></i>
          </div>
        </div>
      </li>
    </scroller>
  </div>
</template>

<script>

export default {
  name : "myMessageData",
  data () {
      return {
        msg: '',
        state: '',
        allOrder: [],
        pageNow:1,
        modalTitle:'',
        modalContext:'',
        modalBottom:'',
        pageTotal:1,
        jsonStatue:
          {
            ok:'1',
            err:'-1',
          }
      }
  },
  created : function (){
  },
  mounted : function (){
      let that = this;
      that.state = that.$route.query.state;
  },
  computed : {
    code() {
        return this.$route.query.state;
    }
  },
  watch : {
    code(curVal) {
        this.state = curVal;
        this.allOrder = [];
        this.pageNow = 1;
        this.pageTotal = 1;
        this.$refs.myscroller.finishInfinite(false);
    }
  },
  methods : {
      refresh: function (done) {
        var self = this;
        setTimeout(function(){
        self.$getDataWithUrl('/user','/message/page/1.view',{"category":self.state},response=>{
          self.allOrder = [];
          self.pageTotal = response.data.context.pages;
          if(response.data.code==self.jsonStatue.ok) {
            self.allOrder = response.data.context.records;
          }
        },'get');
          done()
        }, 1500);
      },
      infinite: function (done) {
        let that = this;
        if (that.pageNow > that.pageTotal) {
            done(true)
          return;
        } else {
          that.$getDataWithUrl('/user','/message/page/'+that.pageNow+'.view',{"category":that.state},response=>{
          that.pageTotal = response.data.context.pages;
          that.pageNow++;
          setTimeout(function(){
            for(let i=0;i<response.data.context.records.length;i++){
              that.allOrder.push(response.data.context.records[i]);
            }
            that.$refs.myscroller.resize();
            done();
          }, 1500);
        },'get');

        }


      },
  }
}

</script>

<style lang="less" scoped>
  #myMessageData{
    max-width: 60rem;
    margin:0 auto;
    .list-main{
      width:92%;
      padding:.6rem 1%;
      height:auto;
      margin:0 auto;
      background:#fff;
      border-radius:.4rem;
      margin-bottom:1rem;
    }
    .list-content{
      color: #999;
    }
    .list-footer{
      margin-top:.4rem;
      border-top: .1rem solid #e5e5e5;
      color: #999;
      display:flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-top: .3rem;
      .right{
        width: 5.4rem;
        display:flex;
        align-items: center;
        justify-content: space-between;
      }
      i.arrow-right{
        display:block;
        width:1rem;
        height:1rem;
        background: url('../../../static/icons/svg/icon-leftright_gray.svg') center center no-repeat;
        background-size: 90%;
      }
    }
  }
</style>

```

