import React, { FC } from 'react';
import Article from '../../shared/models/Article.model';
import { match } from 'react-router';
declare type Props = {
    match?: match;
    article?: Article;
    fetchArticleById?: <T>(a: number) => Promise<T>;
    articleId?: number;
};
export declare const ArticleScene: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=ArticleScene.d.ts.map