<template>
<q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-dark above">
        <q-toolbar>
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />

            <q-toolbar-title>
                Recipes
            </q-toolbar-title>

            <div>v1</div>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above :width="300" :breakpoint="400">
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
            <q-list padding>
                <router-link :to="{ name: 'home' }" class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable" clickable v-ripple active-class="active" exact>
                    <q-item-section avatar>
                        <q-icon name="house" />
                    </q-item-section>
                    <q-item-section>
                        Inicio
                    </q-item-section>

                </router-link>

                <router-link :to="{ name: 'cadastrar-receita' }" class="q-item q-item-type row no-wrap q-item--clickable q-link cursor-pointer q-focusable q-hoverable" clickable v-ripple active-class="active" exact>
                    <q-item-section avatar>
                        <q-icon name="add_box" />
                    </q-item-section>
                    <q-item-section>
                        Cadastrar receita
                    </q-item-section>

                </router-link>

                <q-btn :loading="loading" color="red" class="full-width fixed-bottom no-radius" label="Logout" icon-right="power_settings_new" @click="doLogout()"/>
            </q-list>

        </q-scroll-area>

        <q-img class="absolute-top dimmed text-center" :src="foto" style="height: 150px">
            <div class="absolute-bottom bg-transparent q-mb-lg">
                <q-avatar size="80px" class="q-mb-sm">
                    <img :src="getUser.user_photo.image" class="above-overlay">
                </q-avatar>
            </div>
                <div class="text-weight-bold above-overlay absolute-bottom bg-transparent ">{{getUser.name}}</div>
        </q-img>
    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>
</q-layout>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      loading: false,
      foto: require('../assets/tigela.jpeg')
    }
  },
  computed: {
    ...mapGetters('user', ['getUser'])

  },
  methods: {
    async doLogout () {
      this.loading = true
      await this.$store.dispatch('user/logout')
      setTimeout(() => {
        this.$router.push({ name: 'Login' })
        this.loading = false
        this.$q.notify({
          message: 'Deslogado com sucesso!',
          icon: 'done',
          color: 'green',
          position: 'top-right'
        })
      }, 1000)
    }

  }
}
</script>

<style scoped>
.active {
    color: #FF9800;
}

.no-radius {
    border-radius: 0%;
}

.above-overlay {
    z-index: 2;
}

.above {
    z-index: 3;
}
</style>
