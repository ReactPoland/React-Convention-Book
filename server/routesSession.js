import { User } from './configMongoose';
import jwt from 'jsonwebtoken';
import jwtSecret from './configSecret';
import crypto from 'crypto';

export default [
  { 
    route: ['login'],
    call: (callPath, args) => 
      {
        let { username, password } = args[0];
        let saltedPassword = password+"pubApp"; // pubApp is our salt string
        let saltedPassHash = crypto.createHash('sha256').update(saltedPassword).digest('hex');
        let userStatementQuery = {
          $and: [
              { 'username': username },
              { 'password': saltedPassHash }
          ]
        }

        return User.find(userStatementQuery, function(err, user) {
          if (err) throw err;
        }).then((result) => {
          console.info(JSON.stringify(result, null, 4))
          console.info(2);
          if(result.length) {
            console.info(2);
            console.info("result", JSON.stringify(result));

            let role = result[0].role;
            console.info("role", role);
            let userDetailsToHash = username+role;
            console.info("userDetailsToHash", userDetailsToHash);
            console.info(3);
            let token = jwt.sign(userDetailsToHash, jwtSecret);
            console.info(4);
            console.info("token", token);
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
          return result;
        });
      }
  }
];