import { LoadDepartmentByIdAction, LoadDepartmentsAction } from '../types/departmentTypes';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Department } from '../models/Department.model';
export declare const loadDepartmentById: (department: Department) => LoadDepartmentByIdAction;
export declare const fetchDepartmentById: (departmentId: number) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const loadDepartments: (departments: Department[]) => LoadDepartmentsAction;
export declare const fetchDepartments: () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
//# sourceMappingURL=departmentActions.d.ts.map