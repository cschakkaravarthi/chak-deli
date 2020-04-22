import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { LoadEmployeeAction } from '../types/employeeTypes';
import { VariousContentModel } from '../types/contentTypes';
export declare const loadEmployees: (employees: VariousContentModel[]) => LoadEmployeeAction;
export declare const fetchEmployee: () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
//# sourceMappingURL=employeeActions.d.ts.map