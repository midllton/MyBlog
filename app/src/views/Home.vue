<template>
  <articleItemVue v-for="(item) in num" :key="item.id" :num="item.id"></articleItemVue>
</template>

<script setup>
import articleItemVue from '@/components/articleItem.vue'
import { reactive } from 'vue'
const num = reactive([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])
</script>

<style lang="less" scoped>
</style>
