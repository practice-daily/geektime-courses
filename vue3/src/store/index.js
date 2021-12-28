// import { createStore } from 'vuex'
import { createStore } from './vuex.js'

const store = createStore({
  state() {
    return {
      count: 666
    }
  },
  mutations: {
    add(state, payload = 1) {
      state.count += payload
    }
  }
})

export default store
