<template>
  <div class="article_writer">
    <div class="item">
        <h3>文章名称</h3>
        <input v-model="title" style="width: 300px" placeholder="输入文章名称"/>
    </div>
    <div class="item">
        <h3>文章作者</h3>
        <input v-model="writer" style="width: 300px" placeholder="输入文章作者"/>
    </div>
    <div class="item">
        <h3>文章分类</h3>
        <select v-model="type" style="width:300px">
            <option v-for="item in articleType" :value="item.uid" :key="item.uid">{{ item.name }}</Option>
        </select>
    </div>
    <div class="item">
        <h3>文章小标签</h3>
        <input v-model="tag" style="width: 300px" placeholder="使用空格进行分割"/>
    </div>
    <!--文章详情-->
    <div>
        <h3 style="text-align: left">文章详情</h3>
        <vue3-tinymce v-model="text" :setting="state.setting" />
        <br> <br>
        <Button v-on:click="submission">提交</Button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import request from '@/utils/api'
import Vue3Tinymce from '@jsdawn/vue3-tinymce'
const state = reactive({ setting: { height: 400 } }) // editor 配置项 editor 高度
const title = ref('')
const writer = ref('')
const type = ref('')
const tag = ref('')
const text = ref('')
const articleType = reactive([])
onMounted(async () => {
  const data = await request('users/user/getArticleTyple', 'get')
  console.log(data)
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
