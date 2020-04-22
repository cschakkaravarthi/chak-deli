import React, { FC } from 'react';
import { Department as DepartmentModel } from '../../shared/models/Department.model';
import { ContentCategorizedStorageModel, VariousContentModel } from '../../shared/types/contentTypes';
import { Page } from '../../shared/models/Page.model';
declare type Props = {
    content?: ContentCategorizedStorageModel;
    department?: DepartmentModel;
    page?: Page;
    departmentId: number;
    active?: number;
    fetchContent?: (filterId: string) => void;
    fetchDepartmentById?: (departmentId: number) => void;
    navItems?: VariousContentModel[];
};
export declare const DepartmentTopBar: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, "departmentId" | "department" | "page" | "content" | "active" | "navItems">>;
export default _default;
//# sourceMappingURL=DepartmentTopBar.d.ts.map