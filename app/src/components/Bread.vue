<template>
<div class="container">
  <div class="bread">
    <span @click="toIndex">首页</span>
    <span class="iconfont icon-jiantou"></span>
    <span @click="toType1(type1)">{{articleType[type1 -1].name}}</span>
    <span v-if="type2" class="iconfont icon-jiantou"></span>
    <span v-if="type2" @click="toType2(type1, type2)">{{articleType[type1 -1].children[type2 -1].subName}}</span>
  </div>
</div>
</template>

<script setup>
import { reactive, defineProps } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
defineProps({
  type1: { type: Number },
  type2: { type: Number }
})
const articleType = reactive([
  { id: 1, name: '技术', src: '/', children: [{ subID: 1, subName: '英语' }, { subID: 2, subName: '计算机基础' }, { subID: 3, subName: '行业基础' }, { subID: 4, subName: '行业通用' }] },
  { id: 2, name: '读书', src: '/book', children: [{ subID: 1, subName: '诗词' }, { subID: 2, subName: '历史' }, { subID: 3, subName: '小说' }, { subID: 4, subName: '其他阅读' }] },
  { id: 3, name: '研究', src: '/research', children: [{ subID: 1, subName: '写作' }, { subID: 2, subName: '区块链' }, { subID: 3, subName: '其他研究' }] }
])

const toIndex = () => {
  router.push('/')
}
const toType1 = (data) => {
  router.push(articleType[data - 1].src)
}
const toType2 = (data1, data2) => {
  router.push(articleType[data1 - 1].src + '/' + data2)
}
</script>

<style lang="less" scoped>
.bread{
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  color: #1976D2;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px 0;
  .iconfont{
    font-size: 10px;
    padding: 0 5px;
    color: #777;
  }
}
</style>
