<template>
  <Menu mode="horizontal" :theme="theme">
    <MenuItem name="1">
        <Icon type="ios-paper" />
        <router-link to="/" >{{index}}</router-link>
    </MenuItem>
    <MenuItem v-for="(item) in menu" :name="item.name" :key="item.name">
      <router-link :to="item.src">{{item.name}}</router-link>
    </MenuItem>
  </Menu>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '@/utils/api'
import { Menu, MenuItem, Icon } from 'view-ui-plus'

const menu = ref([])
const index = ref('shenjixu')
const theme = ref('light')

onMounted(async () => {
  const data = await request('getNavMenu', 'get')
  // console.log(data)
  menu.value = data
})
</script>

<style lang="less" scoped>
</style>
