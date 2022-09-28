<template>
<div class="operate clearfix">
  <div class="all">
    <label><input type="checkbox"> 全选</label>
    <button>删除</button>
  </div>
  <button class="add" @click="addType">添加分类</button>
</div>
<div class="title clearfix">
  <div class="option"><input type="checkbox" v-model="checked"></div>
  <div>一级分类序号</div>
  <div>一级分类名</div>
  <div>二级分类序号</div>
  <div>二级分类名</div>
  <div>操作</div>
</div>
<div class="content clearfix">
  <div class="option"><input type="checkbox" v-model="checked"></div>
  <div>1</div>
  <div>技术</div>
  <div>1</div>
  <div>英语</div>
  <div><button>删除</button></div>
</div>
<div class="jump"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const checked = ref(false)
const router = useRouter()

const addType = () => {
  router.push('addType')
}
</script>

<style lang="less" scoped>
.operate{
  width: 780px;
  margin-bottom: 20px;
  .all{
    float: left;
  }
  .add{
    float: right;
    margin-right: 35px;
  }
  .all{
    label{
      margin-left: 4px;
    }
    input{
      width: 12px;
      height: 12px;
    }
  }
  button{
    background-color: rgba(0, 150, 255);
    margin-top: 10px;
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    color: white;
  }
}
.title{
  width: 780px;
  padding-bottom: 5px;
  margin-top: 10px;
  border-bottom: 1px solid #ccc;
  div{
    float: left;
    width: 152px;
    text-align: center;
  }
  .option{
    width: 20px;
    input{
      width: 12px;
      height: 12px;
    }
  }
}
.content{
  width: 780px;
  margin-top: 5px;
  border-bottom: 1px solid #ccc;
  div{
    float: left;
    width: 152px;
    text-align: center;
    margin-top: 5px;
  }
  .option{
    width: 20px;
    input{
      width: 12px;
      height: 12px;
    }
  }
  button{
    position: relative;
    border: none;
    border-radius: 3px;
    top: -3px;
    padding: 5px 10px;
    color: white;
    background-color: rgba(0, 150, 255);
  }
}
</style>
