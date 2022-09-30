<template>
  <!-- <div class="footer">
    <div v-for="(item) in footer" :key="item.name">{{item.name}}|{{item.src}}</div>
  </div> -->
  <div class="footer">
    <div class="container">
      <span>shenjixu版权所有</span>
      <span class="line"></span>
      <span><router-link to="/admin" class="admin" :class="{show:flag}" @mouseenter="showAdmin(true)" @mouseleave="showAdmin(false)">后台管理</router-link></span>
      <span class="line"></span>
      <a href="#">粤ICP备17092242号</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/api'

const footer = ref([])
const flag = ref(false)

const showAdmin = (data) => {
  flag.value = data
}

onMounted(async () => {
  const data = await request('getFooter', 'get')
  // console.log(data)
  footer.value = data
})
</script>

<style lang="less" scoped>
  .footer{
    height: 60px;
    background-color: #333;
    margin-top: 10px;
    .container{
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      color: #aaa;
      // background-color: #bfa;
      .admin{
        color: orange;
      }
      .line{
        // border-right: 1px solid black;
        width: 1px;
        height: 13px;
        margin: 0 10px;
        background-color: #aaa;
      }
    }
    .show{
      color: rgb(163, 163, 241);
      cursor: pointer;
    }
  }
</style>
