<template>
<div class="container">
  <div class="title">{{data.title}}</div>
  <div class="content"></div>
</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()
const data = ref({})
const num = ref(0)
const state = ref([])

num.value = route.params.id
store.dispatch('getArticle')
state.value = store.state.articles
data.value = state.value[num.value - 1]

</script>

<style lang="less" scoped>
</style>
