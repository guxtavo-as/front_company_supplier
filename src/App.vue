<template lang="pug">
v-app#crudCS
  div
    Header
    router-view
</template>

<script>
import Header from './components/header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      
    }
  },
}
</script>

<style>
  
</style>
