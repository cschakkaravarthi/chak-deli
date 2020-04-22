import { Reducer } from 'redux';
import { LinkState } from '../types/linkTypes';
export declare const initialState: {
    links: never[];
    groups: never[];
    minisiteLinks: {};
    quickTools: never[];
    facilities: never[];
    facilitiesError: boolean;
};
declare const linkReducers: Reducer<LinkState, any>;
export default linkReducers;
//# sourceMappingURL=linkReducers.d.ts.map