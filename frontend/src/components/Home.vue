<template>
  <section>
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
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

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
    <router-view></router-view>
  </section>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          {
            title: 'teste',
            icon: 'mdi-home'
          }
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .menu {
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
</style>