<template>
<div class="type">
  <div class="type1">
    <h3>一级分类：</h3>
    <select v-model="name">
      <option>技术</option>
      <option>读书</option>
      <option>研究</option>
    </select>
  </div>
  <div class="type2">
    <h3>二级分类：</h3>
    <input type="text" v-model="subName" placeholder="输入二级分类名称"/>
  </div>
  <button @click="submitType">提交</button>
</div>
</template>

<script setup>
import request from '@/utils/api'
import { ref, reactive } from 'vue'
let data = reactive({})
const name = ref('')
const subName = ref('')
const type = reactive([
  { id: 1, name: '', children: [] },
  { id: 2, name: '', children: [] },
  { id: 3, name: '', children: [] }
])
const submitType = async () => {
  if (name.value === '技术') {
    type[0].name = '技术'
    if (!type[0].children[0]) {
      data = { subID: 1, subName: subName.value }
      type[0].children.push(data)
      subName.value = ''
    } else {
      const newNum = type[0].children.length + 1
      data = { subID: newNum, subName: subName.value }
      type[0].children.push(data)
      subName.value = ''
    }
  } else if (name.value === '读书') {
    type[1].name = '读书'
    if (!type[1].children[0]) {
      data = { subID: 1, subName: subName.value }
      type[1].children.push(data)
      subName.value = ''
    } else {
      const newNum = type[1].children.length + 1
      data = { subID: newNum, subName: subName.value }
      type[1].children.push(data)
      subName.value = ''
    }
  } else {
    type[2].name = '研究'
    if (!type[2].children[0]) {
      data = { subID: 1, subName: subName.value }
      type[2].children.push(data)
      subName.value = ''
    } else {
      const newNum = type[2].children.length + 1
      data = { subID: newNum, subName: subName.value }
      type[2].children.push(data)
      subName.value = ''
    }
  }
  const submitData = JSON.stringify({ type })
  // console.log(submitData)
  await request('admin/setType', 'post', submitData)
}
</script>

<style lang="less" scoped>
  .type{
    margin-left: 20px;
    select{
      margin-left: 20px;
      width: 400px;
      height: 40px;
    }
    div{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 35px;
      input{
        margin-left: 20px;
        width: 400px;
        height: 40px;
      }
    }
    button{
      width: 500px;
      height: 50px;
      margin-top: 30px;
      border: none;
      border-radius: 10px;
      color: white;
      background-color: rgba(0, 150, 255) ;
    }
  }
</style>
