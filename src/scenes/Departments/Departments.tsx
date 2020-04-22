import React, { FC, useEffect, useState, ReactElement } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { fetchDepartments } from '../../shared/actions/departmentActions';
import { AppState } from '../../shared/types/genericTypes';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import get from 'lodash.get';
import { Card, CardProps } from 'umgc_ui_library';
import { getLinkToContent } from '../../utils/content';
import { skeletonBaseContentModel, VariousContentModel } from '../../shared/types/contentTypes';
import { OnError as IsEmpty } from '../../components/error/Error';

type Props = {
  departments?: VariousContentModel[];
  fetchDepartments?: () => Promise<void>;
};

const mapState: any = (state: AppState, props: Props): Props => ({
  ...props,
  departments: state.departmentReducers.departments.content
});

const actionCreators = { fetchDepartments };

export const Departments: FC<Props> = props => {
  const { fetchDepartments, departments = [] } = props;

  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    if (!departments.length) {
      setIsFetching(true);
    }

    fetchDepartments!().then(() => setIsFetching(false));
  }, []);

  const numSkeletons = 9;
  const skeletonData: VariousContentModel[] = [];

  for (let i = 0; i < numSkeletons; i++) {
    skeletonData.push({
      ...skeletonBaseContentModel,
      drupal_id: i,
      type: 'department'
    });
  }

  const deptCommonProps = (department: VariousContentModel): CardProps => ({
    type: 'department',
    variant: 'standard',
    isFetching: isFetching,
    title: department.title,
    VisitLink: getLinkToContent(department),
    bodyContent: get(department, 'summary', '')
  });

  const DeptCard = (department: VariousContentModel): ReactElement => (
    <Col md={6} lg={4} key={department.drupal_id} className="mb-4">
      <Card {...deptCommonProps(department)} />
    </Col>
  );

  const skeleton = (): ReactElement[] | false => {
    return (
      !departments.length && isFetching && skeletonData.map((department: VariousContentModel) => DeptCard(department))
    );
  };

  return (
    <Container className="content-full mt-5">
      <p className="font-size-xl">
        <b>Departments</b>
      </p>
      <Row>
        {skeleton()}
        {!!departments.length &&
          !isFetching &&
          departments.map((department: VariousContentModel) => DeptCard(department))}
        {!departments.length && !isFetching && <IsEmpty />}
      </Row>
    </Container>
  );
};

export default connect(mapState, actionCreators)(Departments);
