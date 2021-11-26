import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const userInfo = sessionStorage.getItem('user')
export default new Vuex.Store({
  state: {
    user: JSON.parse(userInfo)
  },
  mutations: {
    // 存储用户token
    SetUser (state, user) {
      state.user = user
      sessionStorage.setItem('user', JSON.stringify(user))
    }
  },
  actions: {
  },
  modules: {
  }
})
