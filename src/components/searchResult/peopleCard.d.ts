import { FC } from 'react';
import People from '../../shared/models/People.model';
interface PeopleCardProps {
    people: People;
    addtocontact?: (email: string | undefined) => void;
    isFetching?: boolean;
}
export declare const PeopleCard: FC<PeopleCardProps>;
export {};
//# sourceMappingURL=peopleCard.d.ts.map