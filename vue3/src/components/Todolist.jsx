import { defineComponent, ref, withModifiers } from 'vue'

export default defineComponent({
  setup(props) {
    const title = ref('')
    const todos = ref([
      { title: '学习 Vue 3', done: true },
      { title: '睡觉', done: false }
    ])
    const addTodo = () => {
      if (!title.value) {
        alert('请输入')
        return
      }
      todos.value.push({
        title: title.value,
        done: false
      })
      title.value = ''
    }

    return () => (
      <>
        <input type="text" vModel={title.value} onKeyup={withModifiers(addTodo, ['enter'])} />
        <button onClick={addTodo}>add</button>
        <ul>
          {
            todos.value.length
            ? todos.value.map((todo, index) => (
                <li key={index}>
                  <input type="checkbox" vModel={todo.done} />
                  <span>{todo.title}</span>
                </li>
              ))
            : <li>暂无数据</li>
          }
        </ul>
      </>
    )
  }
})