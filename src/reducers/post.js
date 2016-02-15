import { createReducer } from '../utils';

// import {
  // import constants later
// }

const randomId = () => Math.random().toString().substring(2);

// model is completely imporvised for now
// MAKE IT RIGHT LATER!
const initialState = new Map([
  ["63354217633605", {
    id: "63354217633605",
    title: 'Some blog post (older)',
    author: {
      id: randomId(),
      firstName: 'John',
      lastName: 'Example'
    },
    publicationDate: new Date('2016-01-21T15:03:28.357Z'),
    excerpt: 'Lorem ipsum In in nisi commodo esse non veniam in Duis est cupidatat est culpa labore sit magna ut nostrud ullamco elit pariatur enim sunt velit sed quis ea dolore dolor nulla mollit nostrud Ut qui ex anim consequat Duis incididunt tempor.'
  }],
  ["7738420807290822", {
    id: "7738420807290822",
    title: 'Some blog post (newer)',
    author: {
      id: randomId(),
      firstName: 'John',
      lastName: 'Example'
    },
    publicationDate: new Date('2016-01-22T15:03:28.357Z'),
    excerpt: 'Lorem ipsum In in nisi commodo esse non veniam in Duis est cupidatat est culpa labore sit magna ut nostrud ullamco elit pariatur enim sunt velit sed quis ea dolore dolor nulla mollit nostrud Ut qui ex anim consequat Duis incididunt tempor.'
  }]
]);

export default createReducer(initialState, {
  // add action handlers when needed
});
