import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Card } from 'umgc_ui_library/lib/cards/card';
import { AppState } from '../shared/types/genericTypes';
import { fetchEmployee } from '../shared/actions/employeeActions';
import get from 'lodash.get';
import { getLinkToContent } from '../utils/content';
import { VariousContentModel } from '../shared/types/contentTypes';

type Props = {
  employeesServiceList?: VariousContentModel[];
  fetchEmployee?: <T>() => T;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  employeesServiceList: state.employeeReducers.employees
});

const actionCreators = {
  fetchEmployee
};

export const EmployeeServices: FC<Props> = props => {
  const { employeesServiceList, fetchEmployee } = props;

  useEffect(() => {
    fetchEmployee && fetchEmployee();
  }, []);

  if (!employeesServiceList || !employeesServiceList.length) {
    return null;
  }

  return (
    <Container className="content-full mt-5">
      <Row>
        <Col>
          <p className="font-size-xl">
            <b>Employee Services</b>
          </p>
        </Col>
      </Row>
      <div className="d-flex flex-wrap">
        <Row>
          {employeesServiceList &&
            employeesServiceList.map(item => {
              return (
                <Col
                  lg="4"
                  md="6"
                  className="mb-4"
                  key={item.drupal_id + '_employeePageCol'}
                >
                  <Card
                    type="employeeServ"
                    variant="standard"
                    title={item.title || ''}
                    imageUrl={get(item, 'image_uri.umgc_thumbnail', '')}
                    summary={get(item, 'summary')}
                    VisitLink={getLinkToContent(item)}
                    linkText={get(item, 'title', '').toUpperCase()}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
    </Container>
  );
};

export default connect(mapState, actionCreators)(EmployeeServices);
