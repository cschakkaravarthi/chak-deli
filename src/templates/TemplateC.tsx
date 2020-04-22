import React, { FC } from 'react';
import ArticlesMinimalList from '../components/articles/ArticlesMinimalList';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Department } from '../shared/models/Department.model';
import { TemplateIdsModel } from '../shared/models/Template.model';
import createDOMPurify from 'dompurify';
import { ContentWrapper } from 'umgc_ui_library/lib';
import LinksCards from '../components/links/LinksCards';

type Props = {
  content: Department;
  contentIds: TemplateIdsModel;
};

const Template: FC<Props> = props => {
  return (
    <>
      {props.contentIds.ownerId && props.contentIds.contentBuckets[0] && (
        <Row>
          <Col md={6} className="py-md-5 py-2">
            <ArticlesMinimalList owner={props.contentIds.ownerId} limit="4" />
          </Col>
          <Col md={6} className="py-md-5 py-2">
            <LinksCards category={props.contentIds.contentBuckets[0]} multiColumn={false} showImages={false} />
          </Col>
        </Row>
      )}

      {props.content.body && (
        <Row className="px-3 pt-3">
          <ContentWrapper title='' topBorder="darkTurquoise">
            <div
              dangerouslySetInnerHTML={{
                __html: createDOMPurify.sanitize(props.content.body)
              }}
            />
          </ContentWrapper>
        </Row>
      )}
    </>
  );
};

export default Template;
