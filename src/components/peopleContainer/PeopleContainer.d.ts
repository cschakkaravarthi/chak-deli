import { FC } from 'react';
import { Office as OfficeModel } from '../../shared/models/Office.model';
import PeopleModel from '../../shared/models/People.model';
declare type Props = {
    isActive?: string;
    isLastPage: boolean;
    office?: OfficeModel;
    people?: PeopleModel[];
    clearFilter?: () => void;
    handleActiveItem?: (letter: string) => void;
    triggerFetchPeople: <T>() => Promise<T> | undefined;
};
export declare const PeopleContainer: FC<Props>;
export default PeopleContainer;
//# sourceMappingURL=PeopleContainer.d.ts.map