import React, { FC } from 'react';
import LinksCards from '../components/links/LinksCards';
import ArticlesMinimalList from '../components/articles/ArticlesMinimalList';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EventsMinimalList from '../components/events/EventsMinimalList';
import { Department } from '../shared/models/Department.model';
import { TemplateIdsModel } from '../shared/models/Template.model';

type Props = {
  content: Department;
  contentIds: TemplateIdsModel;
};

const Template: FC<Props> = props => {
  return (
    <>
      {props.contentIds.contentBuckets[0] &&
        <LinksCards category={props.contentIds.contentBuckets[0]} mdCols="col-md-3" />
      }
      {props.contentIds.ownerId && (
        <Row>
          <Col md={6} className="py-md-5 py-2">
            <ArticlesMinimalList owner={props.contentIds.ownerId}/>
          </Col>
          <Col md={6} className="py-md-5 py-2">
            <EventsMinimalList owner={props.contentIds.ownerId}/>
          </Col>
        </Row>
      )}
      {props.contentIds.contentBuckets[1] &&
        <LinksCards category={props.contentIds.contentBuckets[1]} multiColumn={true} showImages={false} mdCols="col-md-3" />
      }
    </>
  );
};

export default Template;
