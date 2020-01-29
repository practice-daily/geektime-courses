import React, { Component } from 'react'
import { Table, Button } from 'antd'

import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import QueryForm from './QueryForm'
import { employeeColumns } from './columns'
import {
  EmployeeInfo,
  EmployeeRequest,
  EmployeeResponse,
  CreateRequest,
  UpdateRequest
} from '../interface/employee'

import InfoModal from './InfoModal'

import { getEmployee, createEmployee, updateEmployee } from '../redux/employee'

interface Props {
  employeeList: EmployeeResponse;
  onGetEmployee(param: EmployeeRequest, callback: () => void): void;
  onCreateEmployee(param: CreateRequest, callback: () => void): void;
  onUpdateEmployee(param: UpdateRequest, callback: () => void): void;
}

interface State {
  // employee: EmployeeResponse
  showModal: boolean;
  edit: boolean;
  rowData: Partial<EmployeeInfo>;
}

class Employee extends Component<Props, State> {
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

  state: State = {
    showModal: false,
    edit: false,
    rowData: {},
  }

  handleCreate = () => {
    this.setState({
      showModal: true,
    })
  }

  handleCancel = () => {
    this.setState({
      showModal: false,
    })
  }

  render() {
    const { employeeList, onGetEmployee, onCreateEmployee, onUpdateEmployee } = this.props
    return (
      <>
        {/* <QueryForm onDataChange={this.setEmployee} />
        {this.getLength()}
        <Table columns={employeeColumns} dataSource={this.state.employee} /> */}
        <QueryForm getData={onGetEmployee} />
        <div className="toolbar">
          <Button type="primary" icon="plus" onClick={this.handleCreate}>添加新员工</Button>
        </div>
        <InfoModal
          showModal={this.state.showModal}
          edit={this.state.edit}
          rowData={this.state.rowData}
          handleCandel={this.handleCancel}
          createData={onCreateEmployee}
          updateData={onUpdateEmployee}
        ></InfoModal>
        <Table columns={employeeColumns} dataSource={employeeList} />
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({
  employeeList: state.employee.employeeList
})
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onGetEmployee: getEmployee,
  onCreateEmployee: createEmployee,
  onUpdateEmployee: updateEmployee
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employee)
