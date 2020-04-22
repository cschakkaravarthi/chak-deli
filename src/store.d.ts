import { compose } from 'redux';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
declare const _default: (initialState?: {}) => any;
export default _default;
//# sourceMappingURL=store.d.ts.map