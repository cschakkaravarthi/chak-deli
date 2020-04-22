import React, { FC } from 'react';
import { PageSearch } from '../../shared/models/Page.model';
import { Card } from 'umgc_ui_library';
import { Link } from 'react-router-dom';
import createDOMPurify from 'dompurify';
import get from 'lodash.get';

interface PageCardProps {
  pageCard: PageSearch;
  searchKeyword?: string;
}

export const PageCard: FC<PageCardProps> = pageCardProps => {
  return (
    <Card
      type="page"
      variant="search"
      title={pageCardProps.pageCard.title}
      departmentName={pageCardProps.pageCard.owner_name}
      searchSummary={<div
        dangerouslySetInnerHTML={{
          __html: createDOMPurify.sanitize(
            get(pageCardProps.pageCard, 'summary', '')
          )
        }}
      />}
      MainLink={(p: React.PropsWithChildren<{}>) => (
        <Link to={`/pages/${pageCardProps.pageCard.drupal_id}`}>
          {p.children}
        </Link>
      )}
      searchKeyword={pageCardProps.searchKeyword}
    />
  );
};
