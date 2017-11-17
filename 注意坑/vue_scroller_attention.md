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

