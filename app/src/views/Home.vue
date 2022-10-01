<template>
  <articleItemVue v-for="(item) in num" :key="item.id" :num="item.id" :data="state[item.id - 1]"></articleItemVue>
</template>

<script setup>
import articleItemVue from '@/components/articleItem.vue'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
const state = ref([])
const store = useStore()
const num = reactive([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])
if (!sessionStorage.getItem('articles')) {
  store.dispatch('getArticle')
}
state.value = store.state.articles
</script>

<style lang="less" scoped>
</style>
