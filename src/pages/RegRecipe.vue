<template>
<card-layout pageName='Cadastrar Receita' urlFoto='ovos.jpeg'>
    <q-form @submit="onSubmit()" class="row justify-around">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-gutter-md q-mb-md">

            <q-input filled v-model="form.name" label="Nome" :rules="[val => !!val || 'Coloque um nome para sua receita!']" />
            <q-select filled v-model="form.category" :options="categories" option-value="id" option-label="name" option-disable="inactive" multiple label="Categorias" :rules="[val => !!val.length || 'Selecine uma categoria pelo menos!']" />
            <q-input v-model="form.preparation_mode" filled type="textarea" label="Modo de preparo" :rules="[val => !!val || 'Escreva o modo de preparo!']" />
            <div class="row justify-around">
                <div class="col-lg-6 col-md-6 col-xs-12 q-gutter-xs">
                    <q-input v-model.number="form.yield" type="number" label='Porções' filled :rules="[val => !!val || 'Serve quantas porções?']" />
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12">
                    <q-input v-model="form.preparation_time" filled type="text" label='Tempo de preparo' :rules="[val => !!val || 'Fale o tempo de preparo!']" />
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 q-gutter-md">
            <q-input filled v-model="form.description" label="Descrição" :rules="[val => !!val || 'Adicione uma descrição!']" />
            <q-input @input="val => { form.files = val }" multiple filled type="file" hint="Imagens da receita" required />
            <q-input v-model="form.ingredients" filled type="textarea" label="Ingredientes" :rules="[val => !!val || 'Escreva os ingredientes!']" />
        </div>
        <q-btn type='submit' color="secondary" :loading="loading" class="full-width q-mt-lg" label="Cadastrar" />
    </q-form>
</card-layout>
</template>

<script>
import {
  mapState,
  mapGetters
} from 'vuex'

export default {
  name: 'CadastrarReceita',
  data () {
    return {
      form: {
        name: '',
        description: '',
        preparation_time: '',
        preparation_mode: '',
        ingredients: '',
        yield: '',
        category: [],
        files: []
      },
      loading: false
    }
  },
  async mounted () {
    await this.$store.dispatch('categories/setCategories')
  },
  computed: {
    ...mapState('categories', ['categories']),
    ...mapGetters('user', ['getUser'])
  },
  methods: {
    async onSubmit () {
      this.loading = true
      const fd = new FormData()
      fd.set('user_id', this.getUser.id)
      fd.set('name', this.form.name)
      fd.set('description', this.form.description)
      fd.set('preparation_time', this.form.preparation_time)
      fd.set('preparation_mode', this.form.preparation_mode)
      fd.set('ingredients', this.form.ingredients)
      fd.set('yield', this.form.yield)
      this.getCategoriesId(this.form.category).forEach(category => {
        fd.append('categories[]', category)
      })
      // Input file não é um array porem ele tem um dentro, por isso o uso da função Array.from do ECS6
      Array.from(this.form.files).forEach(file => {
        fd.append('photos[]', file)
      })

      await this.$store.dispatch('recipes/regRecipe', fd)

      this.$q.notify({
        message: 'Receita cadastrada com sucesso!',
        icon: 'done',
        color: 'orange',
        position: 'top-right'
      })

      this.$router.push({
        name: 'home'
      })

      this.loading = false
    },
    getCategoriesId (categories) {
      const arr = []
      categories.forEach(function (item, index) {
        arr[index] = item.id
      })
      return arr
    }
  }

}
</script>

<style scoped>
.overlay {
    background: rgba(39, 62, 84, 0.82);
    height: 100%;
    z-index: 2;
}
</style>
