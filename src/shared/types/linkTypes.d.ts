import { ContentGroupedCategorizedStorageModel, VariousContentGroupModel } from './contentTypes';
import Link, { LinkGroupItems } from './../models/Link.model';
export declare const LOAD_LINKS = "LOAD_LINKS";
export declare const FETCH_LINKS = "FETCH_LINKS";
export declare const FETCH_MINISITE_LINKS = "FETCH_MINISITE_LINKS";
export declare const LOAD_USER_LINKS = "LOAD_USER_LINKS";
export declare const FETCH_USER_LINKS = "FETCH_USER_LINKS";
export declare const SET_USER_LINKS = "SET_USER_LINKS";
export declare const SAVE_USER_LINKS = "SAVE_USER_LINKS";
export declare const LOAD_MINISITE_LINKS = "LOAD_MINISITE_LINKS";
export declare const FETCH_QUICK_TOOLS = "FETCH_QUICK_TOOLS";
export declare const LOAD_QUICK_TOOLS = "LOAD_QUICK_TOOLS";
export declare const FETCH_FACILITIES = "FETCH_FACILITIES";
export declare const LOAD_FACILITIES = "LOAD_FACILITIES";
export declare const FACILITIES_ERROR = "FACILITIES_ERROR";
export declare const CLEAR_FACILITILES = "CLEAR_FACILITILES";
export interface ClearLinksAction {
    type: typeof CLEAR_FACILITILES;
}
export interface LinkState {
    links: Link[];
    quickTools: Link[];
    facilities: Link[];
    facilitiesError: boolean;
    groups: LinkGroupItems[];
    minisiteLinks: ContentGroupedCategorizedStorageModel;
}
export interface LoadFacilitiesError {
    type: typeof FACILITIES_ERROR;
    facilitiesError?: boolean;
}
export interface LoadFacilitiesAction {
    type: typeof LOAD_FACILITIES;
    facilities: Link[];
}
export interface LoadLinksAction {
    type: typeof LOAD_LINKS;
    groups: LinkGroupItems[];
}
export interface LoadUserLinksAction {
    type: typeof LOAD_USER_LINKS;
    links: Link[];
}
export interface LoadMinisiteLinksAction {
    type: typeof LOAD_MINISITE_LINKS;
    minisiteLinks: VariousContentGroupModel[];
    cat: string;
}
export interface SetUserLinksAction {
    type: typeof SET_USER_LINKS;
    success: boolean;
}
export interface LoadQuickToolsAction {
    type: typeof LOAD_QUICK_TOOLS;
    quickTools: Link[];
}
//# sourceMappingURL=linkTypes.d.ts.map