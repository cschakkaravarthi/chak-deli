export const EXAMPLE_SET_BASIC_KEY = 'EXAMPLE_SET_BASIC_KEY';
export const EXAMPLE_SEND_MESSAGE = 'EXAMPLE_SEND_MESSAGE';

export interface Message {
  user: string;
  message: string;
  timestamp: number;
}

export interface ExampleReducerState {
  someBasicKey?: string;
  objectKey?: object;
  messages: Message[];
}

interface SendMessageAction {
  type: typeof EXAMPLE_SEND_MESSAGE;
  payload: Message;
}

interface SetSomeBasicKey {
  type: typeof EXAMPLE_SET_BASIC_KEY;
  payload: string;
}

export type ChatActionTypes = SendMessageAction | SetSomeBasicKey;
