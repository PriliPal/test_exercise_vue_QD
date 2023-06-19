<template>
  <header-navigate/>
  <router-view class="container"/>
</template>

<script>
import HeaderNavigate from '@/components/HeaderNavigate.vue'

export default {
 name: 'App',

  components: {
    HeaderNavigate,
  }
}
</script>

<style>

</style>
