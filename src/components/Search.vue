<template>
<q-input filled bottom-slots v-model="search" label="Pesquisar" :dense="true"  @keydown.esc="onReset()" @keypress.enter="doSearch()">
    <template v-slot:after>
        <q-btn round dense flat icon="send" @click="doSearch()"   />
    </template>
</q-input>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      search: ''
    }
  },
  methods: {
    doSearch () {
      this.$store.dispatch('recipes/getRecipes', this.search)
    },
    onReset () {
      this.$store.dispatch('recipes/getRecipes')
      this.search = ''
    }
  }

}
</script>

<style>

</style>
