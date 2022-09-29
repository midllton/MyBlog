<template>
  <div class="main">
    <div class="container">
      <div class="nav">
        <ul>
          <li v-for="(item) in menu" :key="item.id"  class="navItem" @mouseleave="showNav(-1)">
            <div :class="{show:showNavNum===item.id}" @mouseenter="showNav(item.id)" @click="navTo(item.src)">
              {{ item.name }}<span v-if="item.children" class="iconfont icon-arrow-down"></span>
            </div>
            <div>
              <ul v-show="item.children" class="navSubItem" :class="{showSub:showNavNum===item.id}">
                <li
                v-for="(value) in item.children"
                :key="value.subID"
                :class="{show:showSubNum===value.subID}"
                @mouseenter="showSub(value.subID)"
                @mouseleave="showSub(-1)"
                @click="subNavTo(item.src, value.subID)"
                >{{value.name}}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="login">
        <span :class="{show:flag1}" @mouseenter="showLogin(true)" @mouseleave="showLogin(false)">登录</span>/<span :class="{show:flag2}" @mouseenter="showRegister(true)" @mouseleave="showRegister(false)">注册</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/api'

const menu = ref([])
const showNavNum = ref(-1)
const showSubNum = ref(-1)
const flag1 = ref(false)
const flag2 = ref(false)
const router = useRouter()

const showNav = (num) => {
  showNavNum.value = num
}

const showSub = (num) => {
  showSubNum.value = num
}

const showLogin = (data) => {
  flag1.value = data
}

const showRegister = (data) => {
  flag2.value = data
}

const navTo = (data) => {
  router.push(data)
}

const subNavTo = (val1, val2) => {
  router.push(val1 + '/' + val2)
}

onMounted(async () => {
  const data = await request('getNavMenu', 'get')
  menu.value = data
  // console.log(menu.value)
})
</script>

<style lang="less" scoped>
.main{
  height: 40px;
  background-color: #666;
  .container{
    position: relative;
    height: 40px;
    // background-color: #ccc;
    .nav{
      position: absolute;
      left: 10px;
      width: 840px;
      z-index: 9;
      .navItem{
        float: left;
        height: 40px;
        width: 140px;
        line-height: 40px;
        color: white;
        font-size: 18px;
        .iconfont{
          margin-left: 5px;
          font-size: 18px;
        }
      }
      .navSubItem{
        opacity: 0;
        visibility: hidden;
        transform: translateX(-30px);
        width: 100px;
        height: 160px;
        font-size: 15px;
        text-align: center;
        border-radius: 5px;
        box-shadow: 5px 3px 5px rgba(0, 0, 0, .2);
        background-color: #666;
      }
      .showSub{
        opacity: 1;
        visibility: visible;
        transition: opacity .5s ease-in;
      }
    }
    .login{
      position: absolute;
      right: 10px;
      width: 184px;
      height: 40px;
      line-height: 40px;
      color: white;
      text-align: right;
      font-size: 18px;
      // background-color: aqua;
      span{
        padding: 0 5px;
      }
    }
    .show{
      color: rgb(163, 163, 241);
      cursor: pointer;
    }
  }
}
</style>
