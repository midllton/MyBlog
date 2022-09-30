<template>
  <div class="article">
    <div class="title">
        <h3>文章名称</h3>
        <input type="text" v-model="title" placeholder="输入文章名称"/>
    </div>
    <div class="writer">
        <h3>文章作者</h3>
        <input type="text" v-model="writer" placeholder="输入文章作者"/>
    </div>
    <div class="type">
        <h3>文章分类</h3>
        <select v-model="type">
            <option v-for="item in articleType" :key="item.uid">{{ item.name }}</option>
        </select>
    </div>
    <div class="tag">
        <h3>文章小标签</h3>
        <input type="text" v-model="tag" placeholder="使用空格进行分割"/>
    </div>
    <!--文章详情-->
    <div class="content">
        <h3 style="text-align: left">文章详情</h3>
        <vue3-tinymce v-model="text" :setting="state.setting" />
        <br> <br>
        <Button v-on:click="submission">提交</Button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import request from '@/utils/api'
import Vue3Tinymce from '@jsdawn/vue3-tinymce'
const state = reactive({ setting: { width: 800, height: 800 } }) // editor 配置项 editor 高度
const title = ref('')
const writer = ref('')
const type = ref('')
const tag = ref([])
const text = ref('')
const articleType = reactive([
  { uid: 1, name: '英语' },
  { uid: 2, name: '计算机基础' },
  { uid: 3, name: '行业基础' },
  { uid: 4, name: '行业通用' },
  { uid: 5, name: '诗词' },
  { uid: 6, name: '历史' },
  { uid: 7, name: '小说' },
  { uid: 8, name: '读书·其他' },
  { uid: 9, name: '写作' },
  { uid: 10, name: '区块链' },
  { uid: 11, name: '研究·其他' }
])
const submission = () => {
  const data = {
    article: {
      title: title.value,
      writer: writer.value,
      text: text.value,
      type: type.value,
      tag: [tag.value]
    }
  }
  // console.log(data)
  request('admin/setArticle', 'post', data)
  title.value = ''
  writer.value = ''
  text.value = ''
  type.value = ''
  tag.value = []
}
</script>

<style lang="less" scoped>
  .article {
    position: relative;
    color: black;
    .title input, .writer input, .type select, .tag input{
      width: 300px;
      height: 40px;
      border-radius: 5px;
    }
    .title{
      position: absolute;
      top: 10px;
      left: 100px;
    }
    .writer{
      position: absolute;
      top: 10px;
      left: 450px;
    }
    .type{
      position: absolute;
      top: 70px;
      left: 100px;
    }
    .tag{
      position: absolute;
      top: 70px;
      left: 450px;
    }
    .content{
      position: absolute;
      top: 130px;
      left: 100px;
      button{
        width: 50px;
        height: 30px;
        color: white;
        border: none;
        border-radius: 5px;
        background-color: black;
      }
    }
  }
</style>
