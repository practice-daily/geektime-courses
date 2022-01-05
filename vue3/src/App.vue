<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'

// import VueRouterLink from './router/vue-router/router-link.vue'
// import VueRouterView from './router/vue-router/router-view.vue'
</script>

<template>
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
  <!-- <vue-router-link to="/">Home</vue-router-link>
  <vue-router-link to="/about">About</vue-router-link> -->

  <!-- 页面切换动画的时候，要求路由组件必须要有个根元素包裹，不然动画不生效的。 -->
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <!-- <vue-router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </vue-router-view> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
