<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Button type="primary" shape="circle" icon="ios-search"></Button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Button } from 'view-ui-plus'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    Button
  }
}
</script>
