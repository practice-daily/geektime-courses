import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    level: {
      type: Number,
      required: true
    }
  },
  // render(context) {
  //   console.log('render h:', context, this, context === this)
  //   return h(
  //     `h${this.$props.level}`,
  //     {},
  //     this.$slots.default()
  //   )
  // },

  // render(context) {
  //   console.log('render jsx:', context, this, context === this)
  //   const tag = `h${this.$props.level}`
  //   return <tag>{this.$slots.default()}</tag>
  // }

  // setup(props, context) {
  //   console.log('setup h', this, context)
  //   return () => h(
  //     `h${props.level}`,
  //     {},
  //     context.slots.default()
  //   )
  // }

  setup(props, { slots }) {
    console.log('setup jsx')
    const tag = `h${props.level}`
    return () => {
      console.log('setup jsx return')
      return <tag>{slots.default()}</tag>
    }
  },
})
