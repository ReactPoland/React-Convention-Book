module.exports = [
  { 
    route: ['login'] ,
    call: async (callPath, args) => 
      {
        let { username, password } = args[0];

        let userStatementQuery = {
          $and: [
              { 'username': username },
              { 'password': password }
          ]
        }
  }
];