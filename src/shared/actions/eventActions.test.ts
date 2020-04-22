import moxios from 'moxios';
import {
  loadEvents,
  fetchEvents,
  loadEventById,
  fetchEventById,
  loadMoreEvents,
  fetchHomeEvents
} from './eventActions';
import { dummyEvents } from '../models/Event.model';
import { mockedFacets } from '../models/Facet.model';
import getStore from '../services/mockGlobalStore';

describe('eventActions', () => {
  let store: any;
  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a loadEvents action', () => {
    expect(loadEvents(dummyEvents)).toMatchSnapshot();
  });

  it('creates a loadArticleById action', () => {
    expect(loadEventById(dummyEvents[0])).toMatchSnapshot();
  });

  it('creates a loadMoreEvents action', () => {
    const ContentWithFacets = {
      eventsList: dummyEvents,
      facets: mockedFacets
    };
    expect(loadMoreEvents(ContentWithFacets)).toMatchSnapshot();
  });

  it.skip('fetchHomeEvents makes API call', done => {
    const expectedActions = ['LOAD_EVENTS'];

    moxios.stubRequest('content?type=event&limit=3&sort=latest', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchHomeEvents())
      .then(() => {
        const actionsCalled = store
          .getActions()
          .map((action: any) => action.type);
        expect(actionsCalled).toEqual(expectedActions);
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it.skip('fetchEventById makes API call', done => {
    const expectedActions = ['LOAD_EVENT_BY_ID'];

    moxios.stubRequest('events?id=4', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchEventById('4'))
      .then(() => {
        const actionsCalled = store
          .getActions()
          .map((action: any) => action.type);
        expect(actionsCalled).toEqual(expectedActions);
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });

  it.skip('fetchEvents makes API call', done => {
    const expectedActions = ['LOAD_MORE_EVENTS'];

    moxios.stubRequest('content?type=event&page=1&limit=5', {
      status: 200,
      responseText: 'OK'
    });

    store
      .dispatch(fetchEvents())
      .then(() => {
        const actionsCalled = store
          .getActions()
          .map((action: any) => action.type);
        expect(actionsCalled).toEqual(expectedActions);
        done();
      })
      .catch((error: any) => {
        done(error);
      });
  });
});
