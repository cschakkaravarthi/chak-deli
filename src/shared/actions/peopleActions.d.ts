import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { ClearPeopleAction, LoadMorePeopleAction } from '../types/peopleTypes';
import PeopleModel from '../models/People.model';
import { ApplicationState } from '../reducers';
export declare const loadPeople: (people: PeopleModel[]) => LoadMorePeopleAction;
export declare const fetchPeople: (sitecode: string, startsWith?: string | undefined, limit?: number | undefined) => ThunkAction<void, ApplicationState, undefined, AnyAction>;
export declare const clearPeople: () => ClearPeopleAction;
//# sourceMappingURL=peopleActions.d.ts.map