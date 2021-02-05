import { screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store' //ES6 modules
import { shallow, render, mount } from 'enzyme';
import { ListTasks } from './components/ListTasks';
import { FormAddTask } from './components/FormAddTask';
import { Provider } from 'react-redux';
import { addNewTaskAction, deleteTaskAction } from './actions/taskActions';
import thunk from 'redux-thunk';

import React from 'react';

React.useLayoutEffect = React.useEffect;

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

it('tasks empty show error', () => {
    const store = mockStore({ task : { tasks: [], loading: false, error: false } });
    const wrapper = render(<Provider store={store}><ListTasks /></Provider>);
    expect (wrapper.find('.error-empty').length).toBe(1);
});

it('show one task', () => {
    const task = {
      "description": "ir al super en la tarde",
      "valid": "1",
      "date": 1612545328146,
      "id": 1
    };

    const store = mockStore({ task : { tasks: [task], loading: false, error: false } });
   // console.log(store.getState().task);
    const wrapper = render(<Provider store={store}><ListTasks /></Provider>);
    expect(wrapper.find('.acciones').length).toBe(1);

});


it('form remove task', async () => {

  const store = mockStore({ });
 // console.log(store.getState().task);

 const task = {
  "description": "ir al super en la tarde",
  "valid": "1",
  "date": 1612545328146,
  "id": 1
};

store.dispatch(deleteTaskAction(task.id));
    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toBe('GET_TASK_DELETED');
});

it('form add task', () => {

  const store = mockStore({ });
 // console.log(store.getState().task);

 const task = {
  "description": "ir al super en la tarde",
  "valid": "1",
  "date": 1612545328146,
  "id": 1
};

store.dispatch(addNewTaskAction(task));

  const actions = store.getActions();
  expect(actions.length).toBe(1);
  expect(actions[0].type).toBe('ADD_TASK');
});
