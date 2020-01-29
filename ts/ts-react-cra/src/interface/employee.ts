export interface EmployeeRequest {
  name: string;
  departmentId: number | undefined;
}

export interface EmployeeInfo {
  id: number;
  key: number;
  name: string;
  department: string;
  departmentId: number;
  hireDate: string;
  level: string;
  levelId: number;
}

export type EmployeeResponse = EmployeeInfo[] | undefined

export interface CreateRequest {
  name: string;
  departmentId: number;
  hireDate: string;
  levelId: number;
}

export interface CreateResponse {
  id: number;
  key: number;
}

export interface UpdateRequest extends CreateRequest {
  id: number;
}