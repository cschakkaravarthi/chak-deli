import { Department } from '../models/Department.model';
export declare const LOAD_DEPARTMENT_BY_ID = "LOAD_DEPARTMENT_BY_ID";
export declare const FETCH_DEPARTMENT_BY_ID = "FETCH_DEPARTMENT_BY_ID";
export declare const LOAD_DEPARTMENTS = "LOAD_DEPARTMENTS";
export declare const FETCH_DEPARTMENTS = "FETCH_DEPARTMENTS";
export declare const FETCH_CONTACTS = "FETCH_CONTACTS";
export interface DepartmentsState {
    departments: Department[];
}
export interface LoadDepartmentByIdAction {
    type: typeof LOAD_DEPARTMENT_BY_ID;
    department: Department;
}
export interface LoadDepartmentsAction {
    type: typeof LOAD_DEPARTMENTS;
    departments: Department[];
}
//# sourceMappingURL=departmentTypes.d.ts.map