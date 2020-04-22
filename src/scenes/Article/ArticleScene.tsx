import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import createDOMPurify from 'dompurify';
import { fetchArticleById } from '../../shared/actions/articleActions';
import { AppState } from '../../shared/types/genericTypes';
import get from 'lodash.get';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { formatDate } from '../../shared/services/date';
import { Card } from 'umgc_ui_library/lib';
import { match } from 'react-router';
import { TaxonomyTermModel, VariousContentModel } from '../../shared/types/contentTypes';
import Error404 from '../Errors/Error404';
import { findContentInState } from '../../utils/content';

type Props = {
  match?: match;
  content?: VariousContentModel;
  fetchArticleById?: <T>(a: number) => Promise<T>;
  articleId?: number;
};

const mapState = (state: AppState, props: Props): Props => {
  const articleId = parseInt(get(props, 'match.params.id'), 10);
  // If we clicked on this article from a previous list, then the article already exists in redux. Load it!
  // @TODO: Monitor performance of this solution. Maybe once we find them we should add them to a new set that is
  // @TODO: indexed by drupal_id for quicker lookup?
  const preLoadedArticles = findContentInState(state.contentReducers, [articleId]);
  return {
    ...props,
    articleId,
    content: preLoadedArticles[0]
  };
};

const actionCreators = {
  fetchArticleById
};

export const ArticleScene: FC<Props> = props => {
  const { content, fetchArticleById, articleId } = props;

  const [isFetching, setIsFetching] = useState<boolean>(true);

  if (!articleId) {
    if (!isFetching) {
      return <Error404 />;
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (!content) {
      if (fetchArticleById) {
        fetchArticleById(articleId)
          .then(() => {
            setIsFetching(false);
          })
          .catch(() => {
            setIsFetching(false);
          });
      }
    }
  }, []);

  if (!content) {
    if (!isFetching) {
      return <Error404 />;
    } else {
      return null;
    }
  }

  const fullBody = get(content, 'body_full', '');

  return (
    <Container className="content-full">
      <Row>
        <Col md={12} className="p-1 mt-5">
          <Card
            type="article"
            variant="full"
            title={content.title}
            date={formatDate(get(content, 'created'))}
            imageUrl={get(content, 'image_uri.umgc_featured', '')}
            categories={get(content, 'articleCategory', [] as TaxonomyTermModel[])}
            content={
              <div
                className="position-relative"
                dangerouslySetInnerHTML={{
                  __html: createDOMPurify.sanitize(fullBody)
                }}
              />
            }
          />
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapState, actionCreators)(ArticleScene);
