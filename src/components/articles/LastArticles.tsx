import React, { FC } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import get from 'lodash.get';
import { Link } from 'react-router-dom';
import { Card } from 'umgc_ui_library';
import Article from '../../shared/models/Article.model';
import { formatDate } from '../../shared/services/date';

type Props = {
  articleList: Article[];
};

export const LastArticles: FC<Props> = props => {
  const { articleList } = props;

  if (!articleList || !articleList.length) {
    return null;
  }

  return (
    <Row>
      {articleList.map((article: Article) => (
        <Col key={article.drupal_id} md="4" xl="6">
          <Card
            type="article"
            title={article.title}
            key={article.drupal_id}
            date={formatDate(article.created)}
            imageUrl={get(article, 'image_uri.umgc_thumbnail', '')}
            MainLink={(p: React.PropsWithChildren<{}>) => (
              <Link to={'/article/' + article.drupal_id}>{p.children}</Link>
            )}
          />
        </Col>
      ))}
    </Row>
  );
};

export default LastArticles;
