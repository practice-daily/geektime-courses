import { Dispatch } from 'redux'

import { get, post } from '../../utils/request'

import {
  GET_EMPLOYEE_URL,
  CREATE_EMPLOYEE_URL,
} from '../../contants/urls'

import {
  GET_EMPLOYEE,
  CREATE_EMPLOYEE,
} from '../../contants/actions'

import { department, level } from '../../contants/options'

import {
  EmployeeInfo,
  EmployeeRequest,
  EmployeeResponse,
  CreateRequest,
  UpdateRequest,
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
  return null
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
    default:
      return state
  }
}
