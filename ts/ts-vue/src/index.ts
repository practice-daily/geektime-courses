// let hello: string = 'TypeScript';
// document.getElementById('app').innerHTML = hello;

import Vue from 'vue'
import Hello from './components/Hello.vue'

// const app1 = new Vue({
//   el: '#app',
//   data: {
//     name: 'TypeScript!!'
//   },
//   template: '<div>Hello {{name}}</div>'
// })

const app2 = new Vue({
  el: '#app',
  components: {
    Hello
  },
  template: '<hello />'
})