<template>
  <div class="container">
    <div class="nav">
      <div v-for="(item) in nav" :key="item.eName" :class="item.eName">
        <div
        :class="{active:item.eName === activeName}"
        @mouseenter="mouseenter(item.eName)"
        @mouseleave="activeName=''"
        >
          <span class="iconfont icon-folder-open-fill"></span>
          {{item.cName}}
          <span class="iconfont icon-arrow-up"></span>
        </div>
        <ul>
          <li
          v-for="(newItem, index) in item.text"
          :key="index"
          :class="{active:newItem === activeName}"
          @mouseenter="mouseenter(newItem)"
          @mouseleave="activeName=''"
          @click="navTo(index)"
          ><span class="iconfont icon-yuandianzhong"></span>{{newItem}}</li>
        </ul>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const nav = reactive([
  { eName: 'content', show: true, cName: '内容管理', text: ['所有文章', '写文章', '管理分类', '管理标签'] },
  { eName: 'user', show: true, cName: '用户管理', text: ['新增用户', '活跃用户'] },
  { eName: 'analysis', show: true, cName: '统计分析', text: ['浏览数', '收藏数'] }
])
const activeName = ref('')
const router = useRouter()

const mouseenter = (data) => {
  activeName.value = data
}

const navTo = (data) => {
  if (data === 1) {
    router.push('/admin/write')
  } else if (data === 2) {
    router.push('/admin/type')
  }
}
</script>

<style lang="less" scoped>
.nav{
  width: 230px;
  height: 1920px;
  background-color: #333;
  .content div, .user div, .analysis div{
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    font-size: 16px;
    // color: red;
  }
  li{
    color: #93b3c0;
    height: 40px;
    line-height: 30px;
    background-color: #50646d;
    padding: 5px 0;
  }
  .icon-folder-fill, .icon-folder-open-fill{
    margin-right: 10px;
  }
  .icon-yuandianzhong{
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
    margin: 0px 15px;
    // line-height: 100%;
  }
  .icon-arrow-down, .icon-arrow-up{
    display: inline-block;
    vertical-align: middle;
    margin-left: 80px;
    font-size: 18px;
  }
  .active{
    color: #fff;
    background-color: rgb(64, 138, 207);
  }
  .show{
    display: none;
  }
}
.main{
  position: absolute;
  top: 0;
  left: 244px;
}
</style>
