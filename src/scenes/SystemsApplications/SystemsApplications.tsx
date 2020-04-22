import React, { FC, useEffect, useState } from 'react';
import { fetchSystemsApplications } from '../../shared/actions/systemsApplicationsActions';
import { AppState } from '../../shared/types/genericTypes';
import { Card, AlphabeticalLine } from 'umgc_ui_library';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { SystemApplicationItem } from '../../shared/models/SystemsApplications.model';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { alphabet } from '../../constants/constants';
import images from '../../images/images';
import { OnError as IsEmpty } from '../../components/error/Error';

type Props = {
  isFetching?: boolean;
  applications?: SystemApplicationItem[];
  fetchSystemsApplications?: (filterBy?: string) => void;
};

const mapState = (state: AppState, props: Props): Props => ({
  ...props,
  applications: state.systemsApplicationsReducers.applications,
  isFetching: state.systemsApplicationsReducers.isFetching
});

const actionCreators = {
  fetchSystemsApplications
};

export const SystemsApplications: FC<Props> = props => {
  const {
    isFetching,
    applications,
    fetchSystemsApplications
  } = props;

  const [isActive, setIsActive] = useState('');

  useEffect(() => {
    if (isActive && isActive !== '') {
      fetchSystemsApplications!(isActive);
    } else {
      fetchSystemsApplications!();
    }
  }, [isActive]);

  const handleActiveItem = (letter: string): void => {
    setIsActive(letter);
  };

  const clearFilter = (): void => {
    setIsActive('');
  };

  return (
    <Container className="mt-5">
      <Row>
        <h1 className="font-size-xl font-weight-bold pl-3 pb-5">Systems & Applications</h1>
      </Row>
      <Row>
        <Col>
          <Form className="d-flex d-md-none justify-content-start justify-content-md-end py-3">
            <Form.Label className="d-flex justify-content-start justify-content-md-end mr-3 mb-0 align-items-center">
              By letter:
            </Form.Label>
            <Form.Control
              size="sm"
              as="select"
              value={isActive}
              id="filter-alphabet"
              name="filter-alphabet"
              className="w-auto rounded-0"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleActiveItem && handleActiveItem(e.target.value)
              }
            >
              <option value={0}>Choose a letter</option>
              {alphabet.map((item: string) => (
                <option key={item} value={item}>
                  {item.toUpperCase()}
                </option>
              ))}
            </Form.Control>
          </Form>
          <div className="pb-3 alphabetical-line d-none d-md-flex flex-wrap justify-content-md-between">
            {alphabet.map((item: string) => (
              <AlphabeticalLine
                className="pr-3 p-md-0"
                key={item.toUpperCase()}
                letter={item.toUpperCase()}
                isActive={item === isActive}
                onClick={() => handleActiveItem && handleActiveItem(item)}
              />
            ))}
          </div>
        </Col>
      </Row>
      {isActive && (
        <Row>
          <Col className="d-flex just-content-start align-items-baseline">
            <p className="font-size-sm">Filtered by:</p>
            <button onClick={clearFilter} className="ml-2 mr-1">
              <img src={images.removeFilter} alt="clean filter" width="15" height="15" />
            </button>
            <p className="font-size-sm">Letter: <strong> {isActive.toUpperCase()}</strong></p>
          </Col>
        </Row>
      )}
      {applications && !!applications.length && <Row className="mb-5">
        {Array.isArray(applications) && applications.map((app, index) => {
          return (
            <Col xs={12} sm={6} md={6} lg={4} className="pb-4" key={index}>
              <Card
                type="systemAndApplication"
                variant="standard"
                title={app.name}
                bodySummary={app.shortDescription}
                technicalContactName={app.supportedBy}
                businessOwnerName={app.ownedBy}
                appOwnerName={app.managedBy}
                url={app.url}
                isFetching={isFetching}
                businessOwnerEmail={app.ownedByEmail}
                appOwnerEmail={app.managedByEmail}
                technicalContactEmail={app.supportedByEmail}
              />
            </Col>
          );
        })}
      </Row>}
      <Row>
        <Col>
          {!isFetching && applications && !applications.length && <IsEmpty />}
          {isFetching && (!applications || !applications.length) && (
            <Col className="p-5 d-flex justify-content-center text-secondary">
              <strong>Fetching applications ...</strong>
            </Col>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default connect(mapState, actionCreators)(SystemsApplications);
