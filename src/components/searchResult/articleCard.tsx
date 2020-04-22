import React, { FC } from 'react';
import Article from '../../shared/models/Article.model';
import createDOMPurify from 'dompurify';
import { Card } from 'umgc_ui_library';
import { Link } from 'react-router-dom';
import get from 'lodash.get';

interface ArticleCardProps {
  article: Article;
  searchKeyword?: string;
}

export const ArticleCard: FC<ArticleCardProps> = articleCardProps => {
  return (
    <Card
      type="article"
      variant="search"
      title={articleCardProps.article.title}
      content={
        <div
          dangerouslySetInnerHTML={{
            __html: createDOMPurify.sanitize(
              get(articleCardProps.article, 'summary', '')
            )
          }}
        />
      }
      MainLink={(p: React.PropsWithChildren<{}>) => (
        <Link to={'/article/' + articleCardProps.article.drupal_id}>
          {p.children}
        </Link>
      )}
      searchKeyword={articleCardProps.searchKeyword}
    />
  );
};
