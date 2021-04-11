<template>
<div id="q-app">
    <router-view />
</div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('user/getUser')
  }
}
</script>

<style>
body {
    background: #ECE9E6;
    background: -webkit-linear-gradient(to bottom, #FFFFFF, #ECE9E6);
    background: linear-gradient(to bottom, #FFFFFF, #ECE9E6);
}
</style>
