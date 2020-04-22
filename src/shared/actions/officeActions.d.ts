import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { LoadOfficeAction, ClearOfficeAction, OfficeError } from '../types/officeTypes';
import { Office } from '../models/Office.model';
export declare const clearOfficeAction: () => ClearOfficeAction;
export declare const loadOfficeAction: (office: Office) => LoadOfficeAction;
export declare const loadOfficeError: (error: string) => OfficeError;
export declare const fetchOffice: (officeId: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
//# sourceMappingURL=officeActions.d.ts.map