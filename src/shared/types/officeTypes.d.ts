import { Office as OfficeModel } from '../models/Office.model';
export declare const FETCH_OFFICE_BY_ID = "FETCH_OFFICE_BY_ID";
export declare const LOAD_OFFICE_BY_ID = "LOAD_OFFICE_BY_ID";
export declare const CLEAR_OFFICE_REDUCER = "CLEAR_OFFICE_REDUCER";
export declare const LOAD_OFFICE_BY_ID_ERROR = "LOAD_OFFICE_BY_ID_ERROR";
export interface OfficeState {
    office?: OfficeModel;
    officeError?: boolean;
}
export interface LoadOfficeAction {
    type: typeof LOAD_OFFICE_BY_ID;
    office: OfficeModel;
}
export interface OfficeError {
    type: typeof LOAD_OFFICE_BY_ID_ERROR;
    officeError?: boolean;
}
export interface ClearOfficeAction {
    type: typeof CLEAR_OFFICE_REDUCER;
}
//# sourceMappingURL=officeTypes.d.ts.map