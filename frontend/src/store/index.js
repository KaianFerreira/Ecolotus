import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, removeToken } from '../libs/token'
import { get as getUser } from '../api/user'

Vue.use(Vuex)

// const startTime = new Date()

export default new Vuex.Store({
  state: {
    loaded: false,
    user: null
  },
  mutations: {
    loaded (state, data) { state.loaded = data },
    user (state, data) { state.user = data }
  },
  actions: {
    loaded (store) {
      // const diff = (new Date()) - startTime
      // if has splash screen set the durantion here
      // const wait = 000 - diff < 0 ? 0 : 0000 - diff
      setTimeout(() => { store.commit('loaded', true) }, 0)
    },
    async signIn (store, data) {
      setToken(data.token)
      const userDetails = await getUser(data.user.id)
      store.commit('user', userDetails)
      store.dispatch('loaded')
    },
    signOut (store) {
      store.commit('user', null)
      removeToken()
      store.dispatch('loaded')
    },

  }
})
