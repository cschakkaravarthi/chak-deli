import React, { FC } from 'react';

import Article from '../../shared/models/Article.model';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Card } from 'umgc_ui_library';
import { formatDate } from '../../shared/services/date';
import { Link } from 'react-router-dom';
import get from 'lodash.get';

interface Props {
  articles?: Article[];
  itemsPerRow?: number;
}

const ArticleList: FC<Props> = props => {
  const { articles, itemsPerRow = 3 } = props;
  const MAX_ITEMS = 12;

  if (!articles) {
    return null;
  }

  return (
    <Container className="m-0 p-0">
      <Row noGutters>
        {articles.map(article => (
          <Col
            md={6}
            sm={12}
            className="row m-0 p-0"
            key={article.drupal_id}
            lg={MAX_ITEMS / itemsPerRow}
          >
            <Card
              type="article"
              title={article.title}
              categories={article.articleCategory}
              date={formatDate(article.created)}
              imageUrl={get(article, 'image_uri.umgc_thumbnail', '')}
              MainLink={(p: React.PropsWithChildren<{}>) => (
                <Link to={'article/' + article.drupal_id}>{p.children}</Link>
              )}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ArticleList;
