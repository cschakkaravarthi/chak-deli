import React, { FC } from 'react';
import { Department as DepartmentModel } from '../../shared/models/Department.model';
import { match } from 'react-router';
declare type Props = {
    match?: match;
    departmentId?: number;
    department?: DepartmentModel;
    fetchDepartmentById?: (departmentId: number) => Promise<void>;
};
export declare const Department: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, "match" | "departmentId" | "department">>;
export default _default;
//# sourceMappingURL=Department.d.ts.map