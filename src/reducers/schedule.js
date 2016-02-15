import { createReducer } from '../utils';

// import {
  // import constants later
// }

const initialState = new Map([
  ["9331090799532831", {
    id: "9331090799532831",
    date: new Date().setDate(new Date().getDate() - 1),
    completed: true,
    title: 'Completed task',
    description: 'Lorem ipsum Incididunt consequat dolor eu ullamco elit deserunt Ut anim laboris irure ut eu ut est.'
  }], ["9404386058449745", {
    id: "9404386058449745",
    date: new Date().setDate(new Date().getDate() + 1),
    completed: false,
    title: 'Task to complete',
    description: 'Lorem ipsum Exercitation consequat fugiat aliquip dolor eu elit elit tempor velit consequat Duis pariatur.'
  }], ["2039719105232507", {
    id: "2039719105232507",
    date: new Date(),
    completed: false,
    title: 'Another task',
    description: 'Lorem ipsum Eiusmod labore sint dolore quis pariatur ea ad id exercitation veniam culpa exercitation dolore do in ut aute.'
  }], ["08076722733676434", {
    id: "08076722733676434",
    date: new Date(2100, 5, 3),
    completed: false,
    title: 'Far future task',
    description: 'Lorem ipsum Labore esse anim in adipisicing aliqua anim deserunt nostrud anim dolor pariatur do Excepteur non incididunt.'
  }]
]);

export default createReducer(initialState, {
  // add action handlers when needed
});
