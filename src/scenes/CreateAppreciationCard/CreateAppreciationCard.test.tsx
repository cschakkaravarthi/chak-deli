import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CreateAppreciationCard } from './CreateAppreciationCard';
import { shallowRender } from '../../shared/services/testHelper';

describe('CreateAppreciationCard', () => {
  const newAppreciationCardForm = {
    templateId: 'templateId1',
    recipientEmail: 'recipient@email.com',
    recipientFirstName: 'First Name',
    recipientLastName: 'Last Name',
    cardMessage: 'Card Message',
    recipientSupervisorEmail: 'supervisor@email.com'
  };

  const mockedProps = {
    newAppreciationCardForm,
    setNewCardDetail: jest.fn(),
    handleSelectCard: jest.fn(),
    handlePreviewClick: jest.fn(),
    currentUsername: { given_name: 'Marcelo', family_name: 'Retana' },
    getAppreciationCardTemplates: jest.fn(),
    clearSearchSuggestionList: jest.fn(),
    cardTemplates: [],
    searchSuggestions: [],
    setDetailGroup: jest.fn(),
    clearNewCardForm: jest.fn(),
    sendAppreciationCard: jest.fn(),
    showSentSucessAlert: false,
    toggleSentSuccessAlert: jest.fn()
  };

  it('renders a CreateAppreciationCard', () => {
    const tree = shallowRender(
      <MemoryRouter keyLength={0}>
        <CreateAppreciationCard {...mockedProps} />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
