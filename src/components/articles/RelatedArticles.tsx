import React, { FC } from 'react';
import createDOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import get from 'lodash.get';
import Article from '../../shared/models/Article.model';
import { formatDate } from '../../shared/services/date';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface Props {
  articles?: Article[];
}

const RelatedArticles: FC<Props> = props => {
  const { articles } = props;

  if (!articles) {
    return null;
  }

  return (
    <Col md={5}>
      <div className="badge-danger rounded">
        <Link to="/news-articles">More latest News >></Link>
      </div>
      <div>
        {articles
          .filter((article: Article, index: number) => {
            return article && index < 3;
          })
          .map((article) => (
            <div key={article.drupal_id} className="content-card">
              <Link to={`/article/${article.drupal_id}`}>
                <Card className="mt-3 rounded-0 p-1 shadow-sm">
                  <Row
                    noGutters={true}
                    className="flex-row-reverse flex-md-row"
                  >
                    <Col
                      xs={4}
                      className="pr-2 d-flex align-items-center content-card__image_wrapper"
                    >
                      <Card.Img
                        src={get(article, 'image_uri.umgc_thumbnail', '')}
                        className="rounded-0 img-fluid"
                      />
                    </Col>
                    <Col xs={8}>
                      <Card.Body className="p-1">
                        <Card.Title>
                          <span>{article.title}</span>
                          <br/>
                          <span>{formatDate(article.created)}</span>
                          <br/>
                        </Card.Title>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: createDOMPurify.sanitize(
                              get(article, 'summary', '')
                            )
                          }}
                        />
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </div>
          ))}
      </div>
    </Col>
  );
};

export default RelatedArticles;
