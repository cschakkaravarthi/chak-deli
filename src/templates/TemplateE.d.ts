import React, { FC } from 'react';
import { Department } from '../shared/models/Department.model';
import UserInfoModel from '../shared/models/UserInfo.model';
import { TemplateIdsModel } from '../shared/models/Template.model';
declare type Props = {
    content: Department;
    contentIds: TemplateIdsModel;
    departmentContacts?: UserInfoModel[];
    fetchUsersByEmail?: (email: string) => void;
};
export declare const Template: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, "content" | "contentIds" | "departmentContacts">>;
export default _default;
//# sourceMappingURL=TemplateE.d.ts.map