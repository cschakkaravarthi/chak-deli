import React, { FC } from 'react';
import { Department } from '../../shared/models/Department.model';
import { Card } from 'umgc_ui_library';
import { Link } from 'react-router-dom';
import createDOMPurify from 'dompurify';
import get from 'lodash.get';

interface DepartmentCardProps {
  department: Department;
  searchKeyword?: string;
}

export const DepartmentCard: FC<DepartmentCardProps> = departmentCardProps => {
  return (
    <Card
      type="department"
      variant="search"
      title={departmentCardProps.department.title}
      searchSummary={<div
        dangerouslySetInnerHTML={{
          __html: createDOMPurify.sanitize(
            get(departmentCardProps.department, 'summary', '')
          )
        }}
      />}
      MainLink={(p: React.PropsWithChildren<{}>) => (
        <Link to={'/departments/' + departmentCardProps.department.drupal_id}>
          {p.children}
        </Link>
      )}
      searchKeyword={departmentCardProps.searchKeyword}
    />
  );
};
