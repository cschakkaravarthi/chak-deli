export interface KnowledgeSearch {
    type: string;
    author: string;
    articleId: string;
    body: string;
    title: string;
    knowledgeBase: string;
    createdOn: string;
  }

export const dummyKnowledgeBase: KnowledgeSearch = {
  type: 'knowledgebase',
  title: 'Woodland Hills, CA 91367',
  body: 'test body',
  articleId: '84a768543707bf0088a8db9643990e62',
  author: 'Jotiram Yadav',
  knowledgeBase: 'IT Knowledge',
  createdOn: '2019-08-02 06:43:54'
};

export const dummyknowledgeBaseData: KnowledgeSearch[] = [
  dummyKnowledgeBase,
  { ...dummyKnowledgeBase, articleId: 'f09c2fc94f077f00dc984da28110c72e' }
];
