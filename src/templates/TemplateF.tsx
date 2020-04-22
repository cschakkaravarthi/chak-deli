import React, { FC } from 'react';
import LinksCards from '../components/links/LinksCards';
import { Label } from '../shared/models/Label.model';
import LandingArticlesAndEvents from '../components/articles/LandingArticlesAndEvents';
import { TemplateIdsModel } from '../shared/models/Template.model';

type Props = {
  content: Label;
  contentIds: TemplateIdsModel;
};

export const Template: FC<Props> = props => {
  return (
    <>
      {props.contentIds.ownerId && (
        <LandingArticlesAndEvents ownerId={props.contentIds.ownerId} type="label" />
      )}
      {props.contentIds.contentBuckets[0] &&
        <LinksCards category={props.contentIds.contentBuckets[0]} mdCols="col-md-3" />
      }
    </>
  );
};

export default Template;
