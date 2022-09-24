<template>
  <div class="container">
    <div class="nav">
      <div v-for="(item) in nav" :key="item.eName" :class="item.eName">
        <div
        @click="change"
        :class="{active:item.eName === activeName}"
        @mouseenter="mouseenter(item.eName)"
        @mouseleave="activeName=''"
        >
          <span :class="{show:item.show}" class="iconfont icon-folder-fill"></span>
          <span :class="{show:!item.show}" class="iconfont icon-folder-open-fill"></span>
          {{item.cName}}
          <span :class="{show:item.show}" class="iconfont icon-arrow-down"></span>
          <span :class="{show:!item.show}" class="iconfont icon-arrow-up"></span>
        </div>
        <ul :class="{show:item.show}">
          <li
          v-for="(newItem, index) in item.text"
          :key="index"
          :class="{active:newItem === activeName}"
          @mouseenter="mouseenter(newItem)"
          @mouseleave="activeName=''"
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

const nav = reactive([
  { eName: 'content', show: true, cName: '内容管理', text: ['所有文章', '写文章', '分类', '标签'] },
  { eName: 'user', show: true, cName: '用户管理', text: ['新增用户', '活跃用户'] },
  { eName: 'analysis', show: true, cName: '统计分析', text: ['浏览数', '收藏数'] }
])
const activeName = ref('')

const mouseenter = (data) => {
  activeName.value = data
}

const change = (e) => {
  const name = e.target.parentElement.className
  if (name === 'content') {
    if (nav[0].show === true) {
      nav[1].show = true
      nav[2].show = true
      nav[0].show = !nav[0].show
    } else {
      nav[0].show = !nav[0].show
    }
  }
  if (name === 'user') {
    if (nav[1].show === true) {
      nav[0].show = true
      nav[2].show = true
      nav[1].show = !nav[1].show
    } else {
      nav[1].show = !nav[1].show
    }
  }
  if (name === 'analysis') {
    if (nav[2].show === true) {
      nav[0].show = true
      nav[1].show = true
      nav[2].show = !nav[2].show
    } else {
      nav[2].show = !nav[2].show
    }
  }
}
</script>

<style lang="less" scoped>
.nav{
  width: 230px;
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
</style>
