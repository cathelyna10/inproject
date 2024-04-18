/*const users = [
  {"email":"csuherma@pratt.edu","name":"saskia","salt":"9b74f8e31b013692f10d59ee84edcded","encryptedPassword":"6ad82cda7445d052f71ec16cfb9ee5c4636d709b47d601b28a047ee7caa5e77b"}
]*/

const db = require('../database')

exports.getByEmail = async (email) => {
 /* return users.find((user) => user.email === email);
}
*/
const { rows } = await db.getPool().query("select * from users where email = $1", [email])
  return db.camelize(rows)[0]
}

//encrypting password
var crypto = require('crypto'); //// use the build in cryptography functions from JS


const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
}

const encryptPassword = (password, salt) => {  // a function to encrypt a password given a salt
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
}

exports.add = async (user) => {
  const salt = createSalt(); // first create a new salt, so each user has a unique sal
  /*let new_user = { // create a new user object
    email: user.email,
    name: user.name,
    salt: salt,
    encryptedPassword: encryptPassword(user.password, salt)
  }
  */
  let encryptedPassword = encryptPassword(user.password, salt)
  return db.getPool()
    .query("INSERT INTO users(email, name, salt, password) VALUES($1, $2, $3, $4) RETURNING *",
      [user.email, user.name, salt, encryptedPassword])

  //users.push(new_user);
}
exports.login = async (login) => {
  let user = await exports.getByEmail(login.email);
  if (!user) {
    return null;
  }
  let encryptedPassword = encryptPassword(login.password, user.salt);
  if (user.encryptedPassword === encryptedPassword) {
    return user;
  }
  return null;
}

//exports.all = users
  
  