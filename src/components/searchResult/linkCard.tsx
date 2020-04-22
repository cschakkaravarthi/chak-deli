import React, { FC } from 'react';
import Link from '../../shared/models/Link.model';
import { Card } from 'umgc_ui_library';
import createDOMPurify from 'dompurify';
import get from 'lodash.get';
import images from '../../images/images';

interface LinkCardProps {
  link: Link;
  searchKeyword?: string;
}

export const LinkCard: FC<LinkCardProps> = linkCardProps => {
  return (
    <Card
      type="link"
      variant="search"
      title={linkCardProps.link.title}
      imageSrc={images.external}
      searchSummary={<div
        dangerouslySetInnerHTML={{
          __html: createDOMPurify.sanitize(
            get(linkCardProps.link, 'summary', '')
          )
        }}
      />}
      MainLink={p => (
        <a target="_blank" href={linkCardProps.link.url}>{p.children}</a>
      )}
      searchKeyword={linkCardProps.searchKeyword}
    />
  );
};
