<template>
  <div class="article_writer">
    <div class="item">
        <h3>文章名称</h3>
        <Input v-model="title" style="width: 300px" placeholder="输入文章名称"/>
    </div>
    <div class="item">
        <h3>文章作者</h3>
        <Input v-model="writer" style="width: 300px" placeholder="输入文章作者"/>
    </div>
    <div class="item">
        <h3>文章分类</h3>
        <Select v-model="type" style="width:200px">
            <Option v-for="item in articleType" :value="item.uid" :key="item.uid">{{ item.name }}</Option>
        </Select>
    </div>
    <div class="item">
        <h3>文章小标签</h3>
        <Input v-model="tag" style="width: 300px" placeholder="使用空格进行分割"/>
    </div>
    <!--文章详情-->
    <div>
        <h3 style="text-align: left">文章详情</h3>
        <vue3-tinymce v-model="state.content" :setting="state.setting" />
        <br> <br>
        <Button v-on:click="submission">提交</Button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import Vue3Tinymce from '@jsdawn/vue3-tinymce'
const state = reactive({
  content: 'hello vue3-tinymce!',
  // editor 配置项
  setting: {
    height: 400 // editor 高度
  }
})
</script>

<style lang="less" scoped>
  .article_writer {
    color: black;
    padding: 40px 10vw 40px 10vw;
    text-align: left;
  }

  .article_writer .item {
      padding-bottom: 20px;
  }

  .article h2 {
      padding: 20px;
  }
</style>
