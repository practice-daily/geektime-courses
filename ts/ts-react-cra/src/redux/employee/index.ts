import { Dispatch } from 'redux'
import _ from 'lodash'

import { get, post } from '../../utils/request'

import {
  GET_EMPLOYEE_URL,
  CREATE_EMPLOYEE_URL,
  UPDATE_EMPLOYEE_URL,
  DELETE_EMPLOYEE_URL,
} from '../../contants/urls'

import {
  GET_EMPLOYEE,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from '../../contants/actions'

import { department, level } from '../../contants/options'

import {
  EmployeeInfo,
  EmployeeRequest,
  EmployeeResponse,
  CreateRequest,
  UpdateRequest,
  DeleteRequest,
} from '../../interface/employee'

type State = Readonly<{
  employeeList: EmployeeResponse
}>

type Action = {
  type: string;
  payload: any;
}

const initialState: State = {
  employeeList: undefined
}

export function getEmployee(param: EmployeeRequest, callback: () => void) {
  return (dispatch: Dispatch) => {
    get(GET_EMPLOYEE_URL, param).then(res => {
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data
      })
      callback()
    })
  }
}

export function createEmployee(param: CreateRequest, callback: () => void) {
  return (dispatch: Dispatch) => {
    post(CREATE_EMPLOYEE_URL, param).then(res => {
      dispatch({
        type: CREATE_EMPLOYEE,
        payload: {
          name: param.name,
          deparmentId: param.departmentId,
          department: department[param.departmentId],
          levelId: param.levelId,
          level: level[param.levelId],
          hireDate: param.hireDate,
          ...res.data,
        }
      })
      callback()
    })
  }
}

export function updateEmployee(param: UpdateRequest, callback: () => void) {
  console.log(param)
  return (dispatch: Dispatch) => {
    post(UPDATE_EMPLOYEE_URL, param).then(res => {
      dispatch({
        type: UPDATE_EMPLOYEE,
        payload: param
      })
      callback()
    })
  }
}

export function deleteEmployee(param: DeleteRequest) {
  return (dispatch: Dispatch) => {
    post(DELETE_EMPLOYEE_URL, param).then(res => {
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: param
      })
    })
  }
}

export default (state = initialState, action: Action) => {
  switch(action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employeeList: action.payload
      }
    case CREATE_EMPLOYEE:
      return {
        ...state,
        employeeList: [
          action.payload,
          ...(state.employeeList as EmployeeInfo[])
        ]
      }
    case UPDATE_EMPLOYEE:
      const item: UpdateRequest = action.payload
      const index = state.employeeList!.findIndex(i => i.id === item.id)
      const updatedEmployee: EmployeeInfo = {
        id: item.id,
        key: item.id,
        name: item.name,
        departmentId: item.departmentId,
        department: department[item.departmentId],
        levelId: item.levelId,
        level: level[item.levelId],
        hireDate: item.hireDate
      }
      state.employeeList?.splice(index, 1, updatedEmployee)
      return {
        ...state,
      }
    case DELETE_EMPLOYEE:
      // const id = action.payload.id
      // const deleteIndex = state.employeeList!.findIndex(item => item.id === id)
      // state.employeeList?.splice(deleteIndex, 1)
      // console.log(id, deleteIndex, state.employeeList)
      // return {
      //   ...state,
      //   employeeList: state.employeeList
      // }
      const reduceList = [...(state.employeeList as EmployeeInfo[])]
      _.remove(reduceList, (item: EmployeeInfo) => {
        return item.id === action.payload.id
      })
      return {
        ...state,
        employeeList: reduceList
      }
    default:
      return state
  }
}
