<template>
  <div class="login">
    <p>注册</p>
    <div class="main">
      <span class="iconfont icon-youxiang"></span>
      <input v-model="userName" type="text" placeholder="请输入邮箱" class="mail" :class="{showname:n1}" @blur="verifyMail">
      <span class="verifyn" :class="{shown:n1}">* 请输入正确的邮箱地址</span>
      <span class="iconfont icon-mima"></span>
      <input v-model="password" type="text" placeholder="请输入密码" class="pwd" :class="{showname:n2}" @blur="verifyPwd">
      <span class="verifyp" :class="{showp:n2}">* 请输入包含数字和字母的6~12位密码</span>
      <span class="iconfont icon-username"></span>
      <input v-model="name" type="text" placeholder="请输入用户名" class="name" :class="{showname:n2}" @blur="verifyPwd">
      <span class="verifyp" :class="{showp:n2}">* 请输入包含数字和字母的6~12位密码</span>
      <span class="iconfont icon-phone"></span>
      <input v-model="num" type="text" placeholder="请输入手机号" class="num" :class="{showname:n2}" @blur="verifyPwd">
      <span class="verifyp" :class="{showp:n2}">* 请输入包含数字和字母的6~12位密码</span>
      <button @click="login" type="submit">登录</button>
      <div class="forget"><input type="checkbox"><a href="">服务条款与隐私政策</a></div>
      <div class="register">已经拥有账户？<router-link to="login" href="">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userName = ref('')
const password = ref('')
const n1 = ref(false)
const n2 = ref(false)

const verifyMail = () => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/ // 邮箱验证
  console.log(userName.value)
  if (reg.test(userName.value)) {
    n1.value = false
  } else {
    n1.value = true
  }
}

const verifyPwd = () => {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/ // 密码至少包含 数字和英文，长度6-12
  // console.log(userName.value)
  if (reg.test(password.value)) {
    n2.value = false
  } else {
    n2.value = true
  }
}

const login = () => {
  const data = { username: userName.value, password: password.value }
  console.log(data)
}
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 400px;
  height: 445px;
  margin: 0 auto;
  margin-top: 70px;
  border-radius: 8px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .2);
  background-color: rgb(255, 255, 255);
  z-index: 0;
  p {
    position: absolute;
    width: 50px;
    height: 40px;
    font-size: 20px;
    font-weight: 500;
    top: 20px;
    left: 175px;
  }

  .mail,
  .pwd,
  .name,
  .num {
    width: 350px;
    height: 40px;
    padding-left: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .mail {
    position: absolute;
    left: 25px;
    top: 70px;
  }

  .pwd {
    position: absolute;
    left: 25px;
    top: 135px;
  }

  .name {
    position: absolute;
    left: 25px;
    top: 200px;
  }

  .num {
    position: absolute;
    left: 25px;
    top: 265px;
  }

  .icon-youxiang {
    position: absolute;
    top: 79px;
    left: 30px;
    color: #ccc;
    font-size: 18px;
    z-index: 9;
  }

  .icon-mima {
    position: absolute;
    top: 145px;
    left: 30px;
    color: #ccc;
    font-size: 16px;
    z-index: 9;
  }
  .icon-username {
    position: absolute;
    top: 210px;
    left: 30px;
    color: #ccc;
    font-size: 16px;
    z-index: 9;
  }
  .icon-phone {
    position: absolute;
    top: 275px;
    left: 30px;
    color: #ccc;
    font-size: 16px;
    z-index: 9;
  }

  button {
    position: absolute;
    top: 332px;
    left: 25px;
    border: none;
    border-radius: 5px;
    width: 350px;
    height: 40px;
    font-size: 18px;
    color: #fff;
    background-color: #2d8cf0;
  }

  .forget {
    position: absolute;
    top: 385px;
    left: 135px;
    input {
      -webkit-appearance: auto;
      margin-right: 5px;
    }
    a {
      color: #2d8cf0;
    }
  }

  .register {
    position: absolute;
    top: 411px;
    left: 140px;

    a {
      color: #2d8cf0;
    }
  }

  .verifyn {
    position: absolute;
    top: 111px;
    left: 25px;
    color: red;
    opacity: 0;
  }

  .verifyp {
    position: absolute;
    top: 175px;
    left: 25px;
    color: red;
    opacity: 0;
  }

  .shown {
    opacity: 1;
  }

  .showp {
    opacity: 1;
  }

  .showname {
    border: 1px solid red;
  }

  .showpwd {
    border: 1px solid red;
  }
}
</style>
