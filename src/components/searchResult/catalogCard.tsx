import React, { FC } from 'react';
import { CatalogSearch } from '../../shared/models/Catalog.model';
import { Card } from 'umgc_ui_library';
import createDOMPurify from 'dompurify';
import get from 'lodash.get';
import { getCatalogUrl } from '../../utils/customHooks';

interface CatalogCardProps {
    catalog: CatalogSearch;
    searchKeyword?: string;
}

export const CatalogCard: FC<CatalogCardProps> = catalogCardProps => {
  return (
    <Card
      type="techCatalog"
      variant="search"
      title={catalogCardProps.catalog.title}
      searchSummary={<div
        dangerouslySetInnerHTML={{
          __html: createDOMPurify.sanitize(
            get(catalogCardProps.catalog, 'body', '')
          )
        }}
      />}
      MainLink={p => (
        <a target="_blank" href={getCatalogUrl(catalogCardProps.catalog.sysId)}>{p.children}</a>
      )}
      searchKeyword={catalogCardProps.searchKeyword}
    />
  );
};
