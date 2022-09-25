<template>
  <div class="login">
    <p>登录</p>
    <div class="main">
      <span class="iconfont icon-youxiang"></span>
      <input v-model="userName" type="text" placeholder="请输入邮箱" class="mail" :class="{showname:n1}" @blur="verifyMail">
      <span class="verifyn" :class="{shown:n1}">* 请输入正确的邮箱地址</span>
      <span class="iconfont icon-mima"></span>
      <input v-model="password" type="text" placeholder="请输入密码" class="pwd" :class="{showname:n2}" @blur="verifyPwd">
      <span class="verifyp" :class="{showp:n2}">* 请输入包含数字和字母的6~12位密码</span>
      <button @click="login" type="submit">登录</button>
      <div class="forget"><a href="">忘记密码？</a></div>
      <div class="register">尚未拥有账户？<router-link to="register" href="">注册</router-link>
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
  height: 315px;
  margin: 0 auto;
  margin-top: 100px;
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
  .pwd {
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

  button {
    position: absolute;
    top: 202px;
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
    top: 255px;
    left: 170px;

    a {
      color: #2d8cf0;
    }
  }

  .register {
    position: absolute;
    top: 281px;
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
