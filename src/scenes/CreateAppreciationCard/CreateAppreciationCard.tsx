import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { NewAppreciationCardForm } from '../../shared/types/appreciationTypes';
import { AppState } from '../../shared/types/genericTypes';
import {
  setNewCardDetail,
  getAppreciationCardTemplates,
  setDetailGroup,
  clearNewCardForm,
  sendAppreciationCard,
  toggleSentSuccessAlert
} from '../../shared/actions/appreciationActions';
import { AppreciationCardTemplate } from '../../shared/models/AppreciationCards.model';
import PeopleModel from '../../shared/models/People.model';
import { useQuery } from '../../utils/customHooks';
import {
  fetchSearchSuggestion,
  clearSearchSuggestionList,
  fetchSearchResults,
  clearSearchResults
} from '../../shared/actions/searchResultAction';
import { AUTO_SUGGEST_LIMIT } from '../../constants/constants';
import { triggerToast } from '../../shared/actions/commonActions';

// Components
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { ContentWrapper, Card, UploadButton, Textarea } from 'umgc_ui_library';
import { AlertModal } from 'umgc_ui_library/lib/components/alertModal';
import { GenericAutoSuggest as AutoSuggest, HandleSelectedResponseParams } from '../../components/genericAutoSuggest/GenericAutoSuggest';
import ModalAppreciationCardPreview from '../../components/appreciationCards/ModalAppreciationCardPreview';
import { CurrentUser } from '../../shared/types/commonTypes';

export interface SearchSuggest {
  value: string;
  label: string;
}

type Props = {
  currentUsername: CurrentUser;
  newAppreciationCardForm: NewAppreciationCardForm;
  setNewCardDetail: (field: string, value: string) => void;
  getAppreciationCardTemplates: () => void;
  cardTemplates: AppreciationCardTemplate[];
  searchSuggestions?: SearchSuggest[];
  clearSearchSuggestionList?: () => void;
  fetchSearchSuggestion?: (query: string, limit: string, category: string) => void;
  people?: PeopleModel[];
  setDetailGroup: (payload: NewAppreciationCardForm) => void;
  clearNewCardForm: () => void;
  sendAppreciationCard: (cardDetails: NewAppreciationCardForm) => void;
  showSentSucessAlert: boolean;
  toggleSentSuccessAlert: (showSentSucessAlert: boolean) => void;
  fetchSearchResults?: (scroll?: boolean, page?: number, query?: string, limit?: number, type?: string) => void;
  triggerToast?: (message: string, toastError: boolean) => void;
  clearSearchResults?: () => void;
};

const mapState: any = (state: AppState, props: Props): Props => ({
  ...props,
  currentUsername: state.commonReducers.currentUsername,
  newAppreciationCardForm: state.appreciationReducers.newAppreciationCardForm,
  cardTemplates: state.appreciationReducers.cardTemplates,
  searchSuggestions: state.searchResultReducers.searchSuggestions,
  people: state.searchResultReducers.people,
  showSentSucessAlert: state.appreciationReducers.showSentSucessAlert
});

const actionCreators = {
  setNewCardDetail,
  getAppreciationCardTemplates,
  clearSearchSuggestionList,
  fetchSearchSuggestion,
  fetchSearchResults,
  setDetailGroup,
  clearNewCardForm,
  sendAppreciationCard,
  triggerToast,
  toggleSentSuccessAlert,
  clearSearchResults
};

export const CreateAppreciationCard: FC<Props> = props => {
  const {
    currentUsername,
    newAppreciationCardForm,
    setNewCardDetail,
    getAppreciationCardTemplates,
    cardTemplates,
    searchSuggestions = [],
    clearSearchSuggestionList,
    fetchSearchSuggestion,
    fetchSearchResults,
    people,
    triggerToast,
    setDetailGroup,
    clearNewCardForm,
    sendAppreciationCard,
    showSentSucessAlert,
    toggleSentSuccessAlert,
    clearSearchResults
  } = props;

  // State
  const [displayCardPreview, toggleCardPreview] = useState<boolean>(false);
  const [autoSuggestInputField, setAutoSuggestInputField] = useState<string>('');
  const [cardSent, setCardSentValue] = useState<boolean>(false);

  const query = useQuery();
  let searchKeyWord = '';
  searchKeyWord = query.get('q');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setNewCardDetail(name, value);
  };

  const handleSelectCard = (templateId: string): void => {
    setNewCardDetail('templateId', templateId);
  };

  const handleSelected = (suggested: HandleSelectedResponseParams): void => {
    clearSearchSuggestionList && clearSearchSuggestionList();
    if (suggested.email) {
      fetchSearchResults && fetchSearchResults(false, 1, suggested.email, 5, 'people');
    }
  };

  const getSuggestions = (value: string): void => {
    clearSearchSuggestionList && clearSearchSuggestionList();
    fetchSearchSuggestion && fetchSearchSuggestion(value, AUTO_SUGGEST_LIMIT, 'people');
  };

  const submitAppreciationCard = (): void => {
    sendAppreciationCard(newAppreciationCardForm);
    clearNewCardForm();
    toggleCardPreview(false);
    setCardSentValue(true);
  };

  const repeteadEmailError = "Recipient and Supervisor's email can't be the same";

  const checkErrorsOnForm = (e: React.SyntheticEvent): ReturnType<() => void> => {
    e.preventDefault();

    const { recipientEmail, recipientSupervisorEmail, cardMessage, templateId } = newAppreciationCardForm;

    if (!recipientEmail || !cardMessage || !templateId) {
      return triggerToast!('All fields are required', true);
    }

    if (recipientEmail === recipientSupervisorEmail && recipientEmail && recipientSupervisorEmail) {
      return triggerToast!(repeteadEmailError, true);
    }

    return toggleCardPreview(true);
  };

  const onRecipientClearClick = (): void => setDetailGroup({
    recipientEmail: '',
    recipientLastName: '',
    recipientFirstName: ''
  });

  const onSuperVisorClearClick = (): void => setDetailGroup({
    recipientSupervisorEmail: '',
    managerName: ''
  });

  const supervisorAutoPopulatedValue = (): string => {
    if (!get(newAppreciationCardForm, 'managerName.length')) return '';
    return `${newAppreciationCardForm.managerName} - ${newAppreciationCardForm.recipientSupervisorEmail}`;
  };

  useEffect(() => {
    getAppreciationCardTemplates();
    return () => clearNewCardForm();
  }, []);

  useEffect(() => {
    if (people && people.length) {
      const { firstName, lastName, email = '', managerEmail, managerName } = people[0];
      if (autoSuggestInputField === 'recipient') {
        setDetailGroup({
          recipientEmail: email,
          recipientLastName: lastName,
          recipientFirstName: firstName,
          recipientSupervisorEmail: managerEmail,
          managerName
        });
      } else if (autoSuggestInputField === 'supervisor') {
        setNewCardDetail('recipientSupervisorEmail', email);
      }

      // Reset autoSuggestInputField value after setting card details
      setAutoSuggestInputField('');
      clearSearchResults!();
    }
  }, [people]);

  useEffect(() => {
    const { recipientEmail, recipientSupervisorEmail } = newAppreciationCardForm;
    if (recipientEmail === recipientSupervisorEmail && recipientEmail && recipientSupervisorEmail) {
      return triggerToast!(repeteadEmailError, true);
    }
  }, [newAppreciationCardForm.recipientEmail, newAppreciationCardForm.recipientSupervisorEmail]);

  useEffect(() => {
    // As soon as templates are loaded, it sets the first template as selected by default
    if (cardTemplates.length) {
      setNewCardDetail('templateId', get(cardTemplates, '[0]templateId'));
    }
  }, [cardTemplates]);

  return (
    <Container className="content-full mt-5 mb-5 appreciation-card-form">
      <ModalAppreciationCardPreview
        preSendMode={true}
        viewCard={displayCardPreview}
        preSendModeAction={() => submitAppreciationCard()}
        handleCardModalClose={() => toggleCardPreview(false)}
        cardInfo={{
          topImg: get(cardTemplates.find(template => template.templateId === newAppreciationCardForm.templateId), 'topImg', ''),
          senderLastName: currentUsername.family_name,
          senderFirstName: currentUsername.given_name,
          bottomImg: get(cardTemplates.find(template => template.templateId === newAppreciationCardForm.templateId), 'bottomImg', ''),
          cardMessage: newAppreciationCardForm.cardMessage || '',
          recipientEmail: newAppreciationCardForm.recipientEmail || '',
          recipientLastName: newAppreciationCardForm.recipientLastName || '',
          recipientFirstName: newAppreciationCardForm.recipientFirstName || ''
        }}
      />
      <AlertModal
        show={showSentSucessAlert}
        dialogMessage="Your Appreciation Card was sent."
        handleClose={() => toggleSentSuccessAlert(false)}
      />
      <h2 className="font-size-xl mb-5">
        <b>Send Appreciation Card</b>
      </h2>
      <ContentWrapper topBorder="darkTurquoise" title="">
        <Form className="font-size-sm w-100 form-user-description mt-4 create-appreciation-card-form">
          <Form.Row className="d-flex justify-content-between">
            <Col xs={12} sm={6}>
              <Form.Group controlId="formRecipient" className="pr-md-2">
                <label className="font-weight-bold text-condensed font-size-base font-weight-bold form-label">
                  Recipient
                </label>
                <AutoSuggest
                  suggestionValue={searchKeyWord}
                  placeHolder="Search"
                  miniNoOfCharsShowSuggestions={2}
                  suggestions={autoSuggestInputField === 'recipient' ? searchSuggestions : []}
                  handleSelected={handleSelected}
                  getSuggestions={getSuggestions}
                  alwaysRenderSuggestions={false}
                  showClearButton={get(newAppreciationCardForm, 'recipientEmail.length', false)}
                  onClearClick={onRecipientClearClick}
                  showEmail={true}
                  onInputChange={() => setAutoSuggestInputField('recipient')}
                  id="recipient"
                  shouldClearInput={cardSent}
                  clearCallback={() => setCardSentValue(false)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Group controlId="formRecipientSupervisor" className="pr-md-2">
                <label className="font-weight-bold text-condensed font-size-base font-weight-bold form-label">
                  Recipient's Supervisor
                </label>
                <AutoSuggest
                  suggestionValue={searchKeyWord || supervisorAutoPopulatedValue()}
                  placeHolder="Search"
                  miniNoOfCharsShowSuggestions={2}
                  suggestions={autoSuggestInputField === 'supervisor' ? searchSuggestions : []}
                  handleSelected={handleSelected}
                  getSuggestions={getSuggestions}
                  alwaysRenderSuggestions={false}
                  showClearButton={get(newAppreciationCardForm, 'recipientSupervisorEmail.length', false)}
                  onClearClick={onSuperVisorClearClick}
                  showEmail={true}
                  onInputChange={() => setAutoSuggestInputField('supervisor')}
                  id="supervisor"
                  shouldClearInput={cardSent}
                  clearCallback={() => setCardSentValue(false)}
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Textarea
            rows={3}
            maxLength={400}
            label="Message"
            name="cardMessage"
            controlId="cardMessage"
            handleChange={e => handleInputChange(e)}
            value={newAppreciationCardForm.cardMessage}
            className="font-weight-bold text-condensed font-size-base"
            subLabel="Maximum 400 characters"
          />
          <h5 className="font-weight-bold text-condensed font-size-base">Select a card</h5>
          <Container className="p-0 m-0">
            <Form.Row className="d-flex justify-content-between">
              {cardTemplates.map(template => (
                <Col sm={6} className="mb-3" key={template.templateId}>
                  <div
                    className={
                      template.templateId === newAppreciationCardForm.templateId
                        ? 'selected-appreciation-card-template'
                        : undefined
                    }
                  >
                    <Card
                      title=""
                      variant="thumbnail"
                      type="appreciation"
                      imgTopSrc={template.topImg}
                      imgBottomSrc={template.bottomImg}
                      onClick={() => handleSelectCard(template.templateId)}
                    />
                  </div>
                </Col>
              ))}
            </Form.Row>
          </Container>
          <UploadButton
            title="Preview Card"
            className="text-upper float-right mt-5"
            handleClick={e => checkErrorsOnForm(e)}
          />
        </Form>
      </ContentWrapper>
    </Container>
  );
};

export default connect(mapState, actionCreators)(CreateAppreciationCard);
