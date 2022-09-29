<template>
  <div class="main">
    <div class="nav">
      <ul>
        <li
        v-for="(item) in menu"
        :to="item.src"
        :key="item.id"
        :class="{show:item.id === num}"
        @mouseenter="isActive(item.id)"
        @mouseleave="isActive(item.id+10)"
        @click="nav(item.src)"
        >{{ item.name }}<span v-show="arrow(item.id)" class="iconfont icon-arrow-down"></span></li>
        <div>
          <router-link
          to="/login"
          class="login"
          :class="{show:flag1}"
          @mouseenter="loginShow(true)"
          @mouseleave="loginShow(false)"
          >登录</router-link> / <router-link
          to="/register"
          class="register"
          :class="{show:flag2}"
          @mouseenter="registerShow(true)"
          @mouseleave="registerShow(false)"
          >注册</router-link>
        </div>
      </ul>
    </div>
    <div class="it" :class="{itshow:num === 2 || (num === 12 && str === 'it')}" @mouseenter="isListActive('it')" @mouseleave="isListActive('')">
      <ul>
        <li>英语</li>
        <li>计算机基础</li>
        <li>行业通用</li>
        <li>行业专用</li>
      </ul>
    </div>
    <div class="book" :class="{bookshow:num === 3 || (num === 13 && str === 'book')}" @mouseenter="isListActive('book')" @mouseleave="isListActive('')">
      <ul>
        <li>小说</li>
        <li>诗词</li>
        <li>历史</li>
        <li>其他</li>
      </ul>
    </div>
    <div class="research" :class="{researchshow:num === 4 || (num === 14 && str === 'research')}" @mouseenter="isListActive('research')" @mouseleave="isListActive('')">
      <ul>
        <li>写作</li>
        <li>区块链</li>
        <li>其他</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const menu = ref([])
const num = ref(-1)
const str = ref('')
const flag1 = ref(false)
const flag2 = ref(false)

const isActive = (data) => {
  num.value = data
}

const isListActive = (data) => {
  str.value = data
}

const loginShow = (data) => {
  flag1.value = data
}

const registerShow = (data) => {
  flag2.value = data
}

const arrow = (data) => {
  if (data > 1 && data < 5) {
    return true
  }
}
const nav = (data) => {
  router.push(data)
}

onMounted(async () => {
  const data = await request('getNavMenu', 'get')
  menu.value = data
})
</script>

<style lang="less" scoped>
  .main{
    background-color: rgb(87, 87, 87);
    height: 50px;
    .nav{
      margin: 0 auto;
      width: 1024px;
      ul{
        display: flex;
        justify-content: space-around;
        width: 1024px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        // background-color: #bfa;
        .iconfont{
          margin-left: 5px;
        }
        .login , .register{
          color: #fff;
        }
        .show{
          color:rgb(163, 163, 241);
          cursor: pointer;
        }
      }
    }
    .it{
      opacity: 0;
      position: absolute;
      width: 100px;
      height: 150px;
      top: 60px;
      left: 265px;
      border-radius: 5px;
      box-shadow: 5px 3px 5px rgba(0, 0, 0, .2);
      background-color: rgb(87, 87, 87);
      z-index: 1;
      &::before{
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        top: -20px;
        left: 45px;
        border: 10px solid transparent;
        border-bottom: 10px solid rgb(87, 87, 87);
      }
      ul{
        display: flex;
        flex-direction: column;
        align-items: center;
        li{
          color: #fff;
          padding-top: 15px;
          &:hover{
            color:rgb(163, 163, 241);
            cursor: pointer;
          }
        }
      }
    }
    .itshow{
      opacity: 1;
      transition: opacity .8s;
    }
    .book{
      opacity: 0;
      position: absolute;
      width: 100px;
      height: 150px;
      top: 60px;
      left: 413px;
      border-radius: 5px;
      box-shadow: 5px 3px 5px rgba(0, 0, 0, .2);
      background-color: rgb(87, 87, 87);
      z-index: 1;
      &::before{
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        top: -20px;
        left: 45px;
        border: 10px solid transparent;
        border-bottom: 10px solid rgb(87, 87, 87);
      }
      ul{
        display: flex;
        flex-direction: column;
        align-items: center;
        li{
          color: #fff;
          padding-top: 15px;
          &:hover{
            color:rgb(163, 163, 241);
            cursor: pointer;
          }
        }
      }
    }
    .bookshow{
      opacity: 1;
      transition: opacity .8s;
    }
    .research{
      opacity: 0;
      position: absolute;
      width: 100px;
      height: 120px;
      top: 60px;
      left: 560px;
      border-radius: 5px;
      box-shadow: 5px 3px 5px rgba(0, 0, 0, .2);
      background-color: rgb(87, 87, 87);
      z-index: 1;
      &::before{
        content: '';
        display: block;
        position: absolute;
        width: 0;
        height: 0;
        top: -20px;
        left: 45px;
        border: 10px solid transparent;
        border-bottom: 10px solid rgb(87, 87, 87);
      }
      ul{
        display: flex;
        flex-direction: column;
        align-items: center;
        li{
          color: #fff;
          padding-top: 15px;
          &:hover{
            color:rgb(163, 163, 241);
            cursor: pointer;
          }
        }
      }
    }
    .researchshow{
      opacity: 1;
      transition: opacity .8s;
    }
  }
</style>
