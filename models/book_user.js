/*const books_users = [
    {bookId: "0", userEmail: "csuherma@pratt.edu", status: "finished"},
    {bookId: "1", userEmail: "csuherma@pratt.edu", status: "finished"},
    {bookId: "2", userEmail: "csuherma@pratt.edu", status: "todo"},
    {bookId: "3", userEmail: "csuherma@pratt.edu", status: "todo"}
  ];

*/
const db = require('../database')

exports.get = async (book, user) => {
  const { rows } = await db.getPool().query(`
    select *
    from books_users
    where book_id = $1 and user_id = $2`,
    [book.id, user.id])
  return db.camelize(rows)[0]
}

  
exports.allForUser = async (user) => {
  const { rows } = await db.getPool().query(`
    select books.title, books_users.read_status
    from books_users
    join books on books.id = books_users.book_id
    where user_id = $1;`,
    [user.id]);
  return db.camelize(rows);
}

exports.statuses = [
    "todo","reading","finished"
  ]
  
exports.add = async (book_user) => {
  return db.getPool()
  .query(`INSERT INTO
          books_users(book_id, user_id, read_status)
          VALUES($1, $2, $3) RETURNING *`,
    [bookUser.bookId, bookUser.userId, bookUser.status]);
}

  
exports.update = async (book_user) => {
  return await db.getPool()
  .query("UPDATE books_users SET read_status = $1 where id = $2 RETURNING *",
    [bookUser.status, bookUser.id]);
}

  
exports.upsert = (bookUser) => {
  if (bookUser.id) {
    return exports.update(bookUser);
  } else {
    return exports.add(bookUser);
  }
}
