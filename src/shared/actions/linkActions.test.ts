import moxios from 'moxios';

import {
  fetchLinks,
  fetchQuickTools,
  loadFacilities,
  loadFacilitiesError,
  loadLinks,
  loadMinisiteLinks
} from './linkActions';

import getStore from '../services/mockGlobalStore';
import { dummyGroupedLinks, minisiteDummyLinks } from '../models/Link.model';
import { dummyVariousContentGroup } from '../types/contentTypes';
import { dummyApiErrorModel } from '../models/Error.model';

describe('LinksActions', () => {
  let store: any;

  beforeEach(() => {
    store = getStore();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a loadLinks action', () => {
    expect(loadLinks(dummyGroupedLinks)).toMatchSnapshot();
  });

  it('creates a loadMinisiteLinks action', () => {
    expect(loadMinisiteLinks([dummyVariousContentGroup], '2')).toMatchSnapshot();
  });

  it('creates a loadFacilities action', () => {
    expect(loadFacilities(minisiteDummyLinks)).toMatchSnapshot();
  });

  it('creates a loadFacilitiesError action', () => {
    expect(loadFacilitiesError(dummyApiErrorModel)).toMatchSnapshot();
  });

  it.skip('fetchLinks makes API call', done => {
    const expectedActions = ['LOAD_LINKS'];

    moxios.stubRequest(
      'grouped_content?type=link&group=category&category=24&limit=0&sort=alphabetic',
      {
        status: 200,
        responseText: 'OK'
      }
    );

    store
      .dispatch(fetchLinks())
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

  it.skip('fetchQuickTools makes API call', done => {
    const expectedActions = ['LOAD_QUICK_TOOLS'];

    moxios.stubRequest(
      'content?type=link&group=category&category=139&limit=0&sort=alphabetic',
      {
        status: 200,
        responseText: 'OK'
      }
    );

    store
      .dispatch(fetchQuickTools())
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
