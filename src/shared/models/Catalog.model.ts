
export interface CatalogSearch {
    type: string;
    sysId: string;
    body: string;
    title: string;
    name: string;
  }

export const dummyCatalog: CatalogSearch = {
  type: 'catalog',
  sysId: 'Woodland Hills, CA 91367',
  body: 'test body',
  title: 'catalog',
  name: 'Presidio Service Request'
};

export const dummyCatalogs: CatalogSearch[] = [
  dummyCatalog,
  { ...dummyCatalog, sysId: 'f09c2fc94f077f00dc984da28110c72e' }
];
