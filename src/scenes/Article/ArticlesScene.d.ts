import React, { FC } from 'react';
import Article from '../../shared/models/Article.model';
import Facet from '../../shared/models/Facet.model';
declare type Props = {
    facets?: Facet;
    isLastPage: boolean;
    setFilterFacet?: any;
    selectedFacet?: string;
    articleList?: Article[];
    clearArticlesList?: any;
    fetchArticles?: (a?: number, b?: string, c?: string) => void;
    likeArticleToggle?: (contentId: number, likedByUser: boolean) => void;
};
export declare const ArticlesScene: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, "facets" | "isLastPage" | "selectedFacet" | "articleList">>;
export default _default;
//# sourceMappingURL=ArticlesScene.d.ts.map