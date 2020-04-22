import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { filterQuery } from '../../utils/customHooks';
import { AppState } from '../../shared/types/genericTypes';
import {
  ContentQueryParamsType,
  contentToArticle,
  FacetsModel,
  skeletonBaseContentModel,
  TaxonomyTermModel,
  VariousContentModel
} from '../../shared/types/contentTypes';
import { toQueryString } from '../../utils/content';
import {
  fetchContent,
  fetchContentType,
  likeContentToggle,
  likeContentToggleType
} from '../../shared/actions/contentActions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from 'react-bootstrap';
import { FacetProperty } from '../../shared/models/Facet.model';
import get from 'lodash.get';
import { formatDate } from '../../shared/services/date';
import { Link } from 'react-router-dom';
import { handleScrollToBottom } from '../../utils/scroller';
import { Card } from 'umgc_ui_library/lib';
import * as queryString from 'querystring';
import Skeleton from 'react-loading-skeleton';

const ARTICLE_LIMIT = 9;
const ARTICLE_FACET = 'article_category';
const ARTICLE_SORT = 'latest';

type Props = {
  facets?: FacetsModel;
  moreContentAvailable?: boolean;
  paramSet?: ContentQueryParamsType;
  content?: VariousContentModel[];
  fetchContent: fetchContentType;
  likeContentToggle?: likeContentToggleType;
};

const mapState: any = (state: AppState, props: Props): Props => {
  // First we put together a set of parameters that uniquely identify this data set. This should include any type
  // restrictions, categories, and sorts. Any time I make a query with this parameter set, I should be able to trust
  // that all the data is the same. It should NOT include paging params like limit and offset. We will stringify this
  // param set and use it as the redux key for this set of data, as well as the query string for the API call.
  // @see the ContentQueryParamsType definition for what possible keys should be. Values are comma-separated.
  const paramSet: ContentQueryParamsType = {
    type: 'article',
    facet: ARTICLE_FACET,
    sort: ARTICLE_SORT
  };
  // When a facet has been selected, it will exist in the query string for this scene. Here we load it and apply it to
  // the param set. That means this will be a whole new data set at the new stringified key.
  const chosenFacet = queryString.parse(get(props, 'location.search').substr(1))[ARTICLE_FACET];
  if (chosenFacet && typeof chosenFacet === 'string') {
    paramSet[ARTICLE_FACET] = chosenFacet;
  }
  // Here we get whatever is already loaded at the key that matches the data we require (stringified paramSet).
  const content = state.contentReducers.content[toQueryString(paramSet)];
  return {
    ...props,
    paramSet,
    content: content ? content.content : [],
    facets: content ? content.facets : undefined,
    // If the amount of content we have loaded is less than the total amount of content available for this paramSet,
    // then the pager should be active.
    moreContentAvailable: content ? content.content.length < content.totalRecords : true
  };
};

const actionCreators = {
  fetchContent,
  likeContentToggle
};

export const ArticlesScene: FC<Props> = props => {
  const { content, moreContentAvailable, facets, fetchContent, likeContentToggle, paramSet } = props;

  // This will be a tid if a facet has been selected in the query string, otherwise undefined.
  const selectedFacet = paramSet && paramSet[ARTICLE_FACET];
  const categories = get(facets, ARTICLE_FACET);

  const [isFetching, setIsFetching] = useState(true);

  const enableFetch = (): void => setIsFetching(true);
  const disableFetch = (): void => setIsFetching(false);

  // This method runs constantly as you scroll. If the pager is active, and we aren't actually fetching anything atm,
  // then check to see if the current position is "bottom", and if so, green-light the next "fetch".
  function handleScroll (): void {
    if (moreContentAvailable && !isFetching) {
      handleScrollToBottom(enableFetch);
    }
  }

  // Here we add the scroll listener. Every time isFetching changes, the listener is removed and re-added
  // with the new value.
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching]);

  // Here is where we actually fetch the content. When we have a green-light to fetch (i.e. isFetching is true), then
  // pass our param set to fetchContent, along with our pager parameters to get the next page of content for this
  // paramSet. When it is complete, then disable fetching, so we don't start fetching in a loop. It will stay disabled
  // unless someone scrolls to the bottom and the listener re-enables it. At which point this will fire again.
  useEffect(() => {
    if (isFetching && fetchContent) {
      fetchContent(paramSet || {}, ARTICLE_LIMIT, content ? content.length : 0, disableFetch);
    } else {
      disableFetch();
    }
  }, [isFetching, selectedFacet]);

  // When the drop-down changes, we change the selected facet. That means we are now loading content for a new ParamSet!
  // So we will start with 0 items loaded, and load a whole new set. We assume that sorting, and available filters, and
  // number of items, could all be different for this new ParamSet.
  const setFilterQuery = filterQuery();
  function handleDropDownChange (value: string): void {
    // When the dropdown changes, redirect to the faceted data set.
    setFilterQuery.useFilterQuery(ARTICLE_FACET, value, enableFetch);
  }

  // For this component, it seems reasonable that while we are waiting on content to load we want to show a whole page
  // of skeleton cards. So we create 9 items of "empty" data to feed into the cards, and the UI Library should handle
  // skeletons from there.
  const skeletonContent = [];
  for (let i = 0; i < ARTICLE_LIMIT; i++) {
    const skeletonItem: VariousContentModel = {
      ...skeletonBaseContentModel,
      drupal_id: i,
      type: 'article'
    };
    skeletonContent.push(skeletonItem);
  }

  const loadingContent = (!content || !content.length) && isFetching;

  // Our article set will either be loaded content, or a set of skeletons.
  const articles = loadingContent ? skeletonContent : content;

  return (
    <Container className="article-list mt-5">
      <Row className="mb-2 article-list-header">
        <Col md={6}>
          <p className="font-size-xl">
            <b>News &amp; Articles</b>
          </p>
        </Col>
        <Col md={6} className="article-filter-section my-auto">
          {(categories && categories.length) || !isFetching ? (
            <Form className="d-flex justify-content-start justify-content-md-end">
              <Form.Label className="font-size-sm w-25 d-flex justify-content-start justify-content-md-end mr-sm-3 mr-0 mb-0 align-items-center">
                Filter by:
              </Form.Label>
              <Form.Control
                size="sm"
                as="select"
                id="filter"
                name="filter"
                className="w-auto rounded-0"
                onChange={(e: React.SyntheticEvent) => handleDropDownChange((e.target as HTMLInputElement).value)}
                value={selectedFacet}
              >
                <option value="">All</option>
                {categories instanceof Array &&
                  categories.map((category: FacetProperty) => (
                    <option key={category.drupal_id} value={category.drupal_id}>
                      {category.title}
                    </option>
                  ))}
              </Form.Control>
            </Form>
          ) : (
            <Skeleton width={100} />
          )}
        </Col>
      </Row>
      <Row>
        {articles &&
          articles.map((c: VariousContentModel) => {
            // In this case I expect all content to be of type article, so I convert my type, so I can use properties that
            // are specific to articles, like "likesCount". If I got back some content that didn't match the user type, it
            // would be null, so would not get rendered.
            const article = contentToArticle(c);
            return (
              article && (
                <Col md={4} key={article.drupal_id} className="mb-3 mb-md-5">
                  <Card
                    pictureSkeletonHeight={300}
                    isFetching={loadingContent}
                    type="article"
                    title={article.title}
                    imageUrl={get(article, 'image_uri.umgc_thumbnail', '')}
                    date={formatDate(article.created)}
                    categories={get(article, 'articleCategory', [] as TaxonomyTermModel[])}
                    MainLink={(p: React.PropsWithChildren<{}>) => (
                      <Link to={'article/' + article.drupal_id}>{p.children}</Link>
                    )}
                    handleThumbClick={() =>
                      likeContentToggle && likeContentToggle(article.drupal_id, !article.likedByUser)
                    }
                    likedStatus={article.likedByUser}
                    likes={article.likesCount}
                  />
                </Col>
              )
            );
          })}
      </Row>
      <Row>
        <Col>
          {isFetching && (
            <Col className="p-5 d-flex justify-content-center text-secondary">
              <strong>Fetching articles ...</strong>
            </Col>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapState, actionCreators)(ArticlesScene);
