import React, { FC } from 'react';
import LinksCards from '../components/links/LinksCards';
import ArticlesMinimalList from '../components/articles/ArticlesMinimalList';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Department } from '../shared/models/Department.model';
import { TemplateIdsModel } from '../shared/models/Template.model';
import { ContentWrapper } from 'umgc_ui_library/lib';
import createDOMPurify from 'dompurify';

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
            <ArticlesMinimalList owner={props.contentIds.ownerId} />
          </Col>
          <Col md={6} className="py-md-5 py-2">
            <LinksCards
              mdCols="cols-md-6"
              category={props.contentIds.contentBuckets[0]}
            />
          </Col>
        </Row>
      )}
      {props.content.body && (
        <Row className="px-3 pt-3">
          <ContentWrapper title="" topBorder="darkTurquoise">
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
