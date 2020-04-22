import React, { FC } from 'react';
import EventModel from '../../shared/models/Event.model';
declare type Props = {
    owner?: string;
    showCategories?: boolean;
    eventsList?: EventModel[];
    fetchHomeEvents?: <T>(a?: string) => T;
};
export declare const EventsMinimalList: FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, Pick<Props, never> & Props>;
export default _default;
//# sourceMappingURL=EventsMinimalList.d.ts.map