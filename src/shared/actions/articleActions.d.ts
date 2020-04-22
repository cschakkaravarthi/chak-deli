import { LoadArticlesAction } from './../types/articleTypes';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { LoadMoreArticlesAction, SetFilterFacetAction, LoadArticleByIdAction, ClearArticlesListAction } from '../types/articleTypes';
import Article from '../models/Article.model';
import { ContentWithFacet } from '../types/contentWithFacets';
import { ApplicationState } from '../reducers';
export declare const loadMoreArticles: (response: ContentWithFacet) => LoadMoreArticlesAction;
export declare const fetchArticles: (limit?: number | undefined, sort?: string | undefined, facet?: string | undefined) => ThunkAction<void, ApplicationState, undefined, AnyAction>;
export declare const loadArticles: (articleList: Article[]) => LoadArticlesAction;
export declare const fetchHomeArticles: (limit?: string, sort?: string, owner?: string) => ThunkAction<Promise<void>, {}, {}, AnyAction>;
export declare const setFilterFacet: (selectedFacet: import("../types/contentTypes").TaxonomyTermModel) => SetFilterFacetAction;
export declare const loadArticleById: (article: Article) => LoadArticleByIdAction;
export declare const fetchArticleById: (id: string) => ThunkAction<Promise<void>, {}, {}, AnyAction>;
export declare const clearArticlesList: () => ClearArticlesListAction;
export declare const likeArticleToggle: (contentId: number, likedByUser: boolean) => ThunkAction<void, ApplicationState, undefined, AnyAction>;
//# sourceMappingURL=articleActions.d.ts.map