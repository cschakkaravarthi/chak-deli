import React, { FC, useState, useEffect } from 'react';
import get from 'lodash.get';
import Article from '../../shared/models/Article.model';
import { AppState } from '../../shared/types/genericTypes';
import { connect } from 'react-redux';
import { REQUEST_LIMIT_3, SORT_LATEST } from '../../constants/constants';
import { fetchHomeArticles, likeArticleToggle } from '../../shared/actions/articleActions';
import { formatDate } from '../../shared/services/date';
import { Link } from 'react-router-dom';
import createDOMPurify from 'dompurify';
import { Card } from 'umgc_ui_library';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EventsContainer from '../events/Events';
import EventTeaser from '../events/EventTeaser';
import EventModel from '../../shared/models/Event.model';
import { fetchHomeEvents } from '../../shared/actions/eventActions';

type Props = {
  ownerId?: string;
  articleList?: Article[];
  eventsList?: EventModel[];
  type?: string;
  fetchHomeEvents?: <T>(ownerId: string) => Promise<T>;
  likeArticleToggle?: <T>(contentId: number, likedByUser: boolean) => Promise<T>;
  fetchHomeArticles?: <T>(limit: string, sort: string, ownerId: string) => Promise<T>;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  eventsList: state.eventReducers.eventsList,
  articleList: state.articleReducers.articleList
});

const actionCreators = { fetchHomeArticles, fetchHomeEvents, likeArticleToggle };

export const LandingArticlesAndEvents: FC<Props> = props => {
  const { articleList, fetchHomeArticles, eventsList, fetchHomeEvents, likeArticleToggle, ownerId = '', type = '' } = props;

  const [articlesFetching, setArticlesFetching] = useState<boolean>(false);
  const [eventsFetching, setEventsFetching] = useState<boolean>(false);

  let otherArticles: Article[] = [];
  let featuredArticle = {} as Article;

  if (articleList) {
    featuredArticle = articleList[0];
    otherArticles = articleList.slice(1, Number(REQUEST_LIMIT_3));
  }

  const articlesAndEventsCall = (): void => {
    setEventsFetching(true);
    setArticlesFetching(true);
    fetchHomeEvents!(ownerId).then(() => setEventsFetching(false));
    fetchHomeArticles!(REQUEST_LIMIT_3, SORT_LATEST, ownerId).then(() => setArticlesFetching(false));
  };

  useEffect(() => {
    articlesAndEventsCall();
  }, []);

  const featuredArticleProps = {
    isFetching: articlesFetching,
    type: 'article',
    variant: 'featured',
    title: get(featuredArticle, 'title'),
    summary: (
      <span
        dangerouslySetInnerHTML={{
          __html: createDOMPurify.sanitize(get(featuredArticle, 'summary', ''))
        }}
      />
    ),
    imageUrl: get(featuredArticle, 'image_uri.umgc_thumbnail'),
    date: formatDate(get(featuredArticle, 'created')),
    categories: get(featuredArticle, 'articleCategory'),
    MainLink: (p: React.PropsWithChildren<{}>) => (
      <Link to={'article/' + get(featuredArticle, 'drupal_id')}>{p.children}</Link>
    ),
    handleThumbClick: () =>
      likeArticleToggle && likeArticleToggle(featuredArticle.drupal_id, !featuredArticle.likedByUser),
    likedStatus: get(featuredArticle, 'likedByUser'),
    likes: get(featuredArticle, 'likesCount')
  };

  return (
    <>
      <Row>
        <Col xl="12" className={type === 'label' ? 'd-none d-xl-block' : 'my-3 d-none d-xl-block'}>
          {!articlesFetching && !featuredArticle ? null : (
            <Card pictureSkeletonHeight={300} {...featuredArticleProps} />
          )}
        </Col>
      </Row>
      <Row>
        <Col xl="6" className="my-3">
          <Row className="h-100">
            <Col md="4" xl="12" className="d-xl-none">
              <Card {...featuredArticleProps} />
            </Col>
            {!articlesFetching && otherArticles.length
              ? otherArticles.map(article => (
                <Col md="4" xl="6" key={article.drupal_id}>
                  <Card
                    type="article"
                    title={article.title}
                    imageUrl={get(article, 'image_uri.umgc_thumbnail', '')}
                    date={formatDate(article.created)}
                    categories={article.articleCategory}
                    MainLink={(p: React.PropsWithChildren<{}>) => (
                      <Link to={'article/' + article.drupal_id}>{p.children}</Link>
                    )}
                    handleThumbClick={() =>
                      likeArticleToggle && likeArticleToggle(article.drupal_id, !article.likedByUser)
                    }
                    likedStatus={article.likedByUser}
                    likes={article.likesCount}
                  />
                </Col>
              ))
              : !articlesFetching && !otherArticles.length
                ? null
                : Array(2)
                  .fill(null)
                  .map((x: '', i: number) => (
                    <Col md="4" xl="6" key={`${i + x}`}>
                      <Card title="" type="article" isFetching={true} />
                    </Col>
                  ))}
          </Row>
        </Col>
        <Col xl="6" className="my-3">
          <EventsContainer events={eventsList} isFetching={eventsFetching}>
            <EventTeaser events={eventsList} isFetching={eventsFetching} />
          </EventsContainer>
        </Col>
      </Row>
    </>
  );
};

export default connect(mapState, actionCreators)(LandingArticlesAndEvents);
