<template>
<div class="container">
  <div class="item">
    <div class="up">
      <div class="img"><img src="@/assets/images/20220909_191452.jpg" alt="" /></div>
      <div class="text">
        <div class="title"><div class="tag">{{articleType[data.type1 - 1].children[data.type2 - 1].subName}}</div><div class="maintitle">{{data.title}}</div></div>
        <div class="content" v-html="data.text"></div>
      </div>
    </div>
    <div class="down">
      <div class="left">
        <span class="iconfont icon-rili"></span><div class="date">{{time}}</div>
        <span class="iconfont icon-chakan"></span><div class="views"><span>{{data.view}}</span>Views</div>
        <span class="iconfont icon-like"></span><div class="likes"><span>{{data.like}}</span>Likes</div>
      </div>
      <div class="right" @click="navTo(num)" :class="{show:flag}" @mouseenter="showArticle(true)" @mouseleave="showArticle(false)">
        阅读全文<span class="iconfont icon-jinrujiantouxiao"></span>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// import request from '@/utils/api'
import { ref, defineProps, reactive } from 'vue'
const data = ref({})
const time = ref('')
const router = useRouter()
const flag = ref(false)
const state = ref([])
const store = useStore()

const props = defineProps({
  num: {
    type: Number
  }
})
state.value = store.state.articles
data.value = state.value[props.num - 1]
const date = new Date(parseInt(data.value.time))
time.value = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate()
const articleType = reactive([
  { id: 1, name: '技术', children: [{ subID: 1, subName: '英语' }, { subID: 2, subName: '计算机基础' }, { subID: 3, subName: '行业基础' }, { subID: 4, subName: '行业通用' }] },
  { id: 2, name: '读书', children: [{ subID: 1, subName: '诗词' }, { subID: 2, subName: '历史' }, { subID: 3, subName: '小说' }, { subID: 4, subName: '其他阅读' }] },
  { id: 3, name: '研究', children: [{ subID: 1, subName: '写作' }, { subID: 2, subName: '区块链' }, { subID: 3, subName: '其他研究' }] }
])

const navTo = (data) => {
  router.push('/article/' + data)
}

const showArticle = (data) => {
  flag.value = data
}
// onMounted(async (num) => {
//   data.value = await request('getArticle/' + num, 'get')
//   // console.log(data.value)
//   const date = new Date(parseInt(data.value.time))
//   time.value = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1) + '-' + date.getDate()
//   type.value = articleType[data.value.type1 - 1].children[data.value.type2 - 1].subName
// })
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
        color: orange;
        line-height: 45px;
        // background-color: skyblue;
        .iconfont{
          font-size: 10px;
          margin-left: 5px;
        }
      }
      .show{
        color: rgb(163, 163, 241);
        cursor: pointer;
      }
    }
  }
</style>
