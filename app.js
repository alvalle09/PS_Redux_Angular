/* Console app using Redux with Angular, course by hendrik swanepoel
 on Pluralsight. Two thumbs up!  👍👍
*/

// import redux
const { createStore, applyMiddleware } = require('redux');

// initialize state
const defaultState = {
  courses: [
    {
      name: 'Learning React',
      topic: 'React',
    },
    {
      name: 'Learning Angular',
      topic: 'Angular',
    },
    {
      name: 'Using Redux with Angular',
      topic: 'Angular',
    }
  ]
};

// Reducer calculates the updated state 
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_COURSE':
      return Object.assign({}, state, {
        courses: [...state.courses, action.course]   // use spread operator ... to copy 
      });

    default:
      return state;  // when action is unknown, return current state
  }
}

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('state after action', store.getState());
  return result;
}

const store = createStore(reducer, defaultState, applyMiddleware(logger));

function addView(viewFunc) {
  viewFunc(defaultState);
  // subscribe to change events
  store.subscribe(()=> {
    viewFunc(store.getState());
  });
}

addView((state) => {
  console.log(`There are ${state.courses.length} courses in the library`);
});

addView((state) => {
  console.log(`The latest course in the library: ${state.courses[state.courses.length -1].name}`);
});

// the only way to change state is to dispatch
store.dispatch({
  type: 'ADD_COURSE',
  course: {
    name: 'A new course in Redux!',
    topic: 'Redux',
  }
});

store.dispatch({
  type: 'ADD_COURSE',
  course: {
    name: 'Yet another course added',
    topic: 'Redux, React, Angular',
  }
});




