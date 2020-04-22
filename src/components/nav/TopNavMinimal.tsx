import React, { FC } from 'react';
import { Breadcrumb } from 'umgc_ui_library';

export interface LinkInterface {
  id: number;
  linkComponent?: React.ComponentType;
  title: string;
  isActive: boolean;
}

type Props = {
  links: LinkInterface[];
};

export const TopNavMinimal: FC<Props> = props => {
  const { links } = props;
  return (
    <Breadcrumb
      onSelect={(selectedKey: string) => console.log(`selected ${selectedKey}`)}
      items={links.map((link: LinkInterface) => ({
        key: link.id,
        isActive: link.isActive,
        Link: link.linkComponent || (() => <></>)
      }))}
    />
  );
};

export default TopNavMinimal;
