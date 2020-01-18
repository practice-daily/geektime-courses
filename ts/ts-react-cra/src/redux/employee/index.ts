import { Dispatch } from 'redux'

import { get } from '../../utils/request'

import {
  GET_EMPLOYEE_URL
} from '../../contants/urls'

import {
  GET_EMPLOYEE
} from '../../contants/actions'

import {
  EmployeeRequest,
  EmployeeResponse
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

export default (state = initialState, action: Action) => {
  switch(action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employeeList: action.payload
      }
    default:
      return state
  }
}
