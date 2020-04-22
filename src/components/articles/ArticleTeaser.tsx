import React, { FC } from 'react';
import createDOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import Article from '../../shared/models/Article.model';
import { formatDate } from '../../shared/services/date';

import get from 'lodash.get';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { TaxonomyTermModel } from '../../shared/types/contentTypes';

interface Props {
  maxWidth?: any;
  article?: Article;
  hideSummary?: boolean;
  imageToRight?: boolean;
}

const ArticleTeaser: FC<Props> = props => {
  const { imageToRight, article, maxWidth, hideSummary } = props;

  if (!article) {
    return null;
  }

  return (
    <Link
      to={`/article/${article.drupal_id}`}
      className="text-decoration-none article-teaser"
    >
      {imageToRight ? (
        <Card className="mb-3 rounded-0 p-2 shadow-sm" style={{ maxWidth }}>
          <Row noGutters className="flex-row-reverse flex-md-row">
            <Col xs={7}>
              <Card.Body>
                <small
                  className="card-title text-small text-dark article-card-title">
                  <strong>{article.title}</strong>
                </small>
                <Card.Text className="text-secondary mb-0 text-small">
                  <small>{formatDate(get(article, 'created'))}</small>
                </Card.Text>
                {!get(article, 'owner', [] as TaxonomyTermModel[]).length || (
                  <Card.Text className="text-secondary mb-0 text-small">
                    <small>
                      {get(article, 'owner', [] as TaxonomyTermModel[]).map(
                        (owner: TaxonomyTermModel, index: number) =>
                          owner ? <span key={index}>{owner.title}</span> : ''
                      )}
                    </small>
                  </Card.Text>
                )}
                {!get(article, 'articleCategory', [] as TaxonomyTermModel[])
                  .length || (
                  <Card.Text className="text-secondary mb-0 text-small">
                    <small>
                      {get(article, 'articleCategory', [] as TaxonomyTermModel[]).map(
                        (articleCategory: TaxonomyTermModel) =>
                          articleCategory ? (
                            <span key={articleCategory.drupal_id}>
                              {articleCategory.title}
                            </span>
                          ) : (
                            ''
                          )
                      )}
                    </small>
                  </Card.Text>
                )}
                {hideSummary ? (
                  ''
                ) : (
                  <small
                    className="text-secondary"
                    dangerouslySetInnerHTML={{
                      __html: createDOMPurify.sanitize(
                        get(article, 'summary', '')
                      )
                    }}
                  />
                )}
              </Card.Body>
            </Col>
            <Col xs={5} className="d-flex align-items-center">
              <Card.Img
                className="rounded-0"
                src={get(article, 'image_uri.umgc_thumbnail', '')}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
            </Col>
          </Row>
        </Card>
      ) : (
        <Card className="mb-3 rounded-0 p-2 shadow-sm" style={{ maxWidth }}>
          <Card.Img
            variant="top"
            className="rounded-0"
            src={get(article, 'image_uri.umgc_thumbnail', '')}
          />
          <Card.Body>
            <small
              className="card-title text-small text-dark article-card-title mb-0">
              <strong>{article.title}</strong>
            </small>
            <Card.Text className="text-secondary mb-0">
              <small>{formatDate(article.created)}</small>
            </Card.Text>
            {!get(article, 'owner', [] as TaxonomyTermModel[]).length || (
              <Card.Text className="text-secondary mb-0">
                <small>
                  {get(article, 'owner', [] as TaxonomyTermModel[]).map((owner: TaxonomyTermModel) =>
                    owner ? <span key={owner.drupal_id}>{owner.title}</span> : ''
                  )}
                </small>
              </Card.Text>
            )}
            {!get(article, 'articleCategory', [] as TaxonomyTermModel[]).length || (
              <Card.Text className="text-secondary mb-0">
                <small>
                  {get(article, 'articleCategory', [] as TaxonomyTermModel[]).map(
                    (articleCategory: TaxonomyTermModel) =>
                      articleCategory ? (
                        <span key={articleCategory.drupal_id}>
                          {articleCategory.title}
                        </span>
                      ) : (
                        ''
                      )
                  )}
                </small>
              </Card.Text>
            )}
            {hideSummary ? (
              ''
            ) : (
              <small
                className="text-secondary article-card-title"
                dangerouslySetInnerHTML={{
                  __html: createDOMPurify.sanitize(
                    get(article, 'summary', '')
                  )
                }}
              />
            )}
          </Card.Body>
        </Card>
      )}
    </Link>
  );
};

export default ArticleTeaser;
