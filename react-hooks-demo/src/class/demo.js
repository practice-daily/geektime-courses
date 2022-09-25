import React from "react";
import withWindowSize from './withWindowSize'

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      status: false
    }
  }

  componentDidMount() {
    console.log('class Demo: useEffect componentDidMount')
  }

  componentDidUpdate() {
    console.log('class Demo: useEffect componentDidUpdate')
  }

  handleCountClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  handleStatusClick = () => {
    this.setState({
      status: !this.state.status
    })
  }

  render() {
    console.log('class Demo: render', this)
    return <div>
      <p>You clicked {this.state.count} times. {this.state.status.toString()}</p>
      <button onClick={this.handleCountClick}>count</button>
      <button onClick={this.handleStatusClick}>status</button>
      <h2>利用高阶组件在 class 组件中使用 hook: {this.props.windowSize}</h2>
    </div>
  }
}

// export default Demo
export default withWindowSize(Demo)
