import React, { FC } from 'react';
import { KnowledgeSearch } from '../../shared/models/KnowledgeBase.model';
import { Card } from 'umgc_ui_library';
import createDOMPurify from 'dompurify';
import get from 'lodash.get';
import { formatDate } from '../../shared/services/date';
import { getKnowledgeBaseUrl } from '../../utils/customHooks';

interface KnowledgeBaseCardProps {
  knowledgeBase: KnowledgeSearch;
  searchKeyword?: string;
}

export const KnowledgeCard: FC<KnowledgeBaseCardProps> = knowledgeBaseCardProps => {
  return (
    <Card
      type="knowledgeBase"
      variant="search"
      title={knowledgeBaseCardProps.knowledgeBase.title}
      authorName={knowledgeBaseCardProps.knowledgeBase.author}
      date={formatDate(undefined, knowledgeBaseCardProps.knowledgeBase.createdOn)}
      searchSummary={<div
        dangerouslySetInnerHTML={{
          __html: createDOMPurify.sanitize(
            get(knowledgeBaseCardProps.knowledgeBase, 'body', '')
          )
        }}
      />}
      MainLink={p => (
        <a target="_blank" href={getKnowledgeBaseUrl(knowledgeBaseCardProps.knowledgeBase.articleId)}>{p.children}</a>
      )}
      searchKeyword={knowledgeBaseCardProps.searchKeyword}
    />
  );
};
