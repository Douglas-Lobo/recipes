<template>
<div class="q-pr-lg q-pl-lg q-pb-lg">
    <q-card class="my-card">
        <q-card-section>
            <p class="text-h4 text-center text-orange">
                Receitas Relacionadas</p>
            <div class="row justify-center">
                <div v-show="!recipes.length">
                    <p class="text-h6">Nenhuma por enquanto :(</p>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12" v-for="recipe in recipes" :key="recipe.id">
                    <q-card class="my-card q-mt-md recipes" flat bordered>
                        <q-img :src="recipe.thumb ? recipe.thumb : 'https://images.pexels.com/photos/951334/pexels-photo-951334.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'" :ratio="1" />

                        <q-card-section>
                            <div class="text-overline text-orange-9">Serve {{recipe.yield}} porções</div>
                            <div class="text-h5 q-mt-sm q-mb-xs">{{recipe.name}}</div>
                        </q-card-section>
                        <q-card-actions>
                            <q-btn flat color="primary" label="Visualizar" :to="{name: 'receita', params: { id: recipe.id }}">
                                <q-tooltip>
                                    Visualizar receita
                                </q-tooltip>
                            </q-btn>
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </q-card-section>
    </q-card>

</div>
</template>

<script>
export default {
  name: 'receitas-relacionadas',
  props: {
    recipes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.recipes {
    width: 95%;
}
</style>
