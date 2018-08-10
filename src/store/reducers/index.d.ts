import { Action } from 'redux';

export type ActionAndPayload = Action & {
  payload: any;
};
