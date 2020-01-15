import React, { Component } from 'react'
import { Button } from 'antd'

interface Greeting {
  name: string;
  firstName?: string;
  lastName?: string;
}

interface State {
  count: number;
}

class HelloClass extends Component<Greeting, State> {
  state: State = {
    count: 0
  }

  static defaultProps = {
    firstName: '',
    lastName: ''
  }

  // btnClick(e: any) {
  //   console.log(e.target, this)
  //   this.setState({
  //     count: this.state.count + 1
  //   })
  // }

  btnClick = (e: any) => {
    console.log(e.target)
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      }
    })
  }

  render() {
  return <Button onClick={this.btnClick}>Hello {this.props.name} {this.state.count}</Button>
  }
}

export default HelloClass
