export declare const TOGGLE_GLOBAL_TOAST = "TOGGLE_GLOBAL_TOAST";
export interface ToggleGlobalToastAction {
    type: typeof TOGGLE_GLOBAL_TOAST;
    displayToast: boolean;
    toastMessage: string;
    toastError: boolean;
}
export interface CommonState {
    displayToast: boolean;
    toastMessage: string;
    toastError: boolean;
}
//# sourceMappingURL=commonTypes.d.ts.map