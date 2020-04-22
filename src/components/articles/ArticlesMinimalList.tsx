import React, { FC, useEffect } from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../shared/types/genericTypes';
import { Card, ContentWrapper } from 'umgc_ui_library';
import Article from '../../shared/models/Article.model';
import { fetchHomeArticles } from '../../shared/actions/articleActions';
import { formatDate } from '../../shared/services/date';

type Props = {
  owner?: string;
  limit?: string;
  articleList?: Article[];
  fetchHomeArticles?: <T>(a: string, b: string, c?: string) => T;
};

const mapState = (state: AppState, props: Props): Props => (
  {
    ...props,
    articleList: state.articleReducers.articleList
  }
);

const actionCreators = { fetchHomeArticles };

export const ArticlesMinimalList: FC<Props> = props => {
  const { owner, articleList, fetchHomeArticles } = props;

  const LIMIT = '2';
  const SORT = 'latest';

  useEffect(() => {
    fetchHomeArticles && fetchHomeArticles(props.limit || LIMIT, SORT, owner);
  }, []);

  if (!articleList || !articleList.length) {
    return null;
  }

  return (
    <ContentWrapper title="News" wrapperClass="h-100">
      {articleList.map((article: Article) => (
        <Card
          type="article"
          title={article.title}
          key={article.drupal_id}
          variant="newsListEmbedded"
          date={formatDate(article.created)}
          imageUrl={get(article, 'image_uri.umgc_thumbnail', '')}
          MainLink={(p: React.PropsWithChildren<{}>) => (
            <Link to={'/article/' + article.drupal_id}>{p.children}</Link>
          )}
        />
      ))}
    </ContentWrapper>
  );
};

export default connect(mapState, actionCreators)(ArticlesMinimalList);
