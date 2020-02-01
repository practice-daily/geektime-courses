import React, { Component } from 'react'
import { Table, Button } from 'antd'

import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import QueryForm from './QueryForm'
import getColumns from './columns'
import {
  EmployeeInfo,
  EmployeeRequest,
  EmployeeResponse,
  CreateRequest,
  UpdateRequest,
  DeleteRequest
} from '../interface/employee'

import InfoModal from './InfoModal'

import { getEmployee, createEmployee, updateEmployee, deleteEmployee } from '../redux/employee'

interface Props {
  employeeList: EmployeeResponse;
  onGetEmployee(param: EmployeeRequest, callback: () => void): void;
  onCreateEmployee(param: CreateRequest, callback: () => void): void;
  onUpdateEmployee(param: UpdateRequest, callback: () => void): void;
  onDeleteEmployee(param: DeleteRequest): void;
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
      edit: false,
      rowData: {}
    })
  }

  handleCancel = () => {
    this.setState({
      showModal: false,
    })
  }

  handleUpdate = (record: EmployeeInfo) => {
    this.setState({
      showModal: true,
      edit: true,
      rowData: record
    })
  }

  handleDelete = (param: DeleteRequest) => {
    this.props.onDeleteEmployee(param)
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
        <Table
          columns={getColumns(this.handleUpdate, this.handleDelete)}
          dataSource={employeeList}
        />
        <code>{JSON.stringify(this.state.rowData)}</code>
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
  onUpdateEmployee: updateEmployee,
  onDeleteEmployee: deleteEmployee,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Employee)
