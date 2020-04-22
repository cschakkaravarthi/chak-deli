import React, { FC } from 'react';
import { VariousContentGroupModel } from '../../shared/types/contentTypes';
declare type Props = {
    mdCols?: string;
    category: string;
    showImages?: boolean;
    multiColumn?: boolean;
    content?: VariousContentGroupModel[];
    fetchGroupedContent?: (filterId: string) => void;
};
export declare const LinksCards: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=LinksCards.d.ts.map