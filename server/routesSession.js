import { User } from './configMongoose';
import jwt from 'jsonwebtoken';
import jwtSecret from './configSecret';
import crypto from 'crypto';

console.info(1);
console.info(1);
console.info(1);
console.info(1);
console.info(1);
console.info(1);
export default [
  { 
    route: ['login'],
    call: (callPath, args) => 
      {
        console.info("args");
        console.info(args);
        console.info("args");
        let { username, password } = args[0];
        console.info(1);
        let saltedPassword = password+"pubApp"; // pubApp is our salt string
        console.info(2);
        let saltedPassHash = crypto.createHash('sha256').update(saltedPassword).digest('hex');
        console.info(3);
        let userStatementQuery = {
          $and: [
              { 'username': username },
              { 'password': saltedPassHash }
          ]
        }

        console.info(JSON.stringify(userStatementQuery, null, 4));
        console.info(4);

        /* 
          findOne MAY NOT WORK! double-check!
         */
        return User.findOne(userStatementQuery, function(err, user) {
          console.info(5);
          if (err) throw err;
          console.info(6);
        }).then((result) => {
          console.info(JSON.stringify(result, null, 4));
          console.info(7);
          if(result && result.length) {
            console.info(8);
            console.info("1) ", result);
            let role = result[0].role;
            let userDetailsToHash = username+role;
            let token = jwt.sign(userDetailsToHash, jwtSecret, { expiresIn: '1h' });
            return [
              {
                path: ['login', 'token'],
                value: token
              },
              {
                path: ['login', 'username'],
                value: username
              },
              {
                path: ['login', 'role'],
                value: role
              },
              {
                path: ['login', 'error'],
                value: false
              }
            ];
          } else {
            console.info("INVALID");
            // INVALID LOGIN
            return [
              {
                path: ['login', 'token'], 
                value: "INVALID"
              },
              {
                path: ['login', 'error'], 
                value: "NO USER FOUND, incorrect login information" 
              }
            ];
          }
          console.info("TO RETURN", result);

          return result;
        });
      }
  }
];