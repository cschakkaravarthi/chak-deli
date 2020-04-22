// This global store is for unit testing purposes only
import configureStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import { dummyUserInfo } from '../models/UserInfo.model';
import { dummyArticle, dummyArticleList } from '../models/Article.model';
import { dummyEvents } from '../models/Event.model';
import { dummyPeoples } from '../models/People.model';

const mockStore = configureStore([ReduxThunk]);

const basicInitialState = {
  articleReducer: {
    articleList: [dummyArticle]
  },
  usersReducers: {
    users: [dummyUserInfo]
  },
  profileReducers: {
    users: dummyUserInfo
  },
  searchResultReducers: {
    articles: dummyArticleList,
    events: dummyEvents,
    people: dummyPeoples
  }
};

const getStore = (state = basicInitialState): any => mockStore(state);

export default getStore;
