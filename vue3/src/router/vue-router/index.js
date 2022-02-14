// 手写迷你 vue-router
import { ref, inject } from 'vue'
import RouterLink from './router-link.vue'
import RouterView from './router-view.vue'

const ROUTER_KEY = '__router__'

class Router {
  constructor(options) {
    this.routes = options.routes
    this.history = options.history
    this.current = ref(this.history.url)

    this.history.bindEvents(() => {
      this.current.value = window.location.hash.slice(1)
    })
  }

  install(app) {
    app.provide(ROUTER_KEY, this)
    app.component(RouterLink.name, RouterLink)
    app.component(RouterView.name, RouterView)
  }
}

function createRouter(options) {
  return new Router(options)
}

function useRouter() {
  return inject(ROUTER_KEY)
}

function createWebHashHistory() {
  function bindEvents(fn) {
    window.addEventListener('hashchange', fn)
  }
  return {
    bindEvents,
    url: window.location.hash.slice(1) || '/',
  }
}

export {
  createRouter,
  createWebHashHistory,
  useRouter,
}
