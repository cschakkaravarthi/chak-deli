import { FC } from 'react';
import Article from '../../shared/models/Article.model';
import Facet from '../../shared/models/Facet.model';
interface Props {
    facets?: Facet;
    isLastPage: boolean;
    articles?: Article[];
    setFilterFacet?: any;
    selectedFacet?: string;
    triggerFetchArticles: any;
    likeArticleToggle?: (contentId: number, likedByUser: boolean) => void;
}
declare const ArticleListPage: FC<Props>;
export default ArticleListPage;
//# sourceMappingURL=ArticleListPage.d.ts.map