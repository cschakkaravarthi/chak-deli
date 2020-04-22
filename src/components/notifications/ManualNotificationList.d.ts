import { FC } from 'react';
import { ManualNotificationListModel, Categories } from './../../shared/models/ManualNotification.model';
interface Props {
    notificationList?: ManualNotificationListModel;
    backgroundImage?: string;
    setFilterFacet: (a: string) => void;
    categories?: Categories[];
    currentFacet?: string;
    onClickInboxAll?: () => void;
    onClickArchiveAll?: () => void;
    onArchive?: (drupal_id: number | undefined) => void;
    isNewOrArchived?: string;
}
declare const ManualNotificationList: FC<Props>;
export default ManualNotificationList;
//# sourceMappingURL=ManualNotificationList.d.ts.map