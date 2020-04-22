import React, { FC, useEffect } from 'react';
import { fetchGroupedContent } from '../../shared/actions/contentActions';
import { AppState } from '../../shared/types/genericTypes';
import { Card } from 'umgc_ui_library';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import LinkModel from '../../shared/models/Link.model';
import {
  ContentQueryParamsType,
  FacetedContentGroupModel, VariousContentModel
} from '../../shared/types/contentTypes';

import { connect } from 'react-redux';
import { toQueryString } from '../../utils/content';

const BRANDS_LABELS_CATEGORY = '123';

const brandsLabelsParamSet: ContentQueryParamsType = {
  type: 'link',
  group: 'category',
  category: BRANDS_LABELS_CATEGORY
};

type Props = {
  content?: FacetedContentGroupModel;
  fetchGroupedContent?: <T>(params: ContentQueryParamsType, limit: string) => T;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  content: state.contentReducers.groupedContent[toQueryString(brandsLabelsParamSet)]
});

const actionCreators = { fetchGroupedContent };

export const BrandsLabels: FC<Props> = props => {
  const { content, fetchGroupedContent } = props;

  useEffect(() => {
    fetchGroupedContent && fetchGroupedContent(brandsLabelsParamSet, '0');
  }, []);

  let brands: VariousContentModel[] = [];

  if (content && Array.isArray(content.groups)) {
    brands = content.groups[0].content;
  }

  return (
    <Container className="mt-5">
      <Row>
        <h1 className="font-size-xl p-3 pb-4 font-weight-bold">Brands & Labels</h1>
      </Row>
      <Row className="mb-5">
        {Array.isArray(brands) && brands.map(brand => {
          const brandLink = brand as LinkModel;

          return (
            <Col xs={6} sm={6} md={4} lg={3} xl={3} key={brand.drupal_id} className="pb-4">
              <Card
                type="brands"
                variant="default"
                imageUrl={brandLink.image_uri ? brandLink.image_uri.source : ''}
                title={brandLink.title}
                url={brandLink.url}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default connect(mapState, actionCreators)(BrandsLabels);
