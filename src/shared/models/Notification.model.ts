export default interface Notification {
  id: number;
  description: string;
  viewed: boolean;
  application: string;
  detailsLink: string;
  reject: boolean;
  approve: boolean;
}

export interface AppreciationCardNotificationModel {
  senderName?: string;
  recipientEmail: string;
  cardMessage: string;
  recipientSupervisorEmail?: string;
  recipientFirstName: string;
  recipientLastName: string;
  senderFirstName?: string;
  supervisorArchived?: boolean;
  recipientArchived?: boolean;
  senderLastName?: string;
  cardId?: string;
  senderEmail?: string;
  dateSent?: string;
  topImg?: string;
  bottomImg?: string;
  managerName?: string;
}

export const dummyAppreciationCardNotification: AppreciationCardNotificationModel = {
  recipientEmail: 'marion1.wirsig1@umusic.com',
  cardMessage: 'Your so cute Rudy',
  recipientSupervisorEmail: 'meena1.belagam1@umusic.com',
  recipientFirstName: 'Marion',
  recipientLastName: 'Wirsig',
  senderFirstName: 'Meena',
  supervisorArchived: false,
  recipientArchived: false,
  senderLastName: 'Belagam',
  cardId: '40518cda-f3eb-406f-904f-7f256def2b2f',
  senderEmail: 'meena.belagam@umusic.com',
  dateSent: '1576881752255'
};

export const dummyNotification: Notification = {
  id: 42,
  description:
    'Answer to the Ultimate Question of Life, the Universe, and Everything',
  viewed: true,
  application: 'Deep Thought',
  detailsLink: 'http://google.com/',
  reject: true,
  approve: true
};

export const dummyNotifications: Notification[] = [
  dummyNotification,
  { ...dummyNotification, id: 24 }
];
