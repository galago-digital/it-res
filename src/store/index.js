import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: null
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    addUser(state, user) {
      let id = Math.max(...state.users.map(u => u.id))
      state.users.push({ id: ++id, ...user })
    }
  },
  actions: {
    setUsers({ commit }, users) {
      commit('setUsers', users)
    },
    addUser({ commit }, user) {
      commit('addUser', user)
    }
  },
  getters: {
    users: s => s.users
  }
})
