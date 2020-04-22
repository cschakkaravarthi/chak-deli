import { AppreciationCardNotificationModel as AlertModel } from '../models/Notification.model';

export interface AppreciationCardTemplate {
  templateId: string;
  topImg: string;
  bottomImg: string;
  active: boolean;
}

export interface AppreciationCardsListGrouped {
  sent: AlertModel[];
  received: AlertModel[];
  team: AlertModel[];
}
