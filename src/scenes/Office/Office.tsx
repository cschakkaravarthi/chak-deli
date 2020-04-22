import React, { FC, useRef, useState, useEffect, PropsWithChildren } from 'react';
import { AppState } from '../../shared/types/genericTypes';
import { match } from 'react-router';
import { Office as OfficeModel } from '../../shared/models/Office.model';
import get from 'lodash.get';
import { fetchOffice, clearOfficeAction } from '../../shared/actions/officeActions';
import { Card, ContentWrapper } from 'umgc_ui_library/lib';
import Container from 'react-bootstrap/Container';
import createDOMPurify from 'dompurify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from '../../shared/models/Link.model';
import { fetchFacilities, clearLinksAction } from '../../shared/actions/linkActions';
import OnError from '../../components/error/Error';
import Facilities from '../../components/facilities/Facilities';
import { connect } from 'react-redux';
import PeopleContainer from '../../components/peopleContainer/PeopleContainer';
import PeopleModel from '../../shared/models/People.model';
import { clearPeople, fetchPeople } from '../../shared/actions/peopleActions';
import { PEOPLE_LIMIT } from '../../constants/constants';
import Error404 from '../Errors/Error404';

import { fetchContent, fetchContentType } from '../../shared/actions/contentActions';
import { toQueryString } from '../../utils/content';
import { ContentQueryParamsType, VariousContentModel } from '../../shared/types/contentTypes';

type Props = {
  match?: match;
  links?: Link[];
  facilities?: Link[];
  office?: OfficeModel;
  isLastPage: boolean;
  officeError?: boolean;
  people?: PeopleModel[];
  clearPeople?: () => void;
  facilitiesError?: boolean;
  clearLinksAction?: () => void;
  clearOfficeAction?: () => void;
  content?: VariousContentModel[];
  fetchContent?: fetchContentType;
  paramSet?: ContentQueryParamsType;
  fetchFacilities?: (drupalId?: number) => void;
  fetchOffice?: (officeId: string | number) => Promise<void>;
  fetchPeople?: <T>(sitecode: string, startsWith?: string, limit?: number) => T;
};

const mapState = (state: AppState, props: Props): Props => {
  const office = state.officeReducers.office;

  const paramSet: ContentQueryParamsType = {
    type: 'page,link,box',
    category: office?.drupal_id
  };

  const content = state.contentReducers.content[toQueryString(paramSet)];

  return {
    ...props,
    office,
    paramSet,
    people: state.peopleReducers.people,
    content: content ? content.content : [],
    isLastPage: state.peopleReducers.isLastPage,
    officeError: state.officeReducers.officeError,
    facilitiesError: state.linkReducers.facilitiesError
  };
};

const actionCreators = {
  fetchOffice,
  clearPeople,
  fetchPeople,
  fetchContent,
  fetchFacilities,
  clearLinksAction,
  clearOfficeAction
};

export const Office: FC<Props> = props => {
  const {
    match,
    office,
    people,
    content,
    paramSet,
    isLastPage,
    fetchPeople,
    officeError,
    fetchOffice,
    clearPeople,
    fetchContent,
    facilitiesError,
    clearLinksAction,
    clearOfficeAction
  } = props;

  const [isFetching, setIsFetching] = useState<boolean>(true);

  const val = useRef<PropsWithChildren<any> | any>();

  useEffect(() => {
    val.current = props;
  }, [props]);

  const urlOfficeId = parseInt(get(match, 'params.id'), 10);

  if (!urlOfficeId) {
    if (!isFetching) {
      return <Error404 />;
    } else {
      return null;
    }
  }

  const [isActive, setIsActive] = useState('');

  let getAdKey: string;

  useEffect(() => {
    getAdKey = '';
    if (urlOfficeId && fetchOffice) {
      fetchOffice(urlOfficeId)
        .then(() => {
          setIsFetching(false);
        })
        .catch(() => {
          setIsFetching(false);
        });
    } else {
      setIsFetching(false);
    }
  }, []);

  const asStringType = [] as string[];

  getAdKey =
    get(office, 'ad_key', asStringType).length > 1
      ? get(office, 'ad_key', asStringType).join()
      : get(office, 'ad_key', asStringType)[0];

  useEffect(() => {
    // this fetches the facilities for now
    fetchContent!(paramSet || {}, undefined, content ? content.length : 0, undefined);
    if (getAdKey && fetchPeople) {
      fetchPeople(getAdKey, undefined, PEOPLE_LIMIT);
    }
  }, [office?.drupal_id]);

  useEffect(() => {
    if (fetchPeople && clearPeople && getAdKey) {
      clearPeople();
      if (isActive) {
        fetchPeople(getAdKey, isActive, PEOPLE_LIMIT);
      } else {
        fetchPeople(getAdKey, undefined, PEOPLE_LIMIT);
      }
    }
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (office) {
        clearPeople!();
        clearLinksAction!();
        clearOfficeAction!();
      }
    };
  }, [val.current?.office?.drupal_id]);

  const handleActiveItem = (letter: string): void => {
    setIsActive(letter);
  };

  const triggerFetchPeople = (): Promise<any> | undefined => {
    if (!isLastPage) {
      return fetchPeople && fetchPeople(getAdKey, isActive, PEOPLE_LIMIT);
    }

    return undefined;
  };

  if (!office) {
    if (!isFetching) {
      return <Error404 />;
    } else {
      return null;
    }
  }

  if (officeError) {
    return <OnError />;
  }

  const clearFilter = (): void => setIsActive('');

  const facilities = content;

  return (
    <Container className="office my-5">
      <p className="font-size-xl mb-5">
        <b>{office.title}</b>
      </p>
      <Row>
        <Col lg="8">
          <Card
            type="map"
            title="Address"
            titleClass="font-size-sm"
            addressOnMap={get(office, 'addressMap.addressForMap', '')}
            address={
              <div
                className="address-top"
                dangerouslySetInnerHTML={{
                  __html: createDOMPurify.sanitize(get(office, 'addressMap.addressTop', ''))
                }}
              />
            }
          />
        </Col>
        <Col lg="4" className="mt-4 mt-lg-0">
          <ContentWrapper
            wrapperClass="h-100"
            title="Office hours"
            topBorder="darkTurquoise"
            titleClass="font-size-base font-weight-bold"
          >
            <div
              className="font-size-sm"
              dangerouslySetInnerHTML={{
                __html: createDOMPurify.sanitize(get(office, 'office_hours', ''))
              }}
            />
          </ContentWrapper>
        </Col>
      </Row>
      {facilities && !!facilities.length && (
        <>
          <p className="font-size-xl mb-3 mt-5">
            <b>Facilities</b>
          </p>
          <Row>
            {facilities &&
              facilities.map((item: VariousContentModel) => (
                <Col md="6" lg="4" className="my-3" key={item.drupal_id + '_facilitiesCol'}>
                  <Facilities facility={item} facilitiesError={facilitiesError} />
                </Col>
              ))}
          </Row>
        </>
      )}
      {!!people && (
        <PeopleContainer
          office={office}
          people={people}
          isActive={isActive}
          isLastPage={isLastPage}
          clearFilter={clearFilter}
          handleActiveItem={handleActiveItem}
          triggerFetchPeople={triggerFetchPeople}
        />
      )}
    </Container>
  );
};

export default connect(mapState, actionCreators)(Office);
