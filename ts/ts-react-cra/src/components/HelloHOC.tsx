import React, { Component } from 'react'
import HelloClass from './HelloClass'
import { Spin } from 'antd'

interface Loading {
  loading: boolean;
}

function HelloHOC<P>(WrappedComponent: React.ComponentType<P>) {
  // & 交叉类型
  return class extends Component<P & Loading> {
    render () {
      const { loading, ...props } = this.props
      // 注意：被包装组件的默认属性不能被传递到高阶组件，需要将默认属性改为可选属性
      return loading ? <Spin /> : <WrappedComponent {...props as P} />
    }
  }
}

export default HelloHOC(HelloClass)
