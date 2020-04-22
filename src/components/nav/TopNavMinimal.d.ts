import React, { FC } from 'react';
export interface LinkInterface {
    id: number;
    linkComponent?: React.ComponentType;
    title: string;
    isActive: boolean;
}
declare type Props = {
    links: LinkInterface[];
};
export declare const TopNavMinimal: FC<Props>;
export default TopNavMinimal;
//# sourceMappingURL=TopNavMinimal.d.ts.map