import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { LoadOfficesPeopleAction } from '../types/officesPeopleType';
import OfficesPeople from '../models/OfficesPeople.model';
export declare const loadOfficesPeople: (officesPeople: OfficesPeople[]) => LoadOfficesPeopleAction;
export declare const fetchOfficesPeople: () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const filterOfficesPeople: (filterId: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => void;
//# sourceMappingURL=officesPeopleActions.d.ts.map