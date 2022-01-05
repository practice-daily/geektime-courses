import { createStore } from 'vuex'
// import { createStore } from './vuex.js'

const store = createStore({
  state() {
    return {
      count: 666
    }
  },
  getters: {
    double(state) {
      return state.count * 2
    }
  },
  mutations: {
    add(state, payload = 1) {
      state.count += payload
    }
  },
  actions: {
    asyncAdd({ commit }, payload) {
      setTimeout(() => commit('add', payload), 1000)
    }
  }
})

export default store
