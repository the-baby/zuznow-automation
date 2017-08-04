/**
const {baseUrl, creds} = require('config');

.then( _ => z.openPage(`${baseUrl}/user/login`, 'login page') )

*/
module.exports = {
  baseUrl: 'https://dashboard-beta.conversation.one',
  creds: {
    admin: {
      user:         'admin',
      password:     'vs8Sr7aU'
    }
  }
}