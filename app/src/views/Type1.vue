<template>
<div class="container">
  <BreadVue :type1="num" :type2="0"></BreadVue>
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

watch(() => route.path, () => {
  const path = route.path.slice(1)
  if (path === 'it') { num.value = 1 }
  if (path === 'book') { num.value = 2 }
  if (path === 'research') { num.value = 3 }
  request('getType1/' + num.value, 'post').then(data => {
    articles.value = data
  })
}, { immediate: true })

// onMounted(async () => {
//   articles.value = await request('getType1/' + num.value, 'post')
// })
</script>

<style lang="less" scoped>
</style>
