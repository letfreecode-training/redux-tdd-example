/**
 * user
 * todos
 */
import { createStore, combineReducers, Store } from 'redux';
/**
 * Helper
 */
import { transformLevel } from '../store/reducers/users/utils/transformLevel';
/**
 * User Reducer and Type
 */
import userReducer from '../store/reducers/users/user';
import { User } from '../store/reducers/users/user.d';
import {
  change_user_name,
  change_level,
  CHANGE_LEVEL,
  CHANGE_USER_NAME
} from '../store/reducers/users/user';
/**
 * Todos Reducer and Type
 */
import todosReducer, {
  add_todo,
  ADD_TODO,
  IS_COMPLETED,
  REMOVE_TODO
} from '../store/reducers/todos/todos';
import { Todo } from '../store/reducers/todos/todos.d';

/**
 * Store initial
 */
type StoreState = {
  user: User;
  todos: Todo[];
};
let store: Store<StoreState>;
describe('Redux Store', () => {
  beforeEach(() => {
    store = createStore(
      combineReducers({
        user: userReducer,
        todos: todosReducer
      })
    );
  });

  it('建立一個基本 store', () => {
    const storeGetStateFunction: boolean = typeof store.getState === 'function';
    expect(storeGetStateFunction).toBeTruthy();
  });
  it('User store 返回 name = Whien', () => {
    const user: User = store.getState().user;
    expect(user.name).toEqual('Whien');
  });
  it('User store 返回 name = Whien', () => {
    const user: User = store.getState().user;
    expect(user.level).toEqual('普通會員');
  });
  it('User store 改變 user name = Ahha', () => {
    store.dispatch({
      type: CHANGE_USER_NAME,
      payload: 'Ahha'
    });
    store.dispatch(change_user_name('Ahha'));
    const user: User = store.getState().user;
    expect(user.name).toEqual('Ahha');
  });
  it('User store 返回 name = Whien', () => {
    const user: User = store.getState().user;
    expect(user.name).toEqual('Whien');
  });
  it('取得 level 1. 普通會員 2. 高級會員 3. VVIP', () => {
    expect(transformLevel('1')).toEqual('普通會員');
    expect(transformLevel('2')).toEqual('高級會員');
    expect(transformLevel('3')).toEqual('VVIP');
  });
  it('改變會員等級, 1 => 2', () => {
    store.dispatch({
      type: CHANGE_LEVEL,
      payload: '2'
    });
    store.dispatch(change_level('2'));
    const user = store.getState().user;
    expect(user.level).toEqual('高級會員');
  });
});

describe('TODO Store', () => {
  beforeEach(() => {
    store = createStore(
      combineReducers({
        user: userReducer,
        todos: todosReducer
      })
    );
  });
  it('初始資料 [] 為空', () => {
    const todos = store.getState().todos;
    expect(todos).toHaveLength(0);
  });
  it('增加一筆 todo', () => {
    store.dispatch({
      type: ADD_TODO,
      payload: {
        title: 'run'
      }
    });
    const todos = store.getState().todos;
    expect(todos[0].id).toEqual(1);
    expect(todos[0].title).toEqual('run');
    expect(todos[0].completed).toBeFalsy();
  });
  it('完成一筆 todo', () => {
    store.dispatch(add_todo('run'));
    store.dispatch(add_todo('eat'));
    store.dispatch({
      type: IS_COMPLETED,
      payload: {
        id: 1
      }
    });
    const todos = store.getState().todos;
    expect(todos[0].title).toEqual('run');
    expect(todos[0].completed).toBeTruthy();
  });
  it('刪除一筆 todo', () => {
    store.dispatch(add_todo('run'));
    store.dispatch({
      type: REMOVE_TODO,
      payload: {
        id: 1
      }
    });
    const todos = store.getState().todos;
    expect(todos).toHaveLength(0);
  });
});
