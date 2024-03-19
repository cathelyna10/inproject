
const db = require('../database')


exports.all = async () => {
 const { rows } = await db.getPool().query("select * from author order by id");
 return db.camelize(rows);
}

/*const authors = [
    {firstName: "Tiziana", lastName: "Terranova"},
    {firstName: "Bifo", lastName: "Berardi"},
    {firstName: "Norbert", lastName: "Weiner"},
  ]
*/
  exports.upsert = (author) => {
    if (author.id) {
      exports.update(author);
    } else {
      exports.add(author);
    }
  }
  
  exports.update = (author) => {
    authors[author.id] = author;
  }
  

  //the req body, were going to give it a name aka author
  // array?

  // exports.all = authors

  exports.get = (idx) => {
    return db[idx];
  }
  
  exports.add = (author) => {
    authors.push(author);
  }
  

