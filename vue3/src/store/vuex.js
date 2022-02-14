// 手写迷你 Vuex
import { reactive, inject } from 'vue'

const STORE_KEY = '__store__'

class Store {
  constructor(options) {
    this._state = reactive({
      data: options.state(),
    })
    this._mutations = options.mutations
  }

  install(app) {
    console.log('vuex install app:', app)
    console.log('vuex install this:', this)
    app.provide(STORE_KEY, this)
  }

  get state() {
    return this._state.data
  }

  commit = (type, payload) => {
    const entry = this._mutations[type]
    entry && entry(this.state, payload)
  }
}

function createStore(options) {
  return new Store(options)
}

function useStore() {
  return inject(STORE_KEY)
}

export { createStore, useStore }
