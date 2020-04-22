import React, { FC } from 'react';
import EventModel from '../../shared/models/Event.model';
import { match } from 'react-router';
declare type Props = {
    match?: match;
    event?: EventModel;
    eventsList?: EventModel[];
    moreEventsList?: EventModel[];
    fetchEventById?: (a: number | string) => Promise<void>;
};
export declare const Event: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=Event.d.ts.map