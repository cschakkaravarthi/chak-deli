import React, { FC, ReactElement } from 'react';
import { DocumentSearch } from '../../shared/models/Document.model';
import { Card } from 'umgc_ui_library';
import createDOMPurify from 'dompurify';
import get from 'lodash.get';
import { imageUrlHandler } from '../../utils/imageUrlHandler';

interface DocumentCardProps {
  document: DocumentSearch;
  searchKeyword?: string;
}

export const DocumentCard: FC<DocumentCardProps> = props => {
  const getMainLink = (p: React.PropsWithChildren<{}>): ReactElement => {
    if (props.document.document_uri) {
      return <a target="_blank" href={imageUrlHandler().sanitize(props.document.document_uri)}>{p.children}</a>;
    } else {
      return <span>{p.children}</span>;
    }
  };

  return (
    <Card
      type="document"
      variant="search"
      title={props.document.title}
      searchSummary={<div
        dangerouslySetInnerHTML={{
          __html: createDOMPurify.sanitize(
            get(props.document, 'summary', '')
          )
        }}
      />}
      MainLink={p => (
        getMainLink(p)
      )}
      searchKeyword={props.searchKeyword}
    />
  );
};
