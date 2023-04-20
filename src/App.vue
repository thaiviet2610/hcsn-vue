<template>
  <div class="container" >
    <TheSidebar></TheSidebar>
    <div class="body">
      <TheHeader></TheHeader>
      <TheMain></TheMain>
    </div>
    
  </div>
</template>

<script>
import TheMain from './layout/TheMain.vue'
import TheSidebar from './layout/TheSidebar.vue'
import TheHeader from './layout/TheHeader.vue';
export default {
  name: 'App',
  components: {
    TheMain,TheSidebar,
    TheHeader
  },
  methods: {
    
  },
}
</script>

<style>
@import url(./css/main.css);
</style>
