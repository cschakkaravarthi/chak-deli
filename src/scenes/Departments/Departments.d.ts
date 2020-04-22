import React, { FC } from 'react';
import { Department as DepartmentModel } from '../../shared/models/Department.model';
declare type Props = {
    departments?: DepartmentModel[];
    fetchDepartments?: () => void;
};
export declare const Departments: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, "departments">>;
export default _default;
//# sourceMappingURL=Departments.d.ts.map