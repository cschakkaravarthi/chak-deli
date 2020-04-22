import React from 'react';
export interface EventGA {
    category: string;
    action: string;
    value?: number;
    label?: string;
}
export declare const eventGA: (gaData: EventGA) => void;
declare const _default: {
    GoogleAnalytics: React.FC<{}>;
    RouteTracker: React.FC<{}>;
    init: (options?: {}) => boolean;
};
export default _default;
//# sourceMappingURL=googleAnalytics.d.ts.map