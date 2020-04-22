import { ImageUris } from '../shared/models/Image.model';
interface ImageUrlHandlerType {
    sanitize(value: string | object | undefined | null): string;
}
export declare function imageUrlHandler(): ImageUrlHandlerType;
export declare const handleUriForIcons: (field: string | null) => string;
export declare const handleUri: (field: string | null) => string;
export declare const handleUriSet: (field: ImageUris | null) => ImageUris;
export {};
//# sourceMappingURL=imageUrlHandler.d.ts.map