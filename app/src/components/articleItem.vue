<template>
<div class="item">
  <div class="up">
    <div class="img"><img src="@/assets/images/20220909_191452.jpg" alt="" /></div>
    <div class="text">
      <div class="title"><div class="tag">{{data.type}}</div><div class="maintitle">{{data.title}}</div></div>
      <div class="content" v-html="data.text"></div>
    </div>
  </div>
  <div class="down">
    <div class="left">
      <span class="iconfont icon-rili"></span><div class="date">2022-09-26</div>
      <span class="iconfont icon-pinglun"></span><div class="comments"><span>1230</span>Comments</div>
      <span class="iconfont icon-chakan"></span><div class="views"><span>23240</span>Views</div>
      <span class="iconfont icon-like"></span><div class="likes"><span>235360</span>Likes</div>
    </div>
    <div class="right">
      阅读全文<span class="iconfont icon-jinrujiantouxiao"></span>
    </div>
  </div>
</div>
</template>

<script setup>
import request from '@/utils/api'
import { ref, onMounted, defineProps } from 'vue'
const data = ref({})

defineProps({
  num: {
    type: Number
  }
})

onMounted(async (num = 1) => {
  data.value = await request('getArticle/' + num, 'get')
  console.log(num)
  console.log(data)
})
</script>

<style lang="less" scoped>
  .item{
    position: relative;
    width: 700px;
    height: 220px;
    margin-top: 15px;
    border-radius: 5px;
    background-color: #fff;
    .up{
      width: 700px;
      height: 175px;
      // background-color: skyblue;
      .img{
        width: 260px;
        height: 175px;
        padding: 15px;
        // background-color: aqua;
      }
      .text{
        position: absolute;
        width: 440px;
        height: 175px;
        left: 260px;
        top: 5px;
        // background-color: rgb(255, 0, 55);
        .title{
          display: flex;
          align-items: center;
          // position: absolute;
          width: 440px;
          // min-width: 0;
          height: 35px;
          // background-color: #bfa;
          .maintitle{
            float: left;
            font-size: 20px;
            white-space: nowrap; //溢出不换行
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
          }
          .tag{
            float: left;
            // left: 15px;
            height: 20px;
            line-height: 20px;
            padding: 0 3px;
            margin-right: 5px;
            border-radius: 5px;
            font-size: 12px;
            color: white;
            background-color: red;
            white-space: nowrap;
          }
        }
        .content{
          position: absolute;
          // padding: 10px 0;
          width: 410px;
          height: 140px;
          top: 40px;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          // background-color: aqua;
        }
      }
    }
    .down{
      position: relative;
      display: flex;
      align-items: bottom;
      width: 700px;
      height: 45px;
      .left{
        position: absolute;
        left: 0;
        top: 20px;
        width: 600px;
        height: 45px;
        // background-color: #bfa;
        .iconfont{
          float: left;
          margin-right: 3px;
        }
        .date{
          float: left;
          margin-right: 10px;
        }
        .comments{
          float: left;
          margin-right: 10px;
          span{
            margin-right: 3px;
          }
        }
        .views{
          float: left;
          margin-right: 10px;
          span{
            margin-right: 3px;
          }
        }
        .likes{
          float: left;
          margin-right: 10px;
          span{
            margin-right: 3px;
          }
        }
      }
      .right{
        position: absolute;
        right: 0;
        top: 5px;
        width: 100px;
        height: 45px;
        line-height: 45px;
        // background-color: skyblue;
        .iconfont{
          font-size: 10px;
          margin-left: 5px;
        }
      }
    }
  }
</style>
