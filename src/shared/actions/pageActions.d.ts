import { LoadPageByIdAction, LoadPagesAction } from '../types/pageTypes';
import { Page } from '../models/Page.model';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
export declare const loadPageById: (page: Page) => LoadPageByIdAction;
export declare const fetchPageById: (pageId: number) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
export declare const loadPages: (pages: Page[]) => LoadPagesAction;
export declare const fetchPages: (categoryId?: string | null) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => Promise<void>;
//# sourceMappingURL=pageActions.d.ts.map