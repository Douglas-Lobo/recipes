<template>
<div class="row center bg">
    <q-card class="my-card col-xs-12 col-sm-7 col-md-5 col-lg-5" flat>
        <q-img class='' height="25rem" :src="foto">
            <!-- <p class="text-h2 text-white above-overlay text-white text-lg-center">Recipes</p> -->
        </q-img>
        <q-card-section>
            <div class="q-pt-sm">
                <q-form @submit.prevent="">
                    <q-input filled v-model.trim="form.username" label="Usuario" autofocus class="q-mb-sm" />
                    <q-input filled v-model.trim="form.password" label="Senha" type="password" class="q-mb-sm" />

                    <q-btn label="Login" type="submit" :loading="loading" color="dark" class="full-width q-mb-sm" @click="login" />
                    <!-- <q-btn label="Cadastrar" type="button" color="primary" flat class="full-width" /> -->
                </q-form>
            </div>
        </q-card-section>
    </q-card>
</div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  data () {
    return {
      form: {
        username: 'rosa',
        password: 'password'
      },
      loading: false,
      foto: require('../assets/tigela.jpeg')
    }
  },
  computed: {
    ...mapGetters('user', ['getLogged'])
  },
  methods: {
    async login () {
      this.loading = true
      await this.$store.dispatch('user/getToken', this.form)
      if (!this.$q.cookies.has('token')) {
        this.$q.notify({
          message: 'Login ou senha incorretos!',
          icon: 'error',
          color: 'red',
          position: 'top-right'
        })
      } else {
        this.$router.push({
          name: 'home'
        })
      }
      this.loading = false
    }
  }

}
</script>

<style>
.center {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center
}

.above-overlay {
    z-index: 2222222222222222222222222222222222222222222222;
}

.bg {
background: #E44D26;  /* fallback for old browsers */
background: -webkit-linear-gradient(to left, #F16529, #E44D26);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to left, #F16529, #E44D26); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.text-lg-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    padding: 0;
}
</style>
