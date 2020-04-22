import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import get from 'lodash.get';
import { GetToKnowMeForm } from 'umgc_ui_library/lib/userProfileforms/getToKnowMeForm';
import { ContactMeForm } from 'umgc_ui_library/lib/userProfileforms/contactMeForm';
import { UserProfileModel, UserProfileUpdateResponse } from '../../shared/models/UserInfo.model';
import { AlertModal } from 'umgc_ui_library/lib/components/alertModal';
import { validateDate } from '../../shared/services/date';

type Props = {
  userDetails: Omit<UserProfileModel, 'title'>;
  setUserProfileData?: <T>(userInput: Omit<UserProfileModel, 'title'>) => T;
  isUserProfileUpdate?: boolean;
  userProfileUpdateErrorMessage: string;
  isUserProfileUpdateError: boolean;
  updateUserProfileData?: (validationError: UserProfileUpdateResponse) => void;
};

const UserEditContainer: FC<Props> = props => {
  const {
    userDetails,
    setUserProfileData,
    isUserProfileUpdate,
    userProfileUpdateErrorMessage,
    updateUserProfileData
  } = props;
  const [userInput, setUserInput] = useState();
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const historyData = useHistory();
  const dobErrorMessage = { validDateError: 'Please enter valid date for Birthday.', bothFieldError: 'Please enter both month and date for Birthday.' };
  const workAnniversaryErrorMessage = { validDateError: 'Please enter valid date for Anniversary.', bothFieldError: 'Please enter both month and date for Anniversary.' };

  useEffect(() => {
    setUserInput(userDetails);
  }, [userDetails]);

  const handleSave = (): void => {
    const validateDob = validateDate(userInput.birthday, userInput.birthMonth, dobErrorMessage);
    const validateAnniversary = validateDate(userInput.anniversaryDay, userInput.anniversaryMonth, workAnniversaryErrorMessage);
    if (validateDob || validateAnniversary) {
      updateUserProfileData && updateUserProfileData({ userProfileUpdateErrorMessage: validateDob || validateAnniversary, isUserProfileUpdateError: true });
      setAlertModal(true);
    } else {
      setAlertModal(false);
      setUserProfileData && setUserProfileData(userInput);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const field = event.target.name;
    setUserInput({ ...userInput, [field]: event.target.value } as Omit<UserProfileModel, 'title'>);
  };

  const redirectToProfile = (): void => {
    historyData.push('/profile');
  };

  return (
    <>
      {get(get(userDetails, 'error'), 'isError') ? (
        <p>{get(userDetails, 'message')}</p>
      ) : (
        <Container>
          <Row className='mb-4 article-list-header'>
            <Col md={12}>
              <div className="font-weight-bold font-size-lg">User Settings</div>
            </Col>
          </Row>

          <Row className="no-gutters mt-4">
            <ContactMeForm
              title="Contact Me"
              mobileNumberMaxLength={20}
              mobileNumber={get(userInput, 'mobileNumber')}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
              handleSave={handleSave}
              handleCancel={redirectToProfile}
            />
          </Row>

          <Row className="no-gutters mt-4">
            <GetToKnowMeForm
              title="Get To Know Me"
              textBoxMaxLength={100}
              textArearBoxMaxLength={250}
              nickname={get(userInput, 'nickname') || '' }
              birthDay={get(userInput, 'birthday') || ''}
              birthMonth={get(userInput, 'birthMonth') || ''}
              anniversaryDay={get(userInput, 'anniversaryDay') || ''}
              anniversaryMonth={get(userInput, 'anniversaryMonth') || ''}
              languagesSpoken={get(userInput, 'languagesSpoken') || ''}
              professionalSkills={get(userInput, 'professionalSkills') || ''}
              currentlyWorking={get(userInput, 'currentlyWorking') || ''}
              aboutMe={get(userInput, 'aboutMe') || ''}
              handleSave={handleSave}
              handleCancel={redirectToProfile}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </Row>

          <AlertModal
            show={alertModal}
            dialogMessage={userProfileUpdateErrorMessage}
            alertButtonText="Ok"
            handleClose={() => setAlertModal(false)}
          />

          {!isUserProfileUpdate && !userProfileUpdateErrorMessage && redirectToProfile()}

        </Container>
      )}
    </>
  );
};

export default UserEditContainer;
