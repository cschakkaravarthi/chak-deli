import { ImageUris } from './Image.model';
import { BaseContentModel, TaxonomyTermModel } from '../types/contentTypes';
export default interface Article extends BaseContentModel {
    type: 'article';
    drupal_id: number;
    title: string;
    body_full?: string;
    created: number;
    summary?: string;
    tags?: TaxonomyTermModel[];
    categories: TaxonomyTermModel[];
    owner: TaxonomyTermModel[];
    image_uri?: ImageUris;
    articleCategory?: TaxonomyTermModel[];
    likesCount?: number;
    likedByUser?: boolean;
}
export declare const dummyArticle: Article;
export declare const dummyArticles: Article[];
export declare const dummyArticleList: Article[];
//# sourceMappingURL=Article.model.d.ts.map