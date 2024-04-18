const db = require('../database')

exports.all = async () => {
  const { rows } = await db.getPool().query("select * from genres order by id");
  return db.camelize(rows);
 }
/*
const genres = [
    {genreName: "Theory"},
    {genreName: "Philosophy"},
    {genreName: "Manifesto"},
  ]
  //the req body, were going to give it a name aka genre
  // array?
 */
  exports.upsert = async (genre) => {
    if (genre.id) {
      return exports.update(genre.id, genre.name)
    }
    return exports.create(genre.name)
   }
   /*
   exports.upsert = (genre) => {
    if (genre.id) {
      exports.update(genre);
    } else {
      exports.add(genre);
    }
  }
  */
  exports.update = async (id, name) => {
    return db.getPool().query("UPDATE genres SET name = $1 where id = $2 RETURNING *", [name, id]);
   }
/*   
  exports.update = (genre) => {
    genres[genre.id] = genre;
  }
 */

  //the req body, were going to give it a name aka genre
  // array?

  //exports.all = genres
  exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from genres where id = $1", [id])
    return db.camelize(rows)[0]
   }
   
   exports.create = async (name) => {
    return db.getPool().query("INSERT INTO genres(name) VALUES($1) RETURNING *", [name]);
   }
   
   
    /*exports.get = (idx) => {
    return genres[idx];
  }
  
  exports.add = (genre) => {
    genres.push(genre);
  }*/