<template>
<div>
    <card-layout :pageName='recipe.name ? recipe.name : "Receita"' urlFoto="ovos.jpeg">

        <spinner v-if="showSpinner" />
        <div class="row q-gutter-lg" v-else>

            <div class="col-lg-4 col-xs-11 text-center">
                <q-card class="my-card" flat bordered>
                    <Carousel :imgs='recipe.photos' :edit='false' />
                    <q-card-section>
                        <q-card-actions align="center">
                            <q-btn flat round color="red" icon="delete_forever" @click="confirm = true">
                                <q-tooltip>
                                    Deletar receita
                                </q-tooltip>
                            </q-btn>
                            <q-btn flat round color="primary" icon="create" :to="{name: 'editar-receita', params: {'id' : id} }">
                                <q-tooltip>
                                    Editar Receita
                                </q-tooltip>
                            </q-btn>
                        </q-card-actions>
                    </q-card-section>
                </q-card>

                <q-card class="my-card q-mt-sm" flat bordered>
                    <q-card-section>
                        <q-icon name="alarm" class="text-orange" style="font-size: 32px;" /> {{recipe.preparation_time}}
                        <q-icon name="rice_bowl" class="text-orange q-ml-lg" style="font-size: 32px;" /> {{recipe.yield}} porções
                      <div class="row justify-center q-gutter-sm q-mt-sm">
                        <q-badge  v-for="categorie in recipe.categories" :key="categorie.id" rounded color="orange" :label="categorie.name" />
                      </div>

                    </q-card-section>

                </q-card>

            </div>
            <div class="col-lg-7">
                <q-card class="my-card" flat bordered>
                    <p class="text-h5 text-center text-orange">
                        <q-icon name="import_contacts" class="text-orange" style="font-size: 32px;" /> Ingredientes</p>
                    <q-card-section class="text-justify" :inner-html.prop="recipe.ingredients | addJumpLine" />
                    <q-separator class="q-mb-md q-mt-md" />
                    <p class="text-h5 text-center text-orange">
                        <q-icon name="assignment" class="text-orange" style="font-size: 32px;" /> Modo de preparo</p>
                    <q-card-section class="text-justify" v-html="recipe.preparation_mode" />

                </q-card>

            </div>
        </div>

        <q-dialog v-model="confirm">
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete_forever" color="red" text-color="white" />
                    <span class="q-ml-md">Deseja deletar esta receita?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Voltar" color="primary" v-close-popup />
                    <q-btn flat label="Deletar" color="primary" v-close-popup @click="deleteRecipe()" />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </card-layout>
    <Relateds :recipes='relatedsRecipes.data' />
</div>
</template>

<script>
import Carousel from '../components/Carousel'
import Relateds from '../components/Relateds.vue'
import {
  mapState
} from 'vuex'
export default {
  name: 'receita',
  components: {
    Carousel,
    Relateds
  },
  props: ['id'],
  data () {
    return {
      confirm: false
    }
  },
  watch: {
    id: async function (newId) {
      await this.$store.dispatch('recipes/getRecipe', newId)
      await this.$store.dispatch('recipes/setRelatedsRecipes', {
        categories: this.getCategoriesId(this.recipe.categories),
        recipe_id: this.id
      })
    }
  },
  async mounted () {
    await this.$store.dispatch('recipes/getRecipe', this.id)
    await this.$store.dispatch('recipes/setRelatedsRecipes', {
      categories: this.getCategoriesId(this.recipe.categories),
      recipe_id: this.id
    })
  },
  computed: {
    ...mapState('recipes', ['recipe', 'showSpinner', 'relatedsRecipes'])

  },
  methods: {
    async deleteRecipe () {
      await this.$store.dispatch('recipes/deleteRecipe', this.recipe.id)
      this.$router.push({
        name: 'home'
      })
      this.$q.notify({
        message: 'Receita deletada com sucesso!',
        icon: 'done',
        color: 'orange',
        position: 'top-right'
      })
    },
    getCategoriesId (categories) {
      const arr = []
      categories.forEach(function (item, index) {
        arr[index] = item.id
      })
      return arr
    }
  },
  filters: {
    addJumpLine (value) {
      return value.replaceAll('\n', '</br></br>')
    }
  }
}
</script>

<style>

</style>
