import React, { Component } from 'react'
import { Table } from 'antd'

import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import QueryForm from './QueryForm'
import { employeeColumns } from './columns'
import { EmployeeRequest, EmployeeResponse } from '../interface/employee'

import { getEmployee } from '../redux/employee'

interface Props {
  employeeList: EmployeeResponse;
  onGetEmployee(param: EmployeeRequest, callback: () => void): void;
}

// interface State {
//   employee: EmployeeResponse
// }

class Employee extends Component<Props> {
  // state: State = {
  //   employee: undefined
  // }
  // getLength = () => {
  //   let total: number = 0
  //   if (typeof this.state.employee !== 'undefined') {
  //     total = this.state.employee.length
  //   }
  //   return `共有 ${total} 名员工`
  // }
  // setEmployee = (employee: EmployeeResponse) => {
  //   this.setState({
  //     employee
  //   })
  // }

  render() {
    const { employeeList, onGetEmployee } = this.props
    return (
      <>
        {/* <QueryForm onDataChange={this.setEmployee} />
        {this.getLength()}
        <Table columns={employeeColumns} dataSource={this.state.employee} /> */}
        <QueryForm getData={onGetEmployee} />
        <Table columns={employeeColumns} dataSource={employeeList} />
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({
  employeeList: state.employee.employeeList
})
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onGetEmployee: getEmployee
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employee)
