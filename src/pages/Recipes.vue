<template>
<card-layout pageName='Minhas Receitas' urlFoto='marmitas.jpeg'>
    <spinner v-if="showSpinner" />
    <div class="row justify-end" v-else>
        <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
            <search />
        </div>
    </div>
    <div class="row justify-center">
        <div v-show="!recipes.data[0]">
            <p class="text-h5">Nenhuma receita encontrada!</p>
        </div>
        <div class="col-lg-3 col-md-5 col-sm-12 col-xs-12" v-for="recipe in recipes.data" :key="recipe.id">
            <q-card class="my-card q-mt-md recipes" >
                <q-img :src="recipe.thumb ? recipe.thumb : noRecipeFoto" :ratio="1" />

                <q-card-section>
                    <div class="text-overline text-orange-9">Serve {{recipe.yield}} porções</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">{{recipe.name}}</div>
                    <div class="text-caption text-grey">
                        {{recipe.description}}
                    </div>
                </q-card-section>

                <q-card-actions>
                    <q-btn flat color="primary" label="Visualizar" :to="{name: 'receita', params: { id: recipe.id }}">
                        <q-tooltip>
                            Visualizar receita
                        </q-tooltip>
                    </q-btn>
                    <q-btn flat color="red" label='Deletar' @click="getRecipeId(recipe.id)">
                        <q-tooltip>
                            Deletar receita
                        </q-tooltip>
                    </q-btn>

                    <q-space />

                    <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" @click="expanded = !expanded" />
                </q-card-actions>

                <q-slide-transition>
                    <div v-show="expanded">
                        <q-separator />
                        <q-card-section class="text-subitle2">
                            Tempo de preparo : {{recipe.preparation_time}}
                        </q-card-section>
                    </div>
                </q-slide-transition>
            </q-card>
        </div>
    </div>
    <div class="row justify-center" v-show="!showSpinner">
        <div class="q-pa-lg ">
            <q-pagination size="15px" v-model="current" color="dark" :max="recipes.last_page ? recipes.last_page : 8" boundary-links @click="changePage()" />
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
</template>

<script>
import {
  mapState
} from 'vuex'
import Search from '../components/Search.vue'

export default {
  components: {
    Search
  },
  name: 'minhas-receitas',
  data () {
    return {
      expanded: false,
      current: 1,
      max: 6,
      confirm: false,
      idDel: '',
      noRecipeFoto: require('../assets/norecipe.jpeg')
    }
  },
  computed: {
    ...mapState('recipes', ['recipes', 'showSpinner'])

  },
  mounted () {
    this.$store.dispatch('recipes/getRecipes')
  },
  methods: {
    changePage () {
      this.$store.dispatch('recipes/changePage', this.current)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    async deleteRecipe () {
      await this.$store.dispatch('recipes/deleteRecipe', this.idDel)
      this.changePage()
      this.$q.notify({
        message: 'Receita deletada com sucesso!',
        icon: 'done',
        color: 'orange',
        position: 'top-right'
      })
    },
    getRecipeId (id) {
      this.idDel = id
      this.confirm = true
    }
  }

}
</script>

<style scoped>
.recipes {
    width: 95%;
}
</style>
