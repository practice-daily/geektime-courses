import React from 'react'
import { Button, Divider, Popconfirm } from 'antd'
import { EmployeeInfo, DeleteRequest } from '../interface/employee'

const getColumns = (
	handleUpdate: (record: EmployeeInfo) => void,
	handleDelete: (param: DeleteRequest) => void,
) => {
	return [
		{
			title: 'id',
			dataIndex: 'id',
			key: 'id'
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '部门',
			dataIndex: 'department',
			key: 'department'
		},
		{
			title: '入职时间',
			dataIndex: 'hireDate',
			key: 'hireDate'
		},
		{
			title: '职级',
			dataIndex: 'level',
			key: 'level'
		},
		{
			title: '操作',
			key: 'action',
			render: (text: string, record: EmployeeInfo) => (
				<span>
					<Button size="small" icon="edit" onClick={() => handleUpdate(record)}>编辑</Button>
					<Divider type="vertical" />
					<Popconfirm
						title={`确定删除 ${record.name} 吗？`}
						onConfirm={() => handleDelete({ id: record.id})}
					>
						<Button size="small" type="danger" icon="delete">删除</Button>
					</Popconfirm>
				</span>
			)
		}
	]
}

export default getColumns
