import React, { FC, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import TemplateA from '../../templates/TemplateA';
import TemplateB from '../../templates/TemplateB';
import TemplateC from '../../templates/TemplateC';
import TemplateD from '../../templates/TemplateD';
import TemplateE from '../../templates/TemplateE';
import {
  DepartmentTemplate
} from '../../shared/models/Department.model';
import { match } from 'react-router';
import { AppState } from '../../shared/types/genericTypes';
import { connect } from 'react-redux';
import { fetchDepartmentById } from '../../shared/actions/departmentActions';
import get from 'lodash.get';
import DrupalIds from '../../drupalIds';
import DepartmentTopBar from './DepartmentTopBar';
import Error404 from '../Errors/Error404';
import { contentToDepartment, VariousContentModel } from '../../shared/types/contentTypes';

type Props = {
  match?: match;
  departmentId?: number;
  department?: VariousContentModel;
  fetchDepartmentById?: (departmentId: number) => Promise<void>;
};

const mapState: any = (state: AppState, props: Props): Props => {
  const departmentId = parseInt(get(props, 'match.params.id'), 10);
  return {
    ...props,
    departmentId,
    department: state.departmentReducers.departments.content.find(
      d => d.drupal_id === departmentId
    )
  };
};

const actionCreators = { fetchDepartmentById };

export const Department: FC<Props> = props => {
  const { departmentId, department, fetchDepartmentById } = props;

  const [isFetching, setIsFetching] = useState<boolean>(true);

  if (!departmentId) {
    if (!isFetching) {
      return <Error404 />;
    } else {
      return null;
    }
  }

  const departmentIds = get(DrupalIds.departments, departmentId);

  useEffect(() => {
    if (fetchDepartmentById) {
      fetchDepartmentById(departmentId)
        .then(() => {
          setIsFetching(false);
        })
        .catch(() => {
          setIsFetching(false);
        });
    }
  }, []);

  if (!department) {
    if (!isFetching) {
      return <Error404 />;
    } else {
      return null;
    }
  }

  const getTemplateId = (): string => {
    const getTemplates = get(
      department,
      'template',
      [] as DepartmentTemplate[]
    );
    // Typecast to string.
    return getTemplates[0].drupal_id + '';
  };

  const templateId = department && getTemplateId();

  // Which template component should we use? To find out we check the template ID.
  // If we don't recognize it we default to TemplateA.
  const TemplateComponent =
    templateId === DrupalIds.templates.templateB
      ? TemplateB
      : templateId === DrupalIds.templates.templateC
        ? TemplateC
        : templateId === DrupalIds.templates.templateD
          ? TemplateD
          : templateId === DrupalIds.templates.templateE
            ? TemplateE
            : TemplateA;

  const typedDepartment = contentToDepartment(department);
  return typedDepartment && templateId ? (
    <div className="departments pb-5">
      <DepartmentTopBar departmentId={departmentId} active={departmentId} />
      <Container>
        <TemplateComponent content={typedDepartment} contentIds={departmentIds} />
      </Container>
    </div>
  ) : null;
};

export default connect(mapState, actionCreators)(Department);
