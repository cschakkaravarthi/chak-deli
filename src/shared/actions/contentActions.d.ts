import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { LoadContentAction, LoadGroupedContentAction, VariousContentGroupModel, VariousContentModel } from '../types/contentTypes';
export declare const loadGroupedContent: (content: VariousContentGroupModel[], filterId: string) => LoadGroupedContentAction;
export declare const loadContent: (content: VariousContentModel[], filterId: string) => LoadContentAction;
export declare const fetchContent: (filterId: string, filterField?: string | undefined, allowedTypes?: string | undefined) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const fetchGroupedContent: (filterId: string, filterField?: string | undefined, allowedTypes?: string | undefined) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
//# sourceMappingURL=contentActions.d.ts.map