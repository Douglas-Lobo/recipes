<template>
<div class="q-pa-lg">
    <q-card class="my-card" bordered>
        <q-parallax :src="foto" :height="200" class='dimmed text-center' >
          <div class="text-h3 text-white above-overlay text-white">{{pageName}}</div>
        </q-parallax>
        <q-card-section>
            <slot> </slot>
        </q-card-section>
    </q-card>
</div>
</template>

<script>
export default {
  props: {
    urlFoto: { type: String, required: true },
    pageName: { type: String, required: true }
  },
  computed: {
    foto () {
      return require('../assets/' + this.urlFoto)
    }
  }
}
</script>
<style>
.above-overlay{
  z-index: 2;
}

</style>
