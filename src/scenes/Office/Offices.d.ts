import React, { FC } from 'react';
import OfficesPeople, { OfficePeopleCategory } from '../../shared/models/OfficesPeople.model';
import Facet from '../../shared/models/Facet.model';
declare type Props = {
    facets?: Facet;
    selectedFacet?: string;
    fetchOfficesPeople?: <T>() => T;
    officesPeopleList?: OfficesPeople[];
    setFilterFacet: (a: string) => void;
    officeCategories?: OfficePeopleCategory[];
    filterOfficesPeople?: <T>(value: string) => T;
};
export declare const OfficesPeople: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=Offices.d.ts.map