const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync("friend123", 10);
console.log(hash);