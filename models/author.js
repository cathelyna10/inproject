
const db = require('../database')


exports.all = async () => {
 const { rows } = await db.getPool().query("select * from authors order by id");
 return db.camelize(rows);
}

/*const authors = [
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
  */

  exports.upsert = async (author) => {
    if (author.id) {
      return exports.update(author.id, author.firstName, author.lastName)
    }
    return exports.create(author.firstName, author.lastName)
   }
   
  exports.update = async (id, firstName, lastName) => {
    return db.getPool().query("UPDATE authors SET first_name = $1, last_name = $2 where id = $3 RETURNING *", [firstName, lastName, id]);
   }
   exports.allForBook = async (book) => {
    const { rows } = await db.getPool().query(`
      select authors.* from authors
      JOIN authors_books on authors_books.author_id = authors.id
      where authors_books.book_id = $1;`, [book.id]);
    return db.camelize(rows);
  }
  
  /*
  exports.update = (author) => {
    authors[author.id] = author;
  }
  */

  //the req body, were going to give it a name aka author
  // array?

  // exports.all = authors
  
  exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from authors where id = $1", [id])
    return db.camelize(rows)[0]
   }
   /*
  exports.get = (idx) => {
    return db[idx];
  }



  exports.add = (author) => {
    authors.push(author);
  }
    */
  exports.create = async (firstName, lastName) => {
    return db.getPool().query("INSERT INTO authors(first_name, last_name) VALUES($1, $2) RETURNING *", [firstName, lastName]);
   }
   
