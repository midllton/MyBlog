<template>
<div class="container">
  <BreadVue :type1="num" :type2="parseInt(path[1])"></BreadVue>
  <articleItemVue v-for="n in articles.length" :key="n" :num="articles[n - 1].a_id" :data="articles[n - 1]"></articleItemVue>
</div>
</template>

<script setup>
import BreadVue from '@/components/Bread.vue'
import articleItemVue from '@/components/articleItem.vue'
import request from '@/utils/api'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const num = ref(-1)
const route = useRoute()
const articles = ref([])
const path = ref([])

watch(() => route.fullPath, async () => {
  path.value = route.path.split('/').filter(d => d)
  if (path.value[0] === 'it') { num.value = 1 }
  if (path.value[0] === 'book') { num.value = 2 }
  if (path.value[0] === 'research') { num.value = 3 }
  const data = await request('getType2/' + num.value + '/' + path.value[1], 'post')
  articles.value = data.filter(d => d) // 去掉数组中的假值
}, { immediate: true })

// onBeforeMount(async () => {
//   if (route.path === '/it') { num.value = 1 }
//   if (route.path === '/book') { num.value = 2 }
//   if (route.path === '/research') { num.value = 3 }
//   console.log(num.value)
//   const data = await request('getType1/' + num.value, 'post')
//   articles.value = data.filter(d => d)
//   console.log(data)
// })
</script>

<style lang="less" scoped>
</style>
