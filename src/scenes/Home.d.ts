import React, { FC } from 'react';
import Article from '../shared/models/Article.model';
import EventModel from '../shared/models/Event.model';
import QuickToolsLink from '../shared/models/Link.model';
declare type Props = {
    articleList?: Article[];
    eventsList?: EventModel[];
    fetchHomeEvents?: <T>() => T;
    fetchQuickTools?: <T>() => T;
    quickTools?: QuickToolsLink[];
    fetchNotifications?: <T>() => T;
    fetchHomeArticles?: <T>(a: string, b: string) => T;
    likeArticleToggle?: <T>(contentId: number, likedByUser: boolean) => T;
};
export declare const Home: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=Home.d.ts.map