<template>
  <div class="container" >
    <TheMenu></TheMenu>
    <div class="body">
      <TheHeader></TheHeader>
      <TheMain></TheMain>
    </div>
    
  </div>
</template>

<script>
import TheMain from './layout/TheMain.vue'
import TheMenu from './layout/TheMenu.vue'
import TheHeader from './layout/TheHeader.vue';
export default {
  name: 'App',
  components: {
    TheMain,TheMenu,
    TheHeader
  },
  methods: {
    
  },
}
</script>

<style>
@import url(./css/main.css);
</style>
