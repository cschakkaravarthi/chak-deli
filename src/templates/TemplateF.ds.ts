import { FC } from 'react';
import { Department } from '../shared/models/Department.model';
import Article from '../shared/models/Article.model';
import { TemplateIdsModel } from '../shared/models/Template.model';
declare type Props = {
    content: Department;
    contentIds: TemplateIdsModel;
    articleList: Article[];
};
declare const Template: FC<Props>;
export default Template;
