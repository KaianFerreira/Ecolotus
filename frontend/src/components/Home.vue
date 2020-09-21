<template>
  <section v-if="loaded" style="width: 100%">
    <div class="menu grow d-flex justify-space-between align-center">
      <div class="title pointer" @click="$router.push('/')">ECOLOTUS</div>
      <div class="actions pointer" @click="drawer = !drawer">
        <v-icon color="white" large>mdi-menu</v-icon>
      </div>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style="position:fixed"
    >
      <v-list-item v-if="user">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <div class="pa-2" v-else>
        <v-btn block text @click="$router.push('/me/login')">Entrar/registrar-se</v-btn>
      </div>
      <v-divider></v-divider>

      <v-list dense v-if="user">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view class="router-view" style="margin-top: 70px"></router-view>
  </section>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    data () {
      return {
        drawer: false,
        items: [
          {
            title: 'Home',
            icon: 'mdi-home'
          },
          {
            title: 'Perfil',
            icon: 'mdi-account-circle'
          },
          {
            title: 'Criar publicação',
            icon: 'mdi-plus'
          }
        ]
      }
    },
    computed: {
      ...mapState(['user', 'loaded'])
    }
  }
</script>
<style lang="scss" scoped>
  .menu {
    position: fixed;
    z-index: 1;
    padding: 0 16px;
    width: 100%;
    height: 70px;
    background: rgb(57,192,184);
    background: linear-gradient(90deg, rgba(57,192,184,1) 0%, rgba(123,209,108,1) 100%);
    .title {
      font-family: 'dosis' !important;
      font-size: 24px !important;
      color: white;
    }
  }
  .pointer {
    cursor: pointer;
  }
  .router-view {
    width: 100%;
  }
</style>