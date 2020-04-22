import React, { FC } from 'react';
import { Page as PageModel } from '../../shared/models/Page.model';
import { Department as DepartmentModel } from '../../shared/models/Department.model';
import { match } from 'react-router';
declare type Props = {
    match?: match;
    page?: PageModel;
    pages: PageModel[];
    department?: DepartmentModel;
    departmentId?: number;
    pageId?: number;
    fetchPages?: (categoryId: string) => void;
    fetchPageById?: (pageId: number) => Promise<void>;
    fetchDepartmentById?: (departmentId: number) => void;
};
export declare const Page: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, "match" | "fetchDepartmentById" | "departmentId" | "department" | "page" | "pages" | "pageId">>;
export default _default;
//# sourceMappingURL=Page.d.ts.map