import React, { FC, useState, useEffect, ReactElement } from 'react';
import { connect } from 'react-redux';
import Article from '../../shared/models/Article.model';
import Event from '../../shared/models/Event.model';
import People from '../../shared/models/People.model';
import { Department } from '../../shared/models/Department.model';
import Link from '../../shared/models/Link.model';
import { PageSearch } from '../../shared/models/Page.model';
import { OfficeSearch } from '../../shared/models/Office.model';
import { DocumentSearch } from '../../shared//models/Document.model';
import { KnowledgeSearch } from '../../shared/models/KnowledgeBase.model';
import { CatalogSearch } from '../../shared/models/Catalog.model';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Form } from 'react-bootstrap';
import { handleScrollToBottom } from '../../utils/scroller';
import { filterQueryWithSearchKeyword, useQuery } from '../../utils/customHooks';
import { PeopleCard } from './peopleCard';
import { ArticleCard } from './articleCard';
import { EventCard } from './eventCard';
import { DepartmentCard } from './departmentCard';
import { LinkCard } from './linkCard';
import { PageCard } from './pageCard';
import { OfficeCard } from './officeCard';
import { DocumentCard } from './documentCard';
import { KnowledgeCard } from './knowledgeBaseCard';
import { CatalogCard } from './catalogCard';
import { ComponentToShow } from './componentToShow';
import { NoResultCard } from './NoResults';
import { GetFilterType } from './filterType';
import { AutoSuggest, HandleSelectedResponseParams } from 'umgc_ui_library/lib/search/autoSuggest';
import { fetchSearchSuggestion, clearSearchSuggestionList } from '../../shared/actions/searchResultAction';
import { AppState } from '../../shared/types/genericTypes';
import { history } from '../../App';
import images from '../../images/images';

type DataTypes =
  | Link
  | Event
  | People
  | Article
  | Department
  | PageSearch
  | OfficeSearch
  | CatalogSearch
  | DocumentSearch
  | KnowledgeSearch;

export interface SearchSuggest {
  value: string;
  label: string;
}

interface Props {
  links?: Link[];
  events?: Event[];
  people?: People[];
  linksCount?: number;
  pagesCount?: number;
  totalCount?: number;
  eventsCount?: number;
  peopleCount?: number;
  officeCount?: number;
  typeInQuery?: string;
  articles?: Article[];
  pages?: PageSearch[];
  isLastPage?: boolean;
  catalogCount?: number;
  searchKeyword?: string;
  articlesCount?: number;
  documentsCount?: number;
  office?: OfficeSearch[];
  isFetchingData?: boolean;
  catalog?: CatalogSearch[];
  departmentsCount?: number;
  departments?: Department[];
  knowledgeBaseCount?: number;
  spellingSuggestion?: string;
  documents?: DocumentSearch[];
  knowledgeBase?: KnowledgeSearch[];
  searchSuggestions?: SearchSuggest[];
  clearSearchSuggestionList?: () => void;
  triggerFetchSearchResults?: <T>() => T;
  setSelectedType?: (type: string) => void;
  handleAddToContacts?: (email?: string) => void;
  fetchSearchSuggestion?: (query: string, suggestionLimit: number) => void;
}

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  searchSuggestions: state.searchResultReducers.searchSuggestions ? state.searchResultReducers.searchSuggestions : []
});

const actionCreators = {
  clearSearchSuggestionList,
  fetchSearchSuggestion
};

const SearchResults: FC<Props> = props => {
  const {
    isLastPage,
    typeInQuery,
    setSelectedType,
    spellingSuggestion,
    handleAddToContacts,
    fetchSearchSuggestion,
    clearSearchSuggestionList,
    triggerFetchSearchResults,
    links = [],
    pages = [],
    people = [],
    events = [],
    office = [],
    catalog = [],
    articles = [],
    documents = [],
    departments = [],
    knowledgeBase = [],
    searchSuggestions = [],
    totalCount = 0,
    linksCount = 0,
    pagesCount = 0,
    peopleCount = 0,
    officeCount = 0,
    eventsCount = 0,
    catalogCount = 0,
    articlesCount = 0,
    documentsCount = 0,
    departmentsCount = 0,
    knowledgeBaseCount = 0,
    searchKeyword = '',
    isFetchingData = false
  } = props;

  const [search, setSearch] = useState<string>('');
  const [isFetching, setIsFetching] = useState(false);

  const setFilterQuery = filterQueryWithSearchKeyword();

  const handleFilterByTypeChange = (value: string): void => {
    const encodedSearchKeyword = encodeURIComponent(searchKeyword);

    setFilterQuery.useFilterQueryWithSearchKeyword(encodedSearchKeyword, 'type', value, setSelectedType);
  };

  function handleRemoveFilterByType (event: React.SyntheticEvent): void {
    event.preventDefault();

    const encodedSearchKeyword = encodeURIComponent(searchKeyword);

    setFilterQuery.useFilterQueryWithSearchKeyword(encodedSearchKeyword, 'type', 'all', setSelectedType);
  }

  const query = useQuery();
  const suggestionLimit = 8;

  let searchKeyWord = '';
  searchKeyWord = query.get('q');

  const fetchSearchResults = async (): Promise<void> => {
    await triggerFetchSearchResults!();

    setIsFetching(false);
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    clearSearchSuggestionList!();

    if (search) {
      history.push(`/search?q=${encodeURIComponent(search)}&type=all`);
    }
  };

  const getSuggestions = (value: string): object[] => {
    clearSearchSuggestionList!();

    fetchSearchSuggestion!(value, suggestionLimit);

    return searchSuggestions;
  };

  const manualSearch = (value: string): void => {
    const regex = /(<([^>]+)>)/gi;

    value = value.replace(regex, '');

    setSearch(value);
  };

  const handleSelected = (suggested: HandleSelectedResponseParams): void => {
    const regex = /(<([^>]+)>)/gi;

    suggested.value = suggested.value.replace(regex, '');

    setSearch(suggested.value);

    clearSearchSuggestionList!();

    if (suggested.value) {
      history.push(`/search?q=${encodeURIComponent(suggested.value)}&type=all`);
    }
  };

  // Scroll section code.
  useEffect(() => {
    if (isFetching) return;

    window.addEventListener('scroll', () => isFetching || handleScrollToBottom(() => setIsFetching(true)));

    return () => {
      window.removeEventListener('scroll', () => isFetching || handleScrollToBottom(() => setIsFetching(true)));
    };
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;

    if (!isLastPage && typeInQuery !== 'all' && typeInQuery) {
      fetchSearchResults();
    } else {
      setIsFetching(false);
    }
  }, [isFetching]);

  const showOnTypeInQuery = <T extends DataTypes>(
    onType: string,
    cardType: (dataType: T[]) => ReactElement,
    dataType: T[]
  ): ReactElement | null => {
    if (typeInQuery === 'all' || typeInQuery === onType) {
      return cardType(dataType);
    }

    return null;
  };

  const getPeopleCards = (people: People[]): ReactElement => (
    <ComponentToShow
      data={people}
      heading="People"
      skeletonCount={2}
      skeletonColSize={6}
      cardInSkeleton="people"
      dataLength={peopleCount}
      typeInQuery={typeInQuery}
      filterByTypeChange="people"
      isFetching={isFetchingData}
      handleFilterByTypeChange={handleFilterByTypeChange}
    >
      {people.map((p: People) => (
        <Col md={6} key={p.loginId} className="mb-3 mb-md-4">
          <PeopleCard
            people={p}
            isFetching={isFetchingData}
            addtocontact={(email: string | undefined) => handleAddToContacts && handleAddToContacts(email)}
            searchKeyword={searchKeyWord}
          />
        </Col>
      ))}
    </ComponentToShow>
  );

  const getOfficeCards = (office: OfficeSearch[]): ReactElement => (
    <ComponentToShow
      data={office}
      heading="Offices"
      cardInSkeleton="office"
      dataLength={officeCount}
      typeInQuery={typeInQuery}
      filterByTypeChange="office"
      isFetching={isFetchingData}
      handleFilterByTypeChange={handleFilterByTypeChange}
    >
      {office.map((o: OfficeSearch) => (
        <Col md={12} key={o.drupal_id} className="mb-3 mb-md-4">
          <OfficeCard office={o} searchKeyword={searchKeyWord} />
        </Col>
      ))}
    </ComponentToShow>
  );

  const getArticleCards = (articles: Article[]): ReactElement => (
    <ComponentToShow
      heading="News"
      data={articles}
      cardInSkeleton="article"
      typeInQuery={typeInQuery}
      dataLength={articlesCount}
      isFetching={isFetchingData}
      filterByTypeChange="article"
      handleFilterByTypeChange={handleFilterByTypeChange}
    >
      {articles.map((a: Article) => (
        <Col md={12} key={a.drupal_id} className="mb-3 mb-md-4">
          <ArticleCard article={a} searchKeyword={searchKeyWord} />
        </Col>
      ))}
    </ComponentToShow>
  );

  const getEventCards = (events: Event[]): ReactElement => (
    <ComponentToShow
      data={events}
      heading="Events"
      cardInSkeleton="event"
      dataLength={eventsCount}
      typeInQuery={typeInQuery}
      isFetching={isFetchingData}
      filterByTypeChange="event"
      handleFilterByTypeChange={handleFilterByTypeChange}
    >
      {events.map((e: Event) => (
        <Col md={12} key={e.drupal_id} className="mb-3 mb-md-4">
          <EventCard event={e} searchKeyword={searchKeyWord} />
        </Col>
      ))}
    </ComponentToShow>
  );

  const getKnowledgeBaseCards = (knowledgeBase: KnowledgeSearch[]): ReactElement => (
    <ComponentToShow
      data={knowledgeBase}
      heading="Knowledge Base"
      typeInQuery={typeInQuery}
      isFetching={isFetchingData}
      cardInSkeleton="knowledgeBase"
      dataLength={knowledgeBaseCount}
      filterByTypeChange="knowledgebase"
      handleFilterByTypeChange={handleFilterByTypeChange}
    >
      {knowledgeBase.map((k: KnowledgeSearch) => (
        <Col md={12} key={k.articleId} className="mb-3 mb-md-4">
          <KnowledgeCard knowledgeBase={k} searchKeyword={searchKeyWord} />
        </Col>
      ))}
    </ComponentToShow>
  );

  const getDepartmentCards = (departments: Department[]): ReactElement => (
    <ComponentToShow
      data={departments}
      heading="Departments"
      typeInQuery={typeInQuery}
      cardInSkeleton="department"
      isFetching={isFetchingData}
      dataLength={departmentsCount}
      filterByTypeChange="department"
      handleFilterByTypeChange={handleFilterByTypeChange}
    >
      {departments.map((d: Department) => (
        <Col md={12} key={d.drupal_id} className="mb-3 mb-md-4">
          <DepartmentCard department={d} searchKeyword={searchKeyWord} />
        </Col>
      ))}
    </ComponentToShow>
  );

  const getLinkCards = (links: Link[]): ReactElement => (
    <ComponentToShow
      data={links}
      heading="Links"
      cardInSkeleton="link"
      dataLength={linksCount}
      filterByTypeChange="link"
      typeInQuery={typeInQuery}
      isFetching={isFetchingData}
      handleFilterByTypeChange={handleFilterByTypeChange}
    >
      {links.map((l: Link) => (
        <Col md={12} key={l.drupal_id} className="mb-3 mb-md-4">
          <LinkCard link={l} searchKeyword={searchKeyWord} />
        </Col>
      ))}
    </ComponentToShow>
  );

  const getPageCards = (pages: PageSearch[]): ReactElement => (
    <ComponentToShow
      data={pages}
      heading="Other"
      cardInSkeleton="page"
      dataLength={pagesCount}
      filterByTypeChange="page"
      typeInQuery={typeInQuery}
      isFetching={isFetchingData}
      handleFilterByTypeChange={handleFilterByTypeChange}
    >
      {pages.map((p: PageSearch) => (
        <Col md={12} key={p.drupal_id} className="mb-3 mb-md-4">
          <PageCard pageCard={p} searchKeyword={searchKeyWord} />
        </Col>
      ))}
    </ComponentToShow>
  );

  const getDocumentCards = (documents: DocumentSearch[]): ReactElement => (
    <ComponentToShow
      data={documents}
      heading="Documents"
      cardInSkeleton="document"
      typeInQuery={typeInQuery}
      isFetching={isFetchingData}
      dataLength={documentsCount}
      filterByTypeChange="document"
      handleFilterByTypeChange={handleFilterByTypeChange}
    >
      {documents.map((d: DocumentSearch) => (
        <Col md={12} key={d.drupal_id} className="mb-3 mb-md-4">
          <DocumentCard document={d} searchKeyword={searchKeyWord} />
        </Col>
      ))}
    </ComponentToShow>
  );

  const getCatalogCards = (catalog: CatalogSearch[]): ReactElement => (
    <ComponentToShow
      data={catalog}
      heading="Catalog"
      dataLength={catalogCount}
      typeInQuery={typeInQuery}
      isFetching={isFetchingData}
      cardInSkeleton="techCatalog"
      filterByTypeChange="catalog"
      handleFilterByTypeChange={handleFilterByTypeChange}
    >
      {catalog.map((data: CatalogSearch) => (
        <Col md={12} key={data.sysId} className="mb-3 mb-md-4">
          <CatalogCard catalog={data} searchKeyword={searchKeyWord} />
        </Col>
      ))}
    </ComponentToShow>
  );

  return (
    <Container className="article-list mt-5">
      <Row className="mb-xl-2 mb-md-4 mb-5 article-list-header">
        <Col md={6}>
          <p className="font-size-xl text-color-black">
            <b>Search Results</b>
          </p>
        </Col>
        <Col md={6} className="d-xl-none">
          <AutoSuggest
            suggestionValue={searchKeyWord}
            handleSubmit={handleSubmit}
            placeHolder="Search"
            miniNoOfCharsShowSuggestions={2}
            suggestions={searchSuggestions}
            manualSearch={manualSearch}
            handleSelected={handleSelected}
            getSuggestions={getSuggestions}
            isMobileSearchBar={true}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <p className="font-size-title g700-text-clr mb-0">
            <strong>{totalCount}</strong>
            <span className="gray-600"> results for </span>
            <strong> {searchKeyword || ''}</strong>
          </p>
        </Col>
        <Col md={6} className="article-filter-section d-flex justify-content-start justify-content-md-end">
          <Form inline className="justify-content-md-end mt-2 mt-md-0">
            <Form.Label className="mr-3 mb-0">Filter by type:</Form.Label>
            <Form.Control
              size="sm"
              as="select"
              id="filter"
              name="filter"
              className="d-inline w-auto"
              onChange={(e: React.SyntheticEvent) => handleFilterByTypeChange((e.target as HTMLInputElement).value)}
              value={typeInQuery || 'all'}
            >
              <option value="all">All</option>
              <option value="people">People</option>
              <option value="article">News</option>
              <option value="event">Events</option>
              <option value="office">Offices</option>
              <option value="department">Departments</option>
              <option value="knowledgebase">Knowledge Base</option>
              <option value="catalog">Catalog</option>
              <option value="link">Links</option>
              <option value="document">Documents</option>
              <option value="page">Other</option>
            </Form.Control>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {spellingSuggestion && (
            <p className="mb-0 mt-2">
              Did you mean <u className="font-weight-bold">{`${searchKeyword}`}</u>?
            </p>
          )}

          {typeInQuery && typeInQuery !== 'all' && (
            <p className="mb-0 mt-2">
              Filtered by:{' '}
              <img
                className="cursor-pointer"
                src={images.removeFilter}
                height={15}
                width={15}
                onClick={handleRemoveFilterByType}
              />{' '}
              Type: <GetFilterType typeInQuery={typeInQuery} />
            </p>
          )}
        </Col>
      </Row>

      {(isFetching || isFetchingData || totalCount) < 1 && <NoResultCard />}

      <>
        {showOnTypeInQuery('people', getPeopleCards, people)}
        {showOnTypeInQuery('article', getArticleCards, articles)}
        {showOnTypeInQuery('event', getEventCards, events)}
        {showOnTypeInQuery('office', getOfficeCards, office)}
        {showOnTypeInQuery('department', getDepartmentCards, departments)}
        {showOnTypeInQuery('knowledgebase', getKnowledgeBaseCards, knowledgeBase)}
        {showOnTypeInQuery('catalog', getCatalogCards, catalog)}
        {showOnTypeInQuery('link', getLinkCards, links)}
        {showOnTypeInQuery('document', getDocumentCards, documents)}
        {showOnTypeInQuery('page', getPageCards, pages)}
      </>
      <div className="mb-5" />
    </Container>
  );
};

export default connect(mapState, actionCreators)(SearchResults);
