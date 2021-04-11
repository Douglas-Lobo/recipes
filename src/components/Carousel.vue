<template>
<div class="q-pa-md">
    <q-carousel swipeable animated arrows v-model="slide" infinite>
      <template v-if="imgs.length">
            <q-carousel-slide v-for="(img, index) in imgs" :key="index" :name="index + 1" :img-src="img.image">
                <q-btn flat round color="red" icon="delete_forever" @click="delImg(img.id, img.recipe_id)" v-show="edit">
                    <q-tooltip>
                        Deletar foto
                    </q-tooltip>
                </q-btn>
            </q-carousel-slide>
      </template>
             <q-carousel-slide v-else :name="1" :img-src="noRecipeFoto" />

            <template v-slot:control>
                <q-carousel-control color='primary' position="bottom-right" :offset="[18, 18]" />
            </template>
    </q-carousel>
</div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    imgs: {
      type: Array,
      required: true
    },
    edit: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      slide: 1,
      noRecipeFoto: require('../assets/norecipe.jpeg')
    }
  },
  methods: {
    async delImg (imgId, recipeId) {
      await this.$store.dispatch('recipes/delImg', imgId)
      await this.$store.dispatch('recipes/getRecipe', recipeId)
    }
  }
}
</script>
