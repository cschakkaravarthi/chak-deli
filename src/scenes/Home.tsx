import React, { FC, useEffect, useRef, useState } from 'react';
import { AppState } from '../shared/types/genericTypes';
import { connect } from 'react-redux';
import get from 'lodash.get';
import DrupalIds from '../drupalIds';
import { fetchLabelById } from '../shared/actions/labelActions';
import { Label as LabelModel, LabelTemplate } from '../shared/models/Label.model';
import { LogoBanner } from 'umgc_ui_library';
import Container from 'react-bootstrap/Container';
import TemplateF from '../templates/TemplateF';
import { TemplateIdsModel } from '../shared/models/Template.model';
import TemplateH from '../templates/TemplateH';
import TemplatesTopBar from '../components/templatesTopBar/templatesTopBar';
import images from '../images/images';
import HomeGenericSkeleton from '../components/homeGenerics/skeleton';

type Props = {
  active?: number;
  label?: LabelModel;
  labelId?: number;
  profileType?: string;
  fetchLabelById?: (labelId: number) => Promise<void>;
};

const mapState: any = (state: AppState, props: Props): Props => {
  const labelId = get(state, 'userProfileReducers.userProfileDetails.labelId', 0);
  const profileType = get(state, 'userProfileReducers.userProfileDetails.profileType');

  return {
    ...props,
    labelId,
    active: labelId,
    profileType,
    label: state.labelReducers.labels.find(d => get(d, 'drupal_id', 0) === labelId)
  };
};

const actionCreators = { fetchLabelById };

export const Home: FC<Props> = props => {
  const labelIds = useRef<TemplateIdsModel | null>(null);

  const [isFetching, setIsFetching] = useState<boolean>(true);
  const { label, labelId, fetchLabelById, profileType } = props;

  useEffect(() => {
    if (profileType === 'umg') {
      setIsFetching(false);
    } else {
      setIsFetching(true);
    }
  }, [profileType]);

  useEffect(() => {
    if (fetchLabelById && labelId) {
      labelIds.current = get(DrupalIds.labels, labelId);
      setIsFetching(true);
      fetchLabelById(labelId)
        .then(() => {
          setIsFetching(false);
        })
        .catch(() => {
          setIsFetching(false);
        });
    }
  }, [labelId]);

  if (isFetching) {
    return <HomeGenericSkeleton />;
  }

  const getTemplateId = (): string => {
    const getTemplates = get(label, 'template', [] as LabelTemplate[]);
    // Typecast to string.
    return getTemplates[0].drupal_id.toString();
  };

  const templateId = label && getTemplateId();
  const TemplateComponent = templateId === DrupalIds.templates.templateF ? TemplateF : TemplateH; // TODO: ask for the default

  return (
    <div className="labels pb-5">
      {labelId ? (
        <TemplatesTopBar givenId={labelId} active={labelId} type="label" />
      ) : (
        <LogoBanner logoSrc={images.logoSrc} bannerSrc={images.bannerSrc} />
      )}

      <Container>
        {label && labelIds.current ? (
          <TemplateComponent content={label} contentIds={labelIds.current} />
        ) : (
          <TemplateH />
        )}
      </Container>
    </div>
  );
};

export default connect(mapState, actionCreators)(Home);
