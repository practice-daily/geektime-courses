import React, { Component } from 'react'
import { Modal, Form, Input, Select, DatePicker, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import moment from 'moment'

import { EmployeeInfo, CreateRequest, UpdateRequest } from '../interface/employee'

const { Option } = Select

interface Props extends FormComponentProps {
  showModal: boolean;
  edit: boolean;
  rowData: Partial<EmployeeInfo>;
  handleCandel(): void;
  createData(param: CreateRequest, callback: () => void): void;
  updateData(param: UpdateRequest, callback: () => void): void;
}

interface State {
  confirmLoading: boolean;
}

class InfoModal extends Component<Props, State> {
  state: State = {
    confirmLoading: false,
  }

  handleConfirm = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log(values)
        return
      }
      this.setState({
        confirmLoading: true,
      })
      let param = this.props.form.getFieldsValue()
      param.hireDate = param.hireDate.format('YYYY-MM-DD')
      if (!this.props.edit) {
        this.props.createData(param as CreateRequest, this.close)
      } else {
        param.id = this.props.rowData.id
        this.props.updateData(param as UpdateRequest, this.close)
      }
    })
  }

  close = () => {
    this.setState({
      confirmLoading: false
    })
    this.props.handleCandel()
  }

  render() {
    const { showModal, edit, handleCandel } = this.props
    const { getFieldDecorator } = this.props.form
    const { name, departmentId, hireDate, levelId } = this.props.rowData
    const title = !edit ? '添加新员工' : '修改员工'
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span:24 },
        sm: { span:20 }
      }
    }
    return (
      <Modal
        title={title}
        visible={showModal}
        onOk={this.handleConfirm}
        onCancel={handleCandel}
        confirmLoading={this.state.confirmLoading}
      >
        <Form {...formItemLayout}>
          <Form.Item label="员工名">
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{ required: true, whitespace: true, message: '请输入员工名' }]
            })(
              <Input
                prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0, .25)'}}></Icon>}
                placeholder="请输入员工名"
                allowClear
              />
            )}
          </Form.Item>
          <Form.Item label="部门">
            {getFieldDecorator('departmentId', {
              initialValue: departmentId,
              rules: [{ required: true, message: '请选择部门' }]
            })(
              <Select placeholder="部门">
                <Option value={1}>技术部</Option>
                <Option value={2}>产品部</Option>
                <Option value={3}>市场部</Option>
                <Option value={4}>运营部</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="入职日期">
            {getFieldDecorator('hireDate', {
              initialValue: hireDate ? moment(hireDate) : undefined,
              rules: [{ required: true, message: '请选择入职日期' }]
            })(
              <DatePicker
                placeholder="入职日期"
              />
            )}
          </Form.Item>
          <Form.Item label="职级">
            {getFieldDecorator('levelId', {
              initialValue: levelId,
              rules: [{ required: true, message: '请选择职级' }]
            })(
              <Select
                placeholder="职级"
                allowClear
              >
                <Option value={1}>1级</Option>
                <Option value={2}>2级</Option>
                <Option value={3}>3级</Option>
                <Option value={4}>4级</Option>
                <Option value={5}>5级</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item><code>{JSON.stringify(this.props.rowData)}</code></Form.Item>
        </Form>
      </Modal>
    )
  }
}

const WrapInfoModal = Form.create<Props>({
  name: 'employee_info'
})(InfoModal)

export default WrapInfoModal
