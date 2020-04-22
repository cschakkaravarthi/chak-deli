import React, { FC } from 'react';
import { Media } from 'umgc_ui_library';

type Props = {
  title: string;
  variant?: string;
  bodyText?: string;
  subsection?: string;
  sectionImageSrc?: any; // this could take an object, element, null, undefined or string.
};

export const Breadcrumb: FC<Props> = ({ title, bodyText, variant = 'primary', sectionImageSrc, subsection = '' }) => {
  return (
    <div className="py-5">
      <Media
        title={title}
        variant={variant}
        bodyText={bodyText}
        subsection={subsection}
        sectionImageSrc={sectionImageSrc}
      />
    </div>
  );
};

export default Breadcrumb;
