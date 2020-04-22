import moxios from 'moxios';
import { dummyAppreciationCardNotification } from '../models/Notification.model';
import {
  loadAppreciationManagerAlertAction,
  loadAppreciationAlertAction,
  toggleSentSuccessAlert,
  archiveAlertState,
  loadAppreciationError,
  setNewCardDetail,
  setDetailGroup,
  fetchCardTemplates,
  fetchRequest,
  clearNewCardForm
} from './appreciationActions';

const templateMock = [{ templateId: '1', topImg: 'topImg', bottomImg: 'bottomImg', active: true }];

describe('appreciation cards actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates a clearNewCardForm action', () => {
    expect(clearNewCardForm()).toMatchSnapshot();
  });

  it('creates a fetchRequest action', () => {
    expect(fetchRequest()).toMatchSnapshot();
  });

  it('creates a fetchCardTemplates action', () => {
    expect(fetchCardTemplates(templateMock)).toMatchSnapshot();
  });

  it('creates a setDetailGroup action', () => {
    expect(setDetailGroup({ senderName: 'marcelo' })).toMatchSnapshot();
  });

  it('creates a setNewCardDetail action', () => {
    expect(setNewCardDetail('field', 'value')).toMatchSnapshot();
  });

  it('creates a loadAppreciationError action', () => {
    expect(loadAppreciationError({ message: 'Error' })).toMatchSnapshot();
  });

  it('creates a loadAppreciationAlertAction action', () => {
    expect(loadAppreciationAlertAction([dummyAppreciationCardNotification])).toMatchSnapshot();
  });

  it('creates a loadAppreciationManagerAlertAction action', () => {
    expect(loadAppreciationManagerAlertAction([dummyAppreciationCardNotification])).toMatchSnapshot();
  });

  it('creates a toggleSentSuccessAlert action', () => {
    expect(toggleSentSuccessAlert(true)).toMatchSnapshot();
  });

  it('creates a archiveAlertState action', () => {
    expect(archiveAlertState(true)).toMatchSnapshot();
  });
});
