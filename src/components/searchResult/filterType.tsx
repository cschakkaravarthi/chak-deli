import React, { FC } from 'react';

type Props = {
  typeInQuery: string;
};

const queryAndType = [
  { query: 'people', type: 'People' },
  { query: 'article', type: 'News' },
  { query: 'event', type: 'Events' },
  { query: 'office', type: 'Offices' },
  { query: 'department', type: 'Departments' },
  { query: 'knowledgebase', type: 'Knowledge Base' },
  { query: 'catalog', type: 'Catalog' },
  { query: 'link', type: 'Links' },
  { query: 'document', type: 'Documents' },
  { query: 'page', type: 'Other' }
];

export const GetFilterType: FC<Props> = props => {
  return (
    <>
      {queryAndType.map(
        (q: { query: string; type: string }) =>
          props.typeInQuery === q.query && <strong key={q.query}>{q.type}</strong>
      )}
    </>
  );
};
