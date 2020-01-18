import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { EmployeeRequest } from '../interface/employee'

import './index.css'

const { Option } = Select

interface Props extends FormComponentProps {
  // onDataChange(data: EmployeeResponse): void;
  getData(param: EmployeeRequest, callback: () => void): void;
}

class QueryForm extends Component<Props, EmployeeRequest> {
  state: EmployeeRequest = {
    name: '',
    departmentId: undefined
  }

  handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      name: e.currentTarget.value
    })
  }

  handleDepartmentChane = (value: number) => {
    this.setState({
      departmentId: value
    })
  }

  handleSubmit = () => {
    this.queryEmployee(this.state)
  }

  queryEmployee = (param: EmployeeRequest) => {
    console.log(param)
    // get(GET_EMPLOYEE_URL, param).then((response) => {
    //   console.log(response)
    //   this.props.onDataChange(response.data)
    // })
    this.props.getData(param, () => {})
  }

  componentDidMount() {
    this.queryEmployee(this.state)
  }

  render() {
    return (
      <Form layout="inline">
        <Form.Item>
          <Input
            placeholder="姓名"
            style={{ width: 120 }}
            allowClear
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </Form.Item>
        <Form.Item>
          <Select
            placeholder="部门"
            style={{ width: 120 }}
            allowClear
            value={this.state.departmentId}
            onChange={this.handleDepartmentChane}
          >
            <Option value={1}>技术部</Option>
            <Option value={2}>产品部</Option>
            <Option value={3}>市场部</Option>
            <Option value={4}>运营部</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.handleSubmit}>查询</Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedQueryForm = Form.create<Props>({
  name: 'query_form'
})(QueryForm)

export default WrappedQueryForm
