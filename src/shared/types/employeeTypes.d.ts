import { VariousContentModel } from './contentTypes';
export declare const LOAD_EMPLOYEE_SERVICES = "LOAD_EMPLOYEE_SERVICES";
export declare const FETCH_EMPLOYEE_SERVICES = "FETCH_EMPLOYEE_SERVICES";
export interface EmployeeState {
    employees: VariousContentModel[];
}
export interface LoadEmployeeAction {
    type: typeof LOAD_EMPLOYEE_SERVICES;
    employees: VariousContentModel[];
}
//# sourceMappingURL=employeeTypes.d.ts.map