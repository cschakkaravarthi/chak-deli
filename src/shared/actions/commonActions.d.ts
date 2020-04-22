import { ToggleGlobalToastAction } from '../types/commonTypes';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
export declare const toggleGlobalToast: (displayToast: boolean, toastMessage: string, toastError: boolean) => ToggleGlobalToastAction;
export declare const triggerToast: (toastMessage: string, toastError?: boolean) => ThunkAction<void, {}, {}, AnyAction>;
//# sourceMappingURL=commonActions.d.ts.map