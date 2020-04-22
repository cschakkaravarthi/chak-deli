import React, { FC } from 'react';
import { match } from 'react-router';
import { Office as OfficeModel } from '../../shared/models/Office.model';
import Link from '../../shared/models/Link.model';
import PeopleModel from '../../shared/models/People.model';
declare type Props = {
    match?: match;
    links?: Link[];
    facilities?: Link[];
    office?: OfficeModel;
    isLastPage: boolean;
    officeError?: boolean;
    people?: PeopleModel[];
    clearPeople?: () => void;
    facilitiesError?: boolean;
    clearOfficeAction?: () => void;
    clearLinksAction?: () => void;
    fetchFacilities?: (drupalId?: number) => void;
    fetchOffice?: (officeId: string | number) => Promise<void>;
    fetchPeople?: <T>(sitecode: string, startsWith?: string, limit?: number) => T;
};
export declare const Office: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=Office.d.ts.map