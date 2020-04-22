import ApiClient from './apiClient';
import ApiService from './apiService';

const mockData = {};
const mockError = { message: 'Something Bad Happened' };

const firstCallback = jest.fn((data: any) => data);
const secondCallback = jest.fn((data: any) => data);

describe('apiService', () => {
  beforeAll(() => {
    expect(ApiClient.defaults.headers.common.Authorization).toBe('Bearer test token');
    // @ts-ignore
    ApiClient.get.mockImplementation((url: string) => {
      return Promise.resolve({ data: mockData });
    });
  });

  it('should call api client method', () => {
    ApiService.makeApiCall(
      'testUrl',
      data => data,
      res => res,
      err => err,
      'get'
    );

    expect(ApiClient.get).toBeCalledTimes(1);
    expect(ApiClient.get).toBeCalledWith('testUrl');
  });

  it('should call callbacks consequently', done => {
    ApiService.makeApiCall('testUrl', firstCallback, secondCallback).then(() => {
      expect(firstCallback).toBeCalledTimes(1);
      expect(firstCallback).toBeCalledWith(mockData);
      expect(secondCallback).toBeCalledTimes(1);
      expect(secondCallback).toBeCalledWith(firstCallback(mockData));
      done();
    });
  });
});

describe('api service error flow', () => {
  beforeAll(() => {
    // @ts-ignore
    ApiClient.get.mockImplementation((url: string) => {
      console.log('error result');
      return Promise.reject(mockError);
    });
  });

  it('should handle error', done => {
    console.error = jest.fn();

    const firstCallback = jest.fn((data: any) => data);
    const secondCallback = jest.fn((data: any) => data);

    ApiService.makeApiCall('testUrl', firstCallback, secondCallback).then(() => {
      expect(firstCallback).toBeCalledTimes(0);
      expect(secondCallback).toBeCalledTimes(0);
      expect(console.error).toBeCalledTimes(1);
      expect(console.error).toBeCalledWith('ApiClient testUrl', mockError);
      done();
    });
  });
});

describe('apiService methods', () => {
  beforeAll(() => {
    // @ts-ignore
    ApiClient.get.mockImplementation((url: string) => {
      expect(ApiClient.defaults.headers.common.Authorization).toBe('Bearer test token');

      return Promise.resolve({ data: mockData });
    });
  });

  it('getArticles method call', () => {
    ApiService.getArticles(jest.fn(), 1, 3, 'latest', 'news', 'selectedNews').then(() => {
      expect(ApiClient.get).toBeCalledWith(
        'content?type=article&page=1&limit=3&sort=latest&facet=news&article_category=selectedNews'
      );
    });
  });

  it('getEvents method call', () => {
    ApiService.getEvents(jest.fn(), 1, 3, 'latest').then(() => {
      expect(ApiClient.get).toBeCalledWith('content?type=event&page=1&limit=3&sort=latest');
    });
  });

  it('getArticleById method call', () => {
    ApiService.getArticleById(jest.fn(), '1');

    expect(ApiClient.get).toBeCalledWith('articles?id=1');
  });

  it('getEventById method call', () => {
    ApiService.getEventById(jest.fn(), '1');

    expect(ApiClient.get).toBeCalledWith('events?id=1');
  });

  it('getNotifications method call', () => {
    ApiService.getNotifications(jest.fn());

    expect(ApiClient.get).toBeCalledWith('notifications');
  });

  it('getUserByNetworkId method call', () => {
    ApiService.getUserByNetworkId(jest.fn(), '1');

    expect(ApiClient.get).toBeCalledWith('users?networkID=1');
  });

  it('getUserByEmail method call', () => {
    ApiService.getUserByEmail(jest.fn(), 'Marion.Wirsig@umusic.com');

    expect(ApiClient.get).toBeCalledWith('users?email=Marion.Wirsig@umusic.com');
  });

  it('getUserByEmail method call with two emails', () => {
    ApiService.getUserByEmail(jest.fn(), 'Marion.Wirsig@umusic.com,Marcelo.Retana@umusic.com');

    expect(ApiClient.get).toBeCalledWith('users?email=Marion.Wirsig@umusic.com,Marcelo.Retana@umusic.com');
  });

  it('getProfile method call', () => {
    ApiService.getProfile(jest.fn());

    expect(ApiClient.get).toBeCalledWith('profile');
  });

  it('getMenuLinks method call', () => {
    ApiService.getMenuLinks(jest.fn());

    expect(ApiClient.get).toBeCalledWith(
      'grouped_content?type=link&group=category&category=24&limit=0&sort=alphabetic'
    );
  });

  it('getMinisiteLinks method call', () => {
    ApiService.getMinisiteLinks(jest.fn(), '137');

    expect(ApiClient.get).toBeCalledWith(
      'grouped_content?type=link,page,document,article,event&group=category&category=137&sort=alphabetic'
    );
  });

  it('getHomeArticles method call', () => {
    ApiService.getHomeArticles(jest.fn(), '3', 'latest');

    expect(ApiClient.get).toBeCalledWith('content?type=article&limit=3&sort=latest');
  });

  it('getHomeEvents method call', () => {
    ApiService.getHomeEvents(jest.fn());

    expect(ApiClient.get).toBeCalledWith('content?type=event&limit=3&sort=upcoming');
  });

  it('getEmployeeServices method call', () => {
    ApiService.getEmployeeServices(jest.fn());

    expect(ApiClient.get).toBeCalledWith('content?type=page,link&category=116&sort=alphabetic');
  });

  it('getDepartments method call', () => {
    ApiService.getDepartments(jest.fn());

    expect(ApiClient.get).toBeCalledWith('content?type=department,link&sort=alphabetic&category=23');
  });

  it('getDepartments method call with a param', () => {
    ApiService.getDepartment(jest.fn(), 1);

    expect(ApiClient.get).toBeCalledWith('department?id=1');
  });

  it('getOffice method call with a param', () => {
    ApiService.getOffice(jest.fn(), jest.fn(), '1');

    expect(ApiClient.get).toBeCalledWith('office?id=1');
  });

  it('getPeople method call with one param', () => {
    ApiService.getPeople(jest.fn(), 'USWHB', undefined, 1, 1).then(() => {
      expect(ApiClient.get).toBeCalledWith('officeusers?sitecode=USWHB&page=1&limit=1');
    });
  });

  it('getPeople method call with two params', () => {
    ApiService.getPeople(jest.fn(), 'USWHB', 'j', 1, 1).then(() => {
      expect(ApiClient.get).toBeCalledWith('officeusers?sitecode=USWHB&startsWith=j&page=1&limit=1');
    });
  });

  it('getLabels method call', () => {
    ApiService.getLabels(jest.fn());

    expect(ApiClient.get)
      .toBeCalledWith('content?type=label,link&sort=alphabetic&category=0');
  });

  it('getLabel method call with a param', () => {
    ApiService.getLabel(jest.fn(), 1);

    expect(ApiClient.get).toBeCalledWith('label?id=1');
  });

  it('getAppreciationData method call with 3 params and received type', () => {
    ApiService.getAppreciationData(jest.fn(), jest.fn(), 'received');

    expect(ApiClient.get).toBeCalledWith('appreciationCard?cardType=received');
  });

  it('getAppreciationData method call with 3 params and supervisor type', () => {
    ApiService.getAppreciationData(jest.fn(), jest.fn(), 'supervisor');

    expect(ApiClient.get).toBeCalledWith('appreciationCard?cardType=supervisor');
  });

  it('retrieveAppreciationCardTemplates method call with 3 params', () => {
    ApiService.retrieveAppreciationCardTemplates(jest.fn(), jest.fn());

    expect(ApiClient.get).toBeCalledWith('appreciationCard/templates');
  });

  // these 2 tests are skipe because we need to figure out a way to test POSTS
  it.skip('sendAppreciationCard method call with 3 params and the body of the request', () => {
    ApiService.sendAppreciationCard(jest.fn(), jest.fn(), {
      senderName: 'string',
      templateId: 'string',
      cardMessage: 'string',
      recipientEmail: 'string',
      recipientLastName: 'string',
      recipientFirstName: 'string',
      recipientSupervisorEmail: 'string'
    });

    expect(ApiClient.get).toBeCalledWith('appreciationCard');
  });

  it.skip('archiveAppreciationAlert method call with 3 params', () => {
    ApiService.archiveAppreciationAlert(jest.fn(), jest.fn(), '1');

    expect(ApiClient.get).toBeCalledWith('appreciationCard/archive');
  });
});
