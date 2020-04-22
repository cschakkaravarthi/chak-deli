import React, { FC, useEffect, useState, createRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { UserProfileModel, ContactList } from '../../shared/models/UserInfo.model';
import { Users } from '../../shared/models/OrgChart.model';
import { Card } from 'umgc_ui_library/lib/cards/card';
import { OrgChart } from 'umgc_ui_library/lib/components/orgChart';
import { ButtonWithIcon } from 'umgc_ui_library/lib/components/buttonWithIcon';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { emailQuery, getUserProfilePicture } from '../../utils/customHooks';
import images from '../../images/images';
import { ContentWrapper, BookmarkInput, BookmarkItem, TodoInput, TodoItem } from 'umgc_ui_library/lib';
// import AppreciationCardTableContainer from '../appreciationCards/AppreciationCardsTableContainer';
import Bookmark from '../../shared/models/Bookmark.model';
import Todo from '../../shared/models/Todo.model';
import { fetchBookmarks, saveBookmark, removeBookmark } from '../../shared/actions/bookmarkActions';
import { fetchTodos, saveTodo, removeTodo } from '../../shared/actions/todoActions';
import { AppreciationCardsListGrouped } from '../../shared/models/AppreciationCards.model';
import { AppState } from '../../shared/types/genericTypes';
import Skeleton from 'react-loading-skeleton';
import {
  fetchAddToContactRequest,
  removeSingleContact,
  uploadUserProfilePicture,
  removeProfilePic
} from '../../shared/actions/userProfileActions';
import { triggerToast } from '../../shared/actions/commonActions';
import { ConfirmationModal } from 'umgc_ui_library/lib/components/confirmationModal';
import Dropzone, { DropzoneRootProps, DropzoneRef } from 'react-dropzone';
import { IMAGE_TYPES, MAX_IMAGE_SIZE } from '../../constants/constants';
import { Partition } from 'umgc_ui_library/lib/components/partition';
import isEmpty from 'lodash.isempty';
import Error500CardWithTitle from '../../scenes/Errors/Error500CardWithTitle';
import { AlertModal } from 'umgc_ui_library/lib/components/alertModal';
import { MyContacts } from './MyContacts';

type Props = {
  isFetching?: boolean;
  userProfileDetails?: UserProfileModel;
  orgChartDetails?: Users;
  isCurrentUser?: boolean;
  bookmarks?: Bookmark[];
  fetchBookmarks?: <T>() => T;
  saveBookmark?: <T>(title: string, url: string) => Promise<T>;
  removeBookmark?: <T>(identifier: string) => Promise<T>;
  todos?: Todo[];
  fetchTodos?: <T>() => T;
  saveTodo?: <T>(text: string) => Promise<T>;
  removeTodo?: <T>(identifier: string) => Promise<T>;
  userContactList: ContactList[];
  removeSingleContact?: <T>(email: string) => T;
  removeContactSucess?: boolean;
  uploadUserProfilePicture?: <T>(photo: File) => Promise<T>;
  isUploading?: boolean;
  fetchAddToContactRequest?: <T>(email: string) => T;
  triggerToast?: <T>(message: string, toastError: boolean) => T;
  removeProfilePic?: <T>() => T;
  chartDataError?: boolean;
  isFetchingOrgChart?: boolean;
  appreciationCardsListGrouped?: AppreciationCardsListGrouped;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  todos: state.todoReducers.todos,
  bookmarks: state.bookmarkReducers.bookmarks,
  isUploading: state.userProfileReducers.isUploading,
  chartDataError: state.userProfileReducers.chartDataError,
  isFetchingOrgChart: state.userProfileReducers.isFetchingOrgChart,
  appreciationCardsListGrouped: state.appreciationReducers.appreciationCardsListGrouped
});

const actionCreators = {
  fetchBookmarks,
  saveBookmark,
  removeBookmark,
  fetchTodos,
  saveTodo,
  removeTodo,
  removeSingleContact,
  uploadUserProfilePicture,
  fetchAddToContactRequest,
  triggerToast,
  removeProfilePic
};

const MAX_BOOKMARKS = 10;
const MAX_TODOS = 10;

const UserProfileContainer: FC<Props> = props => {
  const {
    isFetching = false,
    userProfileDetails,
    orgChartDetails = {} as Users,
    isCurrentUser,
    bookmarks,
    fetchBookmarks,
    saveBookmark,
    removeBookmark,
    todos,
    fetchTodos,
    saveTodo,
    removeTodo,
    userContactList = [],
    removeSingleContact,
    uploadUserProfilePicture,
    isUploading,
    fetchAddToContactRequest,
    triggerToast,
    removeProfilePic,
    chartDataError,
    isFetchingOrgChart = false
    // Commented while we figure why it was still showing the appreciation cards for some people
    // appreciationCardsListGrouped = []
  } = props;

  const history = useHistory();
  const dropzoneRef = createRef<DropzoneRef>();

  const [deleteContactRequest, setdeleteContactRequest] = useState({
    showModal: false,
    email: ''
  });

  const [deleteTodoRequest, setDeleteTodoRequest] = useState({
    showModal: false,
    identifier: ''
  });

  const [deleteBookmarkRequest, setDeleteBookmarkRequest] = useState({
    showModal: false,
    identifier: ''
  });

  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [alertModalText, setAlertModalText] = useState<string>('');
  const [isLoadingPic, setIsLoadingPic] = useState<boolean>(false);

  useEffect(() => {
    fetchBookmarks && fetchBookmarks();
    fetchTodos && fetchTodos();
  }, []);

  if (!userProfileDetails) {
    return null;
  }

  const orgChartTileClick = emailQuery();

  const handleManagerAndSubsClicks = (value?: string): void => {
    orgChartTileClick.userEmailQuery(value);
  };

  const redirectToEdit = (): void => {
    history.push('/profile/edit', { userEmail: userProfileDetails.email });
  };

  let profilePictureUri = getUserProfilePicture(userProfileDetails.avatar);
  const isProfilePhotoPresent = !!(userProfileDetails.avatar && userProfileDetails.avatar.photo);

  const handleAddToContacts = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const email = userProfileDetails.email;
    if (email) {
      fetchAddToContactRequest!(email);
    }
  };

  const removeContactFromList = (email: string | undefined): void => {
    if (email) {
      removeSingleContact && removeSingleContact(email);
    }
    setdeleteContactRequest({ showModal: false, email: '' });
  };

  const handleChangePhoto = (): void => {
    if (isUploading) {
      return;
    }
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };

  const handleDeletePhoto = (): void => {
    removeProfilePic!();
  };

  const getFileDetails = (accepted: Array<File>, rejected: Array<File>): void => {
    let uploadedPic: File;
    if (accepted && accepted.length) {
      uploadedPic = accepted[0];

      if (!IMAGE_TYPES.includes(uploadedPic.name.slice(uploadedPic.name.lastIndexOf('.') + 1).toLowerCase())) {
        triggerToast && triggerToast('Unsupported format – Please upload a JPG, PNG, or GIF file', true);
      } else {
        setIsLoadingPic(true);
        uploadUserProfilePicture &&
          uploadUserProfilePicture(uploadedPic).finally(() => {
            setTimeout(() => {
              setIsLoadingPic(false);
            }, 1000);
          });
      }
    } else if (rejected && rejected.length > 0) {
      uploadedPic = rejected[0];
      if (uploadedPic.size > MAX_IMAGE_SIZE) {
        triggerToast && triggerToast('File size exceeded.  Please upload a file under 5mb.', true);
      } else if (!IMAGE_TYPES.includes(uploadedPic.name.slice(uploadedPic.name.lastIndexOf('.') + 1).toLowerCase())) {
        triggerToast && triggerToast('Unsupported format – Please upload a JPG, PNG, or GIF file', true);
      }
    }
  };

  // const showAppreciationTables = (): boolean => {
  //   const cardsListsGroupedKeys = Object.keys(appreciationCardsListGrouped);
  //   const groupLengthToBoolean = cardsListsGroupedKeys.map(groupKey => get(appreciationCardsListGrouped, `[${groupKey}].length`, 0) < 1);
  //   // If there's at least one false in the array it means at least we need to show one table
  //   const allGroupsEmpty = !groupLengthToBoolean.includes(false);
  //   return allGroupsEmpty;
  // };

  if (isLoadingPic) {
    profilePictureUri = '/assets/spinner.gif';
  }

  return (
    <Container className="user-profile-cards">
      <Row>
        <Col className="d-flex justify-content-between">
          <h3 className="font-weight-bold top-gap mb-3">
            {!isFetching ? userProfileDetails.fullName : <Skeleton width={200} />}
          </h3>
          {!isFetching ? (
            isCurrentUser && (
              <ButtonWithIcon
                title="Settings"
                handleClick={redirectToEdit}
                imageSrc={images.gearIcon}
                imageHeight={20}
                imageWidth={20}
                labelClassName="text-upper g700-text-clr text-hover-underline"
                className="top-gap mb-3 d-flex flex-nowrap"
              />
            )
          ) : (
            <span className="top-gap mb-3 d-flex flex-nowrap">
              <Skeleton width={150} />
            </span>
          )}
        </Col>
      </Row>
      <Row>
        <Col lg={7} className="mb-lg-0 mb-4">
          {profilePictureUri && (
            <Card
              isFetching={isFetching}
              type="people"
              variant="profile"
              imageUrl={profilePictureUri}
              wrapperClass="rounded-0"
              title={userProfileDetails.title}
              department={userProfileDetails.department}
              companyName={userProfileDetails.companyName}
              location={userProfileDetails.jobLocation}
              center={userProfileDetails.profitCenter}
              desk={userProfileDetails.desk}
              handleChangePhoto={handleChangePhoto}
              isCurrentUser={isCurrentUser}
              isUploading={isUploading}
              loader={images.spinner}
              handleDeletePhoto={handleDeletePhoto}
              hasProfilePhoto={isProfilePhotoPresent}
            />
          )}
        </Col>
        <Col lg={5} className="mb-lg-0 mb-4">
          <Card
            type="contactMe"
            variant="standard"
            title="Contact Me"
            isFetching={isFetching}
            handleClick={redirectToEdit}
            isCurrentUser={isCurrentUser}
            addToContactImage={images.add}
            email={userProfileDetails.email}
            mobile={userProfileDetails.mobileNumber}
            office={userProfileDetails.officeNumber}
            handleAddToContacts={handleAddToContacts}
          />
        </Col>
      </Row>
      <Row className="mt-lg-5 mb-lg-5">
        <Col lg={6} className="mb-lg-0 mb-4">
          <Card
            isFetching={isFetching}
            type="getToKnowMe"
            variant="standard"
            title="Get to know me"
            nickname={userProfileDetails.nickname}
            birthDay={userProfileDetails.birthday || ''}
            birthMonth={userProfileDetails.birthMonth || ''}
            anniversaryDay={userProfileDetails.anniversaryDay || ''}
            anniversaryMonth={userProfileDetails.anniversaryMonth || ''}
            languagesSpoken={userProfileDetails.languagesSpoken}
            professionalSkills={userProfileDetails.professionalSkills}
            currentlyWorking={userProfileDetails.currentlyWorking}
            aboutMe={userProfileDetails.aboutMe}
            handleClick={redirectToEdit}
            isCurrentUser={isCurrentUser}
          />
        </Col>
        <Col lg={6} className="mb-lg-0 mb-5">
          {!isFetching && orgChartDetails && !!Object.entries(orgChartDetails).length && (
            <OrgChart
              Users={orgChartDetails}
              handleManagerClick={handleManagerAndSubsClicks}
              handleSubordinateClick={handleManagerAndSubsClicks}
            />
          )}
          {isFetching && <OrgChart Users={{} as Users} isFetching={true} />}
          {(chartDataError || isEmpty(orgChartDetails)) && !isFetchingOrgChart && (
            <Error500CardWithTitle title="Org Chart" topBorder="darkTurquoise" className="card-title h5" />
          )}
        </Col>
      </Row>
      {isCurrentUser && <Partition message="The information below is private" className="margin-bottom-40" />}
      {isCurrentUser && (
        <>
          <MyContacts
            isFetching={isFetching}
            isCurrentUser={isCurrentUser}
            userContactList={userContactList}
            setdeleteContactRequest={setdeleteContactRequest}
          />

          {/* { showAppreciationTables() && <AppreciationCardTableContainer /> } */}

          <Row className="mb-5">
            <Col>
              <ContentWrapper title="" wrapperClass="h-100" topBorder="darkTurquoise">
                <h6 className="font-weight-bold pb-2 my-toolkit-spacing">
                  {!isFetching ? 'MY TOOLKIT' : <Skeleton width={120} />}
                </h6>
                <Container>
                  <Row>
                    <p className="font-weight-bold text-condensed py-1 pb-0 mb-0">
                      {!isFetching ? 'Bookmarks' : <Skeleton width={100} />}{' '}
                      <span className="ml-3 font-size-sm gray-600 font-weight-normal">
                        {!isFetching ? 'Up to 10' : <Skeleton width={105} />}
                      </span>
                    </p>
                  </Row>
                  {!isFetching ? (
                    <BookmarkInput
                      handleSave={(url, title) => {
                        if (url && title && saveBookmark) {
                          if (bookmarks && bookmarks.length >= MAX_BOOKMARKS) {
                            setAlertModalText(`You have already saved ${MAX_BOOKMARKS} bookmark items`);
                            setAlertModal(true);
                          } else {
                            saveBookmark(title, url).then(() => {
                              fetchBookmarks!();
                            });
                          }
                        } else {
                          setAlertModalText('Bookmark title and URL are required');
                          setAlertModal(true);
                        }
                      }}
                    />
                  ) : (
                    <Skeleton />
                  )}
                  {!isFetching ? (
                    bookmarks &&
                    bookmarks.map(bookmark => (
                      <BookmarkItem
                        key={bookmark.identifier}
                        identifier={bookmark.identifier}
                        title={bookmark.title}
                        url={bookmark.url}
                        handleDelete={identifier => {
                          setDeleteBookmarkRequest({ showModal: true, identifier });
                        }}
                      />
                    ))
                  ) : (
                    <Skeleton height={35} />
                  )}
                  <Row className="pt-4">
                    <p className="font-weight-bold text-condensed py-1 pb-0 mb-0">
                      {!isFetching ? 'To Do List' : <Skeleton width={100} />}{' '}
                      <span className="ml-3 font-size-sm gray-600 font-weight-normal">
                        {!isFetching ? 'Up to 10' : <Skeleton width={105} />}
                      </span>
                    </p>
                  </Row>
                  {!isFetching ? (
                    <TodoInput
                      handleSave={text => {
                        if (text && saveTodo) {
                          if (todos && todos.length >= MAX_TODOS) {
                            setAlertModalText(`You have already saved ${MAX_TODOS} to do items`);
                            setAlertModal(true);
                          } else {
                            saveTodo(text).then(() => {
                              fetchTodos && fetchTodos();
                            });
                          }
                        } else {
                          setAlertModalText('To do item text is required');
                          setAlertModal(true);
                        }
                      }}
                    />
                  ) : (
                    <Skeleton />
                  )}
                  {!isFetching ? (
                    todos &&
                    todos.map(todo => (
                      <TodoItem
                        key={todo.identifier}
                        identifier={todo.identifier}
                        text={todo.text}
                        handleDelete={(identifier: string) => {
                          setDeleteTodoRequest({ showModal: true, identifier });
                        }}
                      />
                    ))
                  ) : (
                    <Skeleton height={35} />
                  )}
                </Container>
              </ContentWrapper>
            </Col>
          </Row>
        </>
      )}

      <ConfirmationModal
        dialogMessage="Are you sure you want to remove this contact?"
        show={deleteContactRequest.showModal}
        okayButtonText="Remove"
        handleClose={() => setdeleteContactRequest({ showModal: false, email: '' })}
        handleSave={() => removeContactFromList(deleteContactRequest.email)}
      />

      <ConfirmationModal
        dialogMessage="Are you sure you want to remove this to do item?"
        show={deleteTodoRequest.showModal}
        okayButtonText="Remove"
        handleClose={() => setDeleteTodoRequest({ showModal: false, identifier: '' })}
        handleSave={() => {
          removeTodo &&
            removeTodo(deleteTodoRequest.identifier).then(() => {
              fetchTodos && fetchTodos();
            });
          setDeleteTodoRequest({ showModal: false, identifier: '' });
        }}
      />

      <ConfirmationModal
        dialogMessage="Are you sure you want to remove this bookmark?"
        show={deleteBookmarkRequest.showModal}
        okayButtonText="Remove"
        handleClose={() => setDeleteBookmarkRequest({ showModal: false, identifier: '' })}
        handleSave={() => {
          removeBookmark &&
            removeBookmark(deleteBookmarkRequest.identifier).then(() => {
              fetchBookmarks && fetchBookmarks();
            });
          setDeleteBookmarkRequest({ showModal: false, identifier: '' });
        }}
      />

      <AlertModal
        show={alertModal}
        dialogMessage={alertModalText}
        alertButtonText="Ok"
        handleClose={() => setAlertModal(false)}
      />

      <Dropzone
        ref={dropzoneRef}
        maxSize={MAX_IMAGE_SIZE}
        multiple={false}
        accept="image/*"
        onDrop={(acceptedFiles: Array<File>, rejectedFiles: Array<File>) =>
          getFileDetails(acceptedFiles, rejectedFiles)
        }
      >
        {({ getRootProps, getInputProps }: DropzoneRootProps) => {
          return (
            <div {...getRootProps({ className: 'dropzone d-none' })}>
              <input {...getInputProps()} />
            </div>
          );
        }}
      </Dropzone>
    </Container>
  );
};
export default connect(mapState, actionCreators)(UserProfileContainer);
