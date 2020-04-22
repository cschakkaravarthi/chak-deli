import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults, setSelectedType, clearSearchScrollList } from '../../shared/actions/searchResultAction';
import { fetchAddToContactRequest } from '../../shared/actions/userProfileActions';
import { AppState } from '../../shared/types/genericTypes';
import Article from '../../shared/models/Article.model';
import EventModel from '../../shared/models/Event.model';
import PeopleModel from '../../shared/models/People.model';
import { Department } from '../../shared/models/Department.model';
import Link from '../../shared/models/Link.model';
import { PageSearch } from '../../shared/models/Page.model';
import { OfficeSearch } from '../../shared/models/Office.model';
import { DocumentSearch } from '../../shared//models/Document.model';
import { KnowledgeSearch } from '../../shared/models/KnowledgeBase.model';
import SearchResults from '../../components/searchResult/searchResults';
import { useQuery } from '../../utils/customHooks';
import { CatalogSearch } from '../../shared/models/Catalog.model';

type Props = {
  match?: object;
  articles?: Article[];
  events?: EventModel[];
  people?: PeopleModel[];
  departments?: Department[];
  links?: Link[];
  pages?: PageSearch[];
  office?: OfficeSearch[];
  documents?: DocumentSearch[];
  knowledgeBase?: KnowledgeSearch[];
  catalog?: CatalogSearch[];
  articlesCount?: number;
  eventsCount?: number;
  peopleCount?: number;
  departmentsCount?: number;
  linksCount?: number;
  pagesCount?: number;
  officeCount?: number;
  documentsCount?: number;
  knowledgeBaseCount?: number;
  catalogCount?: number;
  totalCount?: number;
  isFetch?: boolean;
  selectedFacet?: string;
  pageCount?: number;
  isLastPage?: boolean;
  setSelectedType?: (type: string) => void;
  fetchSearchResults?: (scroll?: boolean, page?: number, query?: string, limit?: number, type?: string) => void;
  clearSearchScrollList?: () => void;
  fetchAddToContactRequest?: (email: string | undefined) => void;
  spellingSuggestion?: string;
};

const mapState: any = (state: AppState, props: Props): Props => ({
  ...props,
  articles: state.searchResultReducers.articles,
  events: state.searchResultReducers.events,
  people: state.searchResultReducers.people,
  departments: state.searchResultReducers.departments,
  links: state.searchResultReducers.links,
  pages: state.searchResultReducers.pages,
  office: state.searchResultReducers.office,
  documents: state.searchResultReducers.documents,
  knowledgeBase: state.searchResultReducers.knowledgeBase,
  catalog: state.searchResultReducers.catalog,
  articlesCount: state.searchResultReducers.articlesCount,
  eventsCount: state.searchResultReducers.eventsCount,
  peopleCount: state.searchResultReducers.peopleCount,
  departmentsCount: state.searchResultReducers.departmentsCount,
  linksCount: state.searchResultReducers.linksCount,
  pagesCount: state.searchResultReducers.pagesCount,
  officeCount: state.searchResultReducers.officeCount,
  documentsCount: state.searchResultReducers.documentsCount,
  knowledgeBaseCount: state.searchResultReducers.knowledgeBaseCount,
  catalogCount: state.searchResultReducers.catalogCount,
  totalCount: state.searchResultReducers.totalCount,
  isFetch: state.searchResultReducers.isFetch,
  selectedFacet: state.searchResultReducers.selectedFacet,
  pageCount: state.searchResultReducers.pageCount,
  isLastPage: state.searchResultReducers.isLastPage,
  spellingSuggestion: state.searchResultReducers.spellingSuggestion
});

const actionCreators = {
  setSelectedType,
  fetchSearchResults,
  clearSearchScrollList,
  fetchAddToContactRequest
};

export const SearchResultsScene: FC<Props> = props => {
  const {
    articles = [],
    events = [],
    people = [],
    departments = [],
    links = [],
    pages = [],
    office = [],
    documents = [],
    knowledgeBase = [],
    catalog = [],
    articlesCount,
    eventsCount,
    peopleCount,
    departmentsCount,
    linksCount,
    pagesCount,
    officeCount,
    documentsCount,
    knowledgeBaseCount,
    catalogCount,
    fetchSearchResults,
    clearSearchScrollList,
    isFetch,
    setSelectedType,
    pageCount,
    totalCount,
    isLastPage,
    spellingSuggestion,
    fetchAddToContactRequest
  } = props;

  const query = useQuery();

  const handleAddToContacts = (email?: string): void => {
    if (email && fetchAddToContactRequest) {
      fetchAddToContactRequest(email);
    }
  };

  const getQueryVariable = (variable: string): string => {
    let queryStringVal = '';
    const query = window.location.search.substring(1);
    const vars = query.split('&');

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] === variable) {
        queryStringVal = pair[1];
        break;
      }
    }

    return queryStringVal;
  };

  const searchKeyWord = getQueryVariable('q');
  const typeInQuery = getQueryVariable('type');
  const decodedSearchKeyWord = decodeURIComponent(searchKeyWord);
  const [isScroll, setIsScroll] = useState<boolean>(true);
  const initialPage = 1;

  let limit = 4;

  // Scroll based fetch
  // triggerFetchSearchResults?:()=>Promise<void>; // @TODO finding relevant type

  const triggerFetchSearchResults = (): any => {
    limit = 10;

    const typeInQuery = query.get('type') || undefined;

    setIsScroll(false);

    if (!isLastPage) {
      return fetchSearchResults!(true, pageCount, searchKeyWord, limit, typeInQuery);
    }
  };

  const [fetchOnFacetChange, setFetchOnFacetChange] = useState(false);

  useEffect(() => {
    async function asyncRequest (): Promise<void> {
      setIsScroll(true);
      setFetchOnFacetChange(true);

      if (typeInQuery !== 'all') {
        limit = 10;
      }

      await clearSearchScrollList!();

      await fetchSearchResults!(false, initialPage, searchKeyWord, limit, typeInQuery);

      setFetchOnFacetChange(false);
    }

    asyncRequest();
  }, [searchKeyWord, typeInQuery]);

  return (
    <SearchResults
      isFetchingData={(isScroll && isFetch) || fetchOnFacetChange}
      searchKeyword={decodedSearchKeyWord || ''}
      articles={articles}
      events={events}
      people={people}
      departments={departments}
      links={links}
      pages={pages}
      office={office}
      documents={documents}
      knowledgeBase={knowledgeBase}
      catalog={catalog}
      articlesCount={articlesCount}
      eventsCount={eventsCount}
      peopleCount={peopleCount}
      departmentsCount={departmentsCount}
      linksCount={linksCount}
      pagesCount={pagesCount}
      officeCount={officeCount}
      documentsCount={documentsCount}
      knowledgeBaseCount={knowledgeBaseCount}
      catalogCount={catalogCount}
      totalCount={totalCount}
      typeInQuery={typeInQuery}
      setSelectedType={setSelectedType}
      triggerFetchSearchResults={triggerFetchSearchResults}
      isLastPage={isLastPage}
      spellingSuggestion={spellingSuggestion}
      handleAddToContacts={handleAddToContacts}
    />
  );
};

export default connect(mapState, actionCreators)(SearchResultsScene);
