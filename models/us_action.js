const db = require('../database')

exports.all = async () => {
 const { rows } = await db.getPool().query("select * from us_action order by id");
 return db.camelize(rows);
}

exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from us_action where id = $1", [id])
  return db.camelize(rows)[0]
 }
/*const
 authors = [
    {firstName: "Tiziana", lastName: "Terranova"},
    {firstName: "Bifo", lastName: "Berardi"},
    {firstName: "Norbert", lastName: "Weiner"},
  ]

  exports.upsert = (author) => {
    if (author.id) {
      exports.update(author);
    } else {
      exports.add(author);
    }
  }
 

  exports.upsert = async (us_action) => {
    if (us_action.id) {
      return exports.update(us_action.id, us_action.us, us_action.action_description)
    }
    return exports.create(us_action.us_action, us_action.action_description)
   }
   
  exports.update = async (id, us_action, action_description) => {
    return db.getPool().query("UPDATE us_action SET us_action = $1, action_description = $2 where id = $3 RETURNING *", [us_action, action_description, id]);
   }
   
    */
   /*exports.allForBook = async (book) => {
    const { rows } = await db.getPool().query(`
      select us_action.* from us_action
      JOIN authors_books on authors_books.author_id = authors.id
      where authors_books.book_id = $1;`, [book.id]);
    return db.camelize(rows);
  }
  */


  /*
  exports.update = (author) => {
    authors[author.id] = author;
  }
  */

  //the req body, were going to give it a name aka author
  // array?

  // exports.all = authors
  

   /*
  exports.get = (idx) => {
    return db[idx];
  }



  exports.add = (author) => {
    authors.push(author);
  }
    */
  exports.create = async (firstName, lastName) => {
    return db.getPool().query("INSERT INTO us_action(us_action, action_description) VALUES($1, $2) RETURNING *", [us_action, action_description]);
   }
   
