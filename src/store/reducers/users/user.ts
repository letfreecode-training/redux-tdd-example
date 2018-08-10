import { Reducer, Action } from 'redux';
/**
 * Type
 */
import { ActionAndPayload } from '../index.d';
import { User } from './user.d';

/**
 * Help
 */
import { transformLevel } from './utils/transformLevel';

export const CHANGE_USER_NAME: 'CHANGE_USER_NAME' = 'CHANGE_USER_NAME';
export const CHANGE_LEVEL: 'CHANGE_LEVEL' = 'CHANGE_LEVEL';

export const change_user_name = (name: string): ActionAndPayload => ({
  type: CHANGE_USER_NAME,
  payload: name
});
export const change_level = (level: string): ActionAndPayload => ({
  type: CHANGE_LEVEL,
  payload: level
});

const initialUserState: User = {
  name: 'Whien',
  level: '1'
};
const assignState = (state: User, key: string, payload: any): User => {
  if (key === 'level') {
    payload = transformLevel(payload);
  }
  return Object.assign({}, state, {
    [key]: payload
  });
};
const userReducer: Reducer = (
  state: User = initialUserState,
  action: Action & { payload: any }
) => {
  switch (action.type) {
    case CHANGE_USER_NAME:
      const name: string = action.payload;
      return assignState(state, 'name', name);
    case CHANGE_LEVEL:
      const level: string = action.payload;
      return assignState(state, 'level', level);
    default:
      return {
        ...state,
        level: transformLevel(state.level)
      };
  }
};

export default userReducer;
