import React, { FC } from 'react';
import Article from '../../shared/models/Article.model';
declare type Props = {
    owner?: string;
    limit?: string;
    articleList?: Article[];
    fetchHomeArticles?: <T>(a: string, b: string, c?: string) => T;
};
export declare const ArticlesMinimalList: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=ArticlesMinimalList.d.ts.map