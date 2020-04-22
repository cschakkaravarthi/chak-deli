import React, { FC, ReactElement, useEffect } from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { Card, ContentWrapper, Resources } from 'umgc_ui_library';
import { fetchMinisiteLinks } from '../../shared/actions/linkActions';
import { AppState } from '../../shared/types/genericTypes';
import { fetchGroupedContent, fetchGroupedContentType } from '../../shared/actions/contentActions';
import { getLinkToContent, toQueryString } from '../../utils/content';
import { extractExtension } from '../../utils/customHooks';
import {
  VariousContentGroupModel,
  VariousContentModel,
  TaxonomyTermModel, FacetedContentGroupModel, ContentQueryParamsType
} from '../../shared/types/contentTypes';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
  mdCols?: string;
  category: string;
  showImages?: boolean;
  multiColumn?: boolean;
  content?: FacetedContentGroupModel;
  fetchGroupedContent?: fetchGroupedContentType;
  paramSet?: ContentQueryParamsType;
};

const mapState = (state: AppState, props: Props): Props => {
  const paramSet: ContentQueryParamsType = {
    category: props.category
  };
  return {
    ...props,
    paramSet,
    content: get(state.contentReducers.groupedContent, `[${toQueryString(paramSet)}]`)
  };
};

const actionCreators = { fetchMinisiteLinks, fetchGroupedContent };

export const LinksCards: FC<Props> = props => {
  const {
    content,
    category,
    paramSet,
    fetchGroupedContent,
    mdCols = 'col-md-4',
    multiColumn = true,
    showImages = true
  } = props;

  useEffect(() => {
    if (paramSet) {
      fetchGroupedContent && fetchGroupedContent(paramSet);
    }
  }, []);

  if (!content || !content.groups.length) {
    return null;
  }

  const renderLinksVariant1 = (
    content: VariousContentModel[]
  ): ReactElement => (
    <Row className="departments-links">
      {content.map(
        (c): ReactElement => {
          if (c.type === 'document') {
            if (!get(c, 'document_uri')) {
              return <></>;
            }
          }

          const mainLink = getLinkToContent(c);
          if (!mainLink) {
            return <></>;
          }
          return (
            <div className={`mb-4 col-sm-6 ${mdCols}`} key={c.drupal_id}>
              <Card
                type="link"
                title={c.title}
                variant="minimal"
                MainLink={mainLink}
                imageUrl={get(c, 'image_uri.umgc_featured', '')}
              />
            </div>
          );
        }
      )}
    </Row>
  );

  const renderLinksVariant2 = (
    content: VariousContentModel[]
  ): ReactElement => (
    <Row
      className={`resources flex-wrap justify-content-between ${multiColumn &&
        'd-flex'}`}
    >
      {content.map(
        (c): ReactElement => {
          let extension;
          if (c.type === 'document') {
            if (!get(c, 'document_uri')) {
              return <></>;
            }
            extension = extractExtension(get(c, 'document_uri'));
          }
          const mainLink = getLinkToContent(c);
          if (!mainLink) {
            return <></>;
          }
          return (
            <Col xl={6} className="pb-4" key={c.drupal_id}>
              <Resources
                mainLinkText={c.title}
                MainLink={mainLink}
                extension={extension}
                external={c.type === 'link'}
              />
            </Col>
          );
        }
      )}
    </Row>
  );

  const renderLinks = (content: VariousContentModel[]): ReactElement => {
    return showImages
      ? renderLinksVariant1(content)
      : renderLinksVariant2(content);
  };

  const renderGroups = (groups: VariousContentGroupModel[]): ReactElement[] =>
    groups.map(group => (
      <div key={`group_${group.drupal_id}`}>
        <p className="font-size-base g700-text-clr card-grouped-subheader">
          <b>{group.title}</b>
        </p>
        {renderLinks(group.content)}
      </div>
    ));

  const displayGrouped = content.groups.length > 1;

  const cat = get(content.groups, '[0].content[0].category_ancestors', []).find(
    (c: TaxonomyTermModel) => c.drupal_id + '' === category
  );

  const cardLabel = cat && cat.title ? cat.title : 'Resources';

  let innerComponent = null;

  if (displayGrouped && content.groups.length > 0) {
    innerComponent = renderGroups(content.groups);
  } else if (!displayGrouped && content.groups[0].content.length > 0) {
    innerComponent = renderLinks(content.groups[0].content);
  }

  if (innerComponent) {
    return (
      <ContentWrapper title={cardLabel} topBorder="darkTurquoise">
        {innerComponent}
      </ContentWrapper>
    );
  }
  return null;
};

export default connect(mapState, actionCreators)(LinksCards);
