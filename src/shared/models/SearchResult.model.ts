import Article, { dummyArticles } from './Article.model';
import Event, { dummyEvents } from './Event.model';
import PeopleModel, { dummyPeoples } from './People.model';

export default interface SearchResult {
  articles?: Article[];
  events?: Event[];
  people?: PeopleModel[];
}

export interface SearchSuggestionSuccessResponse {
  email: string;
  match: string;
}

export const dummySearchResult: SearchResult = {
  articles: dummyArticles,
  events: dummyEvents,
  people: dummyPeoples
};
