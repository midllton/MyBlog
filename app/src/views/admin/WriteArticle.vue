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
      <div class="type1">
        <h3>一级分类</h3>
        <select v-model="type1">
            <option v-for="item in articleType" :key="item.id" :value="item.id">{{ item.name }}</option>
        </select>
      </div>
      <div class="type2">
        <h3>二级分类</h3>
        <select v-model="type2">
          <template v-if="type1">
            <option v-for="item in articleType[type1-1].children" :key="item.subID" :value="item.subID">{{ item.subName }}</option>
          </template>
        </select>
      </div>
    </div>
    <div class="tag">
        <h3>文章小标签</h3>
        <input type="text" placeholder="使用空格进行分割"/>
    </div>
    <!--文章详情-->
    <div class="content">
        <h3 style="text-align: left">文章详情</h3>
        <vue3-tinymce v-model="text" :setting="state.setting" />
        <br> <br>
        <button v-on:click="submission">提交</button>
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
const type1 = ref(0)
const type2 = ref(0)
const text = ref('')
const articleType = reactive([
  { id: 1, name: '技术', children: [{ subID: 1, subName: '英语' }, { subID: 2, subName: '计算机基础' }, { subID: 3, subName: '行业基础' }, { subID: 4, subName: '行业通用' }] },
  { id: 2, name: '读书', children: [{ subID: 1, subName: '诗词' }, { subID: 2, subName: '历史' }, { subID: 3, subName: '小说' }, { subID: 4, subName: '其他阅读' }] },
  { id: 3, name: '研究', children: [{ subID: 1, subName: '写作' }, { subID: 2, subName: '区块链' }, { subID: 3, subName: '其他研究' }] }
])
const submission = () => {
  const data = {
    article: {
      title: title.value,
      writer: writer.value,
      text: text.value,
      type1: type1.value,
      type2: type2.value
    }
  }
  request('admin/setArticle', 'post', data)
  title.value = ''
  writer.value = ''
  text.value = ''
  type1.value = 0
  type2.value = 0
}
</script>

<style lang="less" scoped>
  .article {
    position: relative;
    color: black;
    .title input, .writer input{
      width: 300px;
      height: 30px;
      border-radius: 5px;
      margin-top: 5px;
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
      width: 650px;
      top: 75px;
      left: 100px;
      select{
        border: none;
      }
      .type1{
        float: left;
        select{
          width: 300px;
          height: 30px;
          margin-top: 5px;
          border-radius: 5px;
        }
      }
      .type2{
        float: left;
        margin-left: 50px;
        select{
          width: 300px;
          height: 30px;
          margin-top: 5px;
          border-radius: 5px;
        }
      }
    }
    .tag{
      position: absolute;
      top: 140px;
      left: 100px;
      input{
        width: 650px;
        height: 30px;
        margin-top: 5px;
        border-radius: 5px;
      }
    }
    .content{
      position: absolute;
      top: 210px;
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
