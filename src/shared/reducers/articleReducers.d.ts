import { Reducer } from 'redux';
import { ArticleState } from '../types/articleTypes';
export declare const initialState: {
    articleList: never[];
    isLastPage: boolean;
    facets: {};
    selectedFacet: string;
    pageCount: number;
};
declare const articleReducers: Reducer<ArticleState, any>;
export default articleReducers;
//# sourceMappingURL=articleReducers.d.ts.map