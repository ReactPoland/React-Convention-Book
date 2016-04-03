export default [
  { 
    route: ['login'] ,
    call: (callPath, args) => 
      {
        let { username, password } = args[0];

        let userStatementQuery = {
          $and: [
              { 'username': username },
              { 'password': password }
          ]
        }
      }
  }
];