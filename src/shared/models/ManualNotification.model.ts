import { TaxonomyTermModel } from '../types/contentTypes';

export interface ManualNotificationListModel {
  approvals: ManualNotifications;
  alerts: ManualNotifications;
  message?: string;
  apiVersion?: string;
}

export interface ManualNotifications {
  total?: number;
  notifications: ManualNotification[];
}

export interface ManualNotification {
  type?: string;
  language?: string;
  alert_type?: Categories[];
  author_name?: string;
  author_uid?: number;
  body_full?: string;
  summary?: string;
  created?: number | string;
  owner?: Categories[];
  drupal_id?: number | undefined;
  categories?: Categories[];
  title: string;
  notificationType?: string;
  isNew?: boolean;
  serviceNowLink?: string;
}

export type Categories = TaxonomyTermModel;

export interface NotificationBell {
  newNotificationCount: number;
}

export interface ArchiveToast {
  isArchiveToast: boolean;
  classNameToast: string;
}

export const dummyCategories: Categories = {
  drupal_id: 1,
  title: 'Categories'
};

export const dummyManualNotification: ManualNotification = {
  isNew: true,
  categories: [dummyCategories],
  type: 'notification',
  notificationType: 'maintenence',
  created: 1571873331,
  title: 'Emergency Alert - Los Angeles Area Earthquake',
  summary: 'This is a notification about a very important event that you should be aware of! This is a notification about a very important event that you should be aware of!',
  body_full: 'This is a notification about a very important event that you should be aware of! This is a notification about a very important event that you should be aware of! This is a notification about a very important event that you should be aware of! This is a notification about a very important event that you should be aware of! This is a notification about a very important event that you should be aware of!'
};

export const dummyManualNotifications: ManualNotifications = {
  total: 0,
  notifications: [{ ...dummyManualNotification }, { ...dummyManualNotification }]
};

export const dummyManualNotificationListModel: ManualNotificationListModel = {
  approvals: dummyManualNotifications,
  alerts: dummyManualNotifications
};

export const dummyNotificationBell: NotificationBell = {
  newNotificationCount: 2
};
