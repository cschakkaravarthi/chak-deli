import React, { FC } from 'react';
import { VariousContentModel } from '../shared/types/contentTypes';
declare type Props = {
    employeesServiceList?: VariousContentModel[];
    fetchEmployee?: <T>() => T;
};
export declare const EmployeeServices: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=EmployeeServices.d.ts.map