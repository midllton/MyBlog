<template>
<div class="container">
  <BreadVue :type1="data.type1" :type2="data.type2"></BreadVue>
  <div class="title">
    <div class="mainTitle">{{data.title}}</div>
    <div class="info">
      <span class="iconfont icon-rili"></span><span class="time">{{time}}</span>
      <span class="iconfont icon-chakan"></span><span class="view">{{data.view}} Views</span>
      <span class="iconfont icon-like"></span><span class="like">{{data.like}} Likes</span>
    </div>
  </div>
  <div class="content" v-html="data.text"></div>
</div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import BreadVue from './Bread.vue'
const store = useStore()
const route = useRoute()
const data = ref({})
const num = ref(0)
const state = ref([])
const time = ref('')

num.value = route.params.id
state.value = store.state.articles
data.value = state.value[num.value - 1]
const date = new Date(parseInt(data.value.time))
time.value = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate()
</script>

<style lang="less" scoped>
.title{
  width: 100%;
  height: 80px;
  border-radius: 10px;
  background-color: white;
  .mainTitle{
    width: 100%;
    height: 55px;
    text-align: center;
    font-size: 25px;
    padding-top: 5px;
  }
  .info{
    width: 100%;
    height: 25px;
    text-align: center;
    .time, .view, .like{
      margin-left: 5px;
      margin-right: 15px;
    }
  }
}
.content{
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #fff;
  /deep/ p{
    margin-bottom: 15px;
  }
}
</style>
