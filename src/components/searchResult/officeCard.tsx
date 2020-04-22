import React, { FC } from 'react';
import { OfficeSearch } from '../../shared/models/Office.model';
import { Card } from 'umgc_ui_library';
import { Link } from 'react-router-dom';
import createDOMPurify from 'dompurify';
import get from 'lodash.get';

interface OfficeCardProps {
  office: OfficeSearch;
  searchKeyword?: string;
}

export const OfficeCard: FC<OfficeCardProps> = officeCardProps => {
  return (
    <Card
      type="office"
      variant="search"
      title={officeCardProps.office.title || ''}
      officeAddress={<div
        className="address-top"
        dangerouslySetInnerHTML={{
          __html: createDOMPurify.sanitize(
            get(officeCardProps, 'office.address', '')
          )
        }}
      />}
      MainLink={(p: React.PropsWithChildren<{}>) => (
        <Link to={`/office/${officeCardProps.office.drupal_id}`}>
          {p.children}
        </Link>
      )}
      searchKeyword={officeCardProps.searchKeyword}
    />
  );
};
