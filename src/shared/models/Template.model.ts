export interface TemplateIdsModel {
  name: string;
  ownerId: string;
  topNav?: string;
  contentBuckets: string[];
}

export const dummyTemplateIds = {
  name: 'A Name',
  ownerId: '1',
  topNav: '2',
  contentBuckets: ['3', '4']
};
