import { ActionAndPayload } from '../index.d';
import { Todo } from './todos.d';

export const ADD_TODO: 'ADD_TODO' = 'ADD_TODO';
export const IS_COMPLETED: 'IS_COMPLETED' = 'IS_COMPLETED';
export const REMOVE_TODO: 'REMOVE_TODO' = 'REMOVE_TODO';

const initialState: Todo[] = [];

export const add_todo = (title: string): ActionAndPayload => ({
  type: ADD_TODO,
  payload: {
    title: title
  }
});

const upperID = (len: number): number => {
  return len + 1;
};
const getPayload = (action: ActionAndPayload, key: string): string => {
  return action.payload[key];
};
const createNewDate = (): number => new Date().getTime();
const isSameID = (stateID: number, incommingID: number): boolean => {
  return stateID === incommingID;
};
const todos = (state = initialState, action: ActionAndPayload) => {
  switch (action.type) {
    case ADD_TODO:
      // array concat 重新 return new []
      return state.concat({
        id: upperID(state.length),
        title: getPayload(action, 'title'),
        completed: false,
        date: createNewDate()
      });
    case IS_COMPLETED:
      return state.map(s => {
        if (isSameID(s.id, action.payload.id)) {
          return {
            ...s,
            completed: true
          };
        }
        return s;
      });
    case REMOVE_TODO:
      return state
        .map(s => {
          if (!isSameID(s.id, action.payload.id)) {
            return s;
          }
          return undefined;
        })
        .filter(todos => todos !== undefined);
    default:
      return state;
  }
};

export default todos;
